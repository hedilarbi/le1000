import "server-only";

import { randomInt } from "node:crypto";

import { MongoServerError, ObjectId, type ClientSession } from "mongodb";

import { daySlots, isOnSlotGrid, seatingMinutes, seatsLeft, type OccupiedInterval } from "@/app/lib/reservations/availability";
import {
  BOOKING_HORIZON_DAYS,
  AUTO_CANCEL_LEAD_MINUTES,
  CLIENT_CHANGE_CUTOFF_MINUTES,
  CONFIRMATION_REQUEST_TIME,
  DEFAULT_SETTINGS,
  LAST_CALL_LEAD_MINUTES,
  LUNCH_AUTO_CANCEL_TIME,
  MAX_ACTIVE_ONLINE_RESERVATIONS,
  PERSONAL_DATA_RETENTION_DAYS,
  RESTAURANT_PHONE_DISPLAY,
} from "@/app/lib/reservations/config";
import { addDays, daysBetween, formatDuration, minutesToTime, restaurantNow, timeToMinutes, zonedTimeToUtc } from "@/app/lib/reservations/time";
import type { Area, ReservationSettings, ReservationStatus } from "@/app/lib/reservations/types";

import { logAudit } from "./audit";
import { createManageToken, isManageTokenFormat, sha256 } from "./crypto";
import { collections, ensureDefaults, getMongoClient, type AreaDoc, type ReservationDoc } from "./db";
import {
  notifyRestaurant,
  sendAutoCancellation,
  sendCancellation,
  sendConfirmation,
  sendConfirmationRequest,
  sendLastCall,
  sendUpdate,
} from "./notifications";

// Statuts qui occupent des places. Un client absent ou une réservation annulée
// libère ses places.
export const BLOCKING_STATUSES: ReservationStatus[] = ["confirmed", "arrived"];

const REFERENCE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const MINUTE = 60_000;

export class ReservationError extends Error {
  constructor(
    message: string,
    readonly code: "invalid" | "unavailable" | "capacity" | "not_found" | "locked" = "invalid",
    readonly seatsLeft?: number,
  ) {
    super(message);
    this.name = "ReservationError";
  }
}

export type Actor = { kind: "client"; ip?: string } | { kind: "admin"; adminId: ObjectId; ip?: string };

export type ReservationTiming = { date: string; time: string; areaId: string; partySize: number };
export type ReservationContact = { firstName: string; lastName: string; phone: string; email: string; note: string };
export type ReservationInput = ReservationTiming & ReservationContact;

function toArea(doc: AreaDoc): Area {
  return { id: doc._id, name: doc.name, capacity: doc.capacity, active: doc.active, order: doc.order };
}

export async function getAreas() {
  const c = await collections();
  let docs = await c.areas.find().sort({ order: 1 }).toArray();
  if (!docs.length) {
    await ensureDefaults(c);
    docs = await c.areas.find().sort({ order: 1 }).toArray();
  }
  return docs.map(toArea);
}

export async function getSettings(): Promise<ReservationSettings> {
  const c = await collections();
  let doc = await c.settings.findOne({ _id: "reservations" });
  if (!doc) {
    await ensureDefaults(c);
    doc = await c.settings.findOne({ _id: "reservations" });
  }
  if (!doc) throw new Error("Paramètres de réservation introuvables.");
  return {
    occupancyMinutes: doc.occupancyMinutes,
    bufferMinutes: doc.bufferMinutes,
    lastSeatingBeforeCloseMinutes: doc.lastSeatingBeforeCloseMinutes,
    minOnlineLeadMinutes: doc.minOnlineLeadMinutes ?? DEFAULT_SETTINGS.minOnlineLeadMinutes,
    weeklyHours: doc.weeklyHours,
  };
}

async function loadRules() {
  const [areas, settings] = await Promise.all([getAreas(), getSettings()]);
  return { areas, settings };
}

export function toInterval(doc: Pick<ReservationDoc, "startMinutes" | "endMinutes" | "partySize">): OccupiedInterval {
  return { start: doc.startMinutes, end: doc.endMinutes, partySize: doc.partySize };
}

async function intervalsFor(date: string, areaId: string, options: { session?: ClientSession; excludeId?: ObjectId } = {}) {
  const { reservations } = await collections();
  const docs = await reservations
    .find(
      { date, areaId, status: { $in: BLOCKING_STATUSES }, ...(options.excludeId ? { _id: { $ne: options.excludeId } } : {}) },
      { projection: { startMinutes: 1, endMinutes: 1, partySize: 1 }, session: options.session },
    )
    .toArray();
  return docs.map(toInterval);
}

// Sérialise les réservations d'un même lieu pour une même date : deux clients
// ne peuvent pas prendre les mêmes dernières places en même temps. Toutes les
// transactions écrivent le même document verrou, MongoDB n'en laisse passer
// qu'une et relance automatiquement les autres.
async function withAreaLock<T>(date: string, areaId: string, work: (session: ClientSession) => Promise<T>) {
  const client = await getMongoClient();
  const { locks } = await collections();
  const lockId = `${areaId}:${date}`;

  try {
    await locks.updateOne({ _id: lockId }, { $setOnInsert: { version: 0 } }, { upsert: true });
  } catch (error) {
    if (!(error instanceof MongoServerError && error.code === 11000)) throw error;
  }

  const session = client.startSession();
  try {
    return await session.withTransaction(async () => {
      await locks.updateOne({ _id: lockId }, { $inc: { version: 1 } }, { session });
      return work(session);
    });
  } finally {
    await session.endSession();
  }
}

async function uniqueReference() {
  const { reservations } = await collections();
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const reference = Array.from({ length: 6 }, () => REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)]).join("");
    if (!(await reservations.findOne({ reference }, { projection: { _id: 1 } }))) return reference;
  }
  throw new Error("Impossible de générer une référence unique.");
}

function capacityError(left: number) {
  return new ReservationError(
    left <= 0 ? "Ce créneau est complet." : `Il ne reste que ${left} place${left > 1 ? "s" : ""} à ce créneau.`,
    "capacity",
    Math.max(0, left),
  );
}

function requireBookableArea(areas: Area[], areaId: string) {
  const area = areas.find((candidate) => candidate.id === areaId);
  if (!area) throw new ReservationError("Lieu inconnu.");
  if (!area.active) throw new ReservationError(`${area.name} n'est pas disponible pour le moment.`, "unavailable");
  return area;
}

function assertTiming(date: string, start: number, settings: ReservationSettings, actor: Actor, now: Date) {
  const today = restaurantNow(now);
  if (!isOnSlotGrid(start)) throw new ReservationError("Choisissez une heure parmi les créneaux proposés.");
  if (date < today.date) throw new ReservationError("Cette date est déjà passée.");
  if (actor.kind === "admin") return;

  if (daysBetween(today.date, date) > BOOKING_HORIZON_DAYS) {
    throw new ReservationError(`Les réservations en ligne sont ouvertes jusqu'à ${BOOKING_HORIZON_DAYS} jours à l'avance.`, "unavailable");
  }
  if (!daySlots(settings, date).includes(start)) {
    throw new ReservationError("Ce créneau n'est pas proposé à la réservation.", "unavailable");
  }
  if (minutesUntil(date, start, today) < settings.minOnlineLeadMinutes) {
    throw new ReservationError(leadTimeMessage(settings), "unavailable");
  }
}

// Minutes entre maintenant et un créneau (fonctionne aussi pour le lendemain).
function minutesUntil(date: string, start: number, now: { date: string; minutes: number }) {
  return daysBetween(now.date, date) * 1440 + start - now.minutes;
}

function leadTimeMessage(settings: ReservationSettings) {
  return `Pour une réservation dans moins de ${formatDuration(settings.minOnlineLeadMinutes)}, appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`;
}

// Suivi d'une réservation. `confirmed` (réservation du jour même ou présence déjà
// confirmée) : aucun suivi ni annulation. Sinon : demande de confirmation le jour J
// à 10 h, dernier rappel 4 h avant, annulation automatique 3 h avant. Avant 14 h,
// 10 h laisse moins de 4 h : pas de dernier rappel, annulation à midi (ou à l'heure
// de la réservation si elle est plus tôt).
// Anti-spam : en ligne, une même personne (cellulaire ou courriel) ne peut pas
// cumuler plus de MAX_ACTIVE_ONLINE_RESERVATIONS réservations à venir. L'admin n'est pas limité.
async function assertActiveReservationLimit(input: Pick<ReservationInput, "phone" | "email">, now: Date) {
  const { reservations } = await collections();
  const active = await reservations.countDocuments({
    status: "confirmed",
    startsAt: { $gt: now },
    $or: [{ phone: input.phone }, ...(input.email ? [{ email: input.email }] : [])],
  });
  if (active >= MAX_ACTIVE_ONLINE_RESERVATIONS) {
    throw new ReservationError(
      `Vous avez déjà ${active} réservations à venir. Pour en ajouter une autre, appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`,
      "locked",
    );
  }
}

function scheduleFor(date: string, start: number, settings: ReservationSettings, now: Date, confirmed: boolean) {
  const startsAt = zonedTimeToUtc(date, start);
  const checkDueAt = zonedTimeToUtc(date, timeToMinutes(CONFIRMATION_REQUEST_TIME));
  const lastCallDueAt = new Date(startsAt.getTime() - LAST_CALL_LEAD_MINUTES * MINUTE);
  const base = { startMinutes: start, endMinutes: start + seatingMinutes(settings), startsAt };
  const skipped = "skipped" as const;

  if (confirmed) {
    return { ...base, check: { state: skipped, dueAt: checkDueAt }, lastCall: { state: skipped, dueAt: lastCallDueAt }, autoCancelAt: null };
  }

  const lunch = lastCallDueAt <= checkDueAt;
  const autoCancelAt = lunch
    ? new Date(Math.min(zonedTimeToUtc(date, timeToMinutes(LUNCH_AUTO_CANCEL_TIME)).getTime(), startsAt.getTime()))
    : new Date(startsAt.getTime() - AUTO_CANCEL_LEAD_MINUTES * MINUTE);
  return {
    ...base,
    check: { state: checkDueAt > now ? ("pending" as const) : skipped, dueAt: checkDueAt },
    lastCall: { state: !lunch && lastCallDueAt > now ? ("pending" as const) : skipped, dueAt: lastCallDueAt },
    autoCancelAt,
  };
}

function auditActor(actor: Actor) {
  return actor.kind === "admin" ? { actor: "admin" as const, adminId: actor.adminId, ip: actor.ip } : { actor: "client" as const, ip: actor.ip };
}

export async function onlineAvailability(date: string, partySize: number, now = new Date()) {
  const today = restaurantNow(now);
  if (date < today.date || daysBetween(today.date, date) > BOOKING_HORIZON_DAYS) {
    return { areas: [], message: `Les réservations en ligne sont ouvertes d'aujourd'hui à ${BOOKING_HORIZON_DAYS} jours à l'avance.`, leadMessage: null };
  }

  const { areas, settings } = await loadRules();
  // Créneaux à venir ; ceux trop proches (délai minimum) restent visibles mais se
  // réservent par téléphone : le message s'affiche quand le client les choisit.
  const upcoming = daySlots(settings, date).filter((slot) => minutesUntil(date, slot, today) > 0);
  const isTooSoon = (slot: number) => minutesUntil(date, slot, today) < settings.minOnlineLeadMinutes;
  const bookable = areas.filter((area) => area.active && area.capacity > 0);
  if (!upcoming.length || !bookable.length) {
    return { areas: [], message: `Aucune réservation en ligne n'est possible à cette date. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`, leadMessage: null };
  }

  const { reservations } = await collections();
  const docs = await reservations
    .find(
      { date, status: { $in: BLOCKING_STATUSES }, areaId: { $in: bookable.map((area) => area.id) } },
      { projection: { areaId: 1, startMinutes: 1, endMinutes: 1, partySize: 1 } },
    )
    .toArray();
  const duration = seatingMinutes(settings);

  return {
    areas: bookable.map((area) => {
      const intervals = docs.filter((doc) => doc.areaId === area.id).map(toInterval);
      return {
        id: area.id,
        name: area.name,
        slots: upcoming
          .filter((slot) => !isTooSoon(slot) && seatsLeft(area.capacity, intervals, slot, duration) >= partySize)
          .map(minutesToTime),
        phoneOnly: upcoming.filter(isTooSoon).map(minutesToTime),
      };
    }),
    message: null,
    leadMessage: leadTimeMessage(settings),
  };
}

export async function createReservation(input: ReservationInput, actor: Actor, options: { allowOverbooking?: boolean; now?: Date } = {}) {
  const now = options.now ?? new Date();
  const { areas, settings } = await loadRules();
  const area = requireBookableArea(areas, input.areaId);
  const start = timeToMinutes(input.time);
  assertTiming(input.date, start, settings, actor, now);
  if (actor.kind === "client") await assertActiveReservationLimit(input, now);

  // Réservation pour le jour même : présence confirmée d'office, aucun suivi.
  const sameDay = input.date === restaurantNow(now).date;
  const schedule = scheduleFor(input.date, start, settings, now, sameDay);
  const { tokenHash, tokenCipher } = createManageToken();
  const doc: ReservationDoc = {
    _id: new ObjectId(),
    reference: await uniqueReference(),
    ...input,
    ...schedule,
    status: "confirmed",
    overbooked: false,
    source: actor.kind === "admin" ? "admin" : "online",
    attendanceConfirmedAt: sameDay ? now : null,
    manage: { tokenHash, tokenCipher, expiresAt: new Date(schedule.startsAt.getTime() + 24 * 60 * MINUTE) },
    notifications: [],
    createdAt: now,
    updatedAt: now,
    createdBy: actor.kind === "admin" ? actor.adminId : null,
  };

  await withAreaLock(input.date, area.id, async (session) => {
    const left = seatsLeft(area.capacity, await intervalsFor(input.date, area.id, { session }), start, seatingMinutes(settings));
    if (input.partySize > left) {
      if (!(actor.kind === "admin" && options.allowOverbooking)) throw capacityError(left);
      doc.overbooked = true;
    }
    const { reservations } = await collections();
    await reservations.insertOne(doc, { session });
  });

  await logAudit({
    ...auditActor(actor),
    action: "reservation.create",
    reservationId: doc._id,
    details: { date: doc.date, time: doc.time, areaId: doc.areaId, partySize: doc.partySize, overbooked: doc.overbooked },
  });
  await sendConfirmation(doc);
  if (actor.kind === "client") await notifyRestaurant(doc);
  return doc;
}

export async function updateReservation(
  id: ObjectId,
  changes: Partial<ReservationInput>,
  actor: Actor,
  options: { allowOverbooking?: boolean; now?: Date } = {},
) {
  const now = options.now ?? new Date();
  const { reservations } = await collections();
  const current = await reservations.findOne({ _id: id });
  if (!current || current.anonymizedAt) throw new ReservationError("Réservation introuvable.", "not_found");
  if (current.status === "cancelled") throw new ReservationError("Cette réservation est annulée.", "locked");
  if (actor.kind === "client" && now.getTime() >= current.startsAt.getTime() - CLIENT_CHANGE_CUTOFF_MINUTES * MINUTE) {
    throw new ReservationError(
      `Les modifications en ligne sont possibles jusqu'à ${CLIENT_CHANGE_CUTOFF_MINUTES} minutes avant votre réservation. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`,
      "locked",
    );
  }

  const next: ReservationTiming = {
    date: changes.date ?? current.date,
    time: changes.time ?? current.time,
    areaId: changes.areaId ?? current.areaId,
    partySize: changes.partySize ?? current.partySize,
  };
  const timingChanged =
    next.date !== current.date || next.time !== current.time || next.areaId !== current.areaId || next.partySize !== current.partySize;

  const set: Partial<ReservationDoc> = { updatedAt: now };
  const contactFields = (["firstName", "lastName", "phone", "email", "note"] as const).filter(
    (field) => changes[field] !== undefined && changes[field] !== current[field],
  );
  for (const field of contactFields) set[field] = changes[field];

  if (timingChanged) {
    const { areas, settings } = await loadRules();
    const area = requireBookableArea(areas, next.areaId);
    const start = timeToMinutes(next.time);
    assertTiming(next.date, start, settings, actor, now);
    // Modifier le jour J pour le jour même vaut confirmation. Changer de jour remet
    // la confirmation à zéro : le suivi recommence le nouveau jour à 10 h.
    const attendanceConfirmedAt =
      next.date === restaurantNow(now).date ? (current.attendanceConfirmedAt ?? now) : next.date !== current.date ? null : current.attendanceConfirmedAt;
    const schedule = scheduleFor(next.date, start, settings, now, Boolean(attendanceConfirmedAt));

    Object.assign(set, next, schedule, {
      overbooked: false,
      attendanceConfirmedAt,
      ...(current.manage ? { manage: { ...current.manage, expiresAt: new Date(schedule.startsAt.getTime() + 24 * 60 * MINUTE) } } : {}),
    });

    await withAreaLock(next.date, area.id, async (session) => {
      const intervals = await intervalsFor(next.date, area.id, { session, excludeId: id });
      const left = seatsLeft(area.capacity, intervals, start, seatingMinutes(settings));
      if (next.partySize > left) {
        if (!(actor.kind === "admin" && options.allowOverbooking)) throw capacityError(left);
        set.overbooked = true;
      }
      const result = await reservations.updateOne({ _id: id, status: { $ne: "cancelled" } }, { $set: set }, { session });
      if (!result.matchedCount) throw new ReservationError("Cette réservation n'est plus modifiable.", "locked");
    });
  } else {
    await reservations.updateOne({ _id: id }, { $set: set });
  }

  await logAudit({
    ...auditActor(actor),
    action: "reservation.update",
    reservationId: id,
    details: { before: pickTiming(current), after: next, contactFields },
  });

  const updated = await reservations.findOne({ _id: id });
  if (!updated) throw new ReservationError("Réservation introuvable.", "not_found");
  if (timingChanged) await sendUpdate(updated);
  return updated;
}

function pickTiming(doc: ReservationDoc): ReservationTiming {
  return { date: doc.date, time: doc.time, areaId: doc.areaId, partySize: doc.partySize };
}

export async function cancelReservation(id: ObjectId, actor: Actor, options: { notifyClient?: boolean; now?: Date } = {}) {
  const now = options.now ?? new Date();
  const { reservations } = await collections();
  const current = await reservations.findOne({ _id: id });
  if (!current || current.anonymizedAt) throw new ReservationError("Réservation introuvable.", "not_found");
  if (current.status === "cancelled") return current;
  if (actor.kind === "client" && (current.status !== "confirmed" || now >= current.startsAt)) {
    throw new ReservationError(`Cette réservation ne peut plus être annulée en ligne. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`, "locked");
  }

  const updated = await reservations.findOneAndUpdate(
    { _id: id, status: { $ne: "cancelled" } },
    {
      $set: {
        status: "cancelled",
        cancelledAt: now,
        updatedAt: now,
        ...(current.check.state === "pending" ? { "check.state": "skipped" } : {}),
        ...(current.lastCall.state === "pending" ? { "lastCall.state": "skipped" } : {}),
      },
    },
    { returnDocument: "after" },
  );
  if (!updated) return current;

  await logAudit({ ...auditActor(actor), action: "reservation.cancel", reservationId: id });
  if (options.notifyClient ?? true) await sendCancellation(updated);
  return updated;
}

export async function setAttendanceStatus(id: ObjectId, status: "confirmed" | "arrived" | "no_show", actor: Actor) {
  const { reservations } = await collections();
  const result = await reservations.updateOne(
    { _id: id, status: { $ne: "cancelled" } },
    { $set: { status, updatedAt: new Date() } },
  );
  if (!result.matchedCount) throw new ReservationError("Réservation introuvable ou annulée.", "not_found");
  await logAudit({ ...auditActor(actor), action: `reservation.status.${status}`, reservationId: id });
}

export async function findByManageToken(token: string, now = new Date()) {
  if (!isManageTokenFormat(token)) return null;
  const { reservations } = await collections();
  const doc = await reservations.findOne({ "manage.tokenHash": sha256(token) });
  if (!doc?.manage || doc.manage.expiresAt < now) return null;
  return doc;
}

export async function confirmAttendance(id: ObjectId, actor: Actor, now = new Date()) {
  const { reservations } = await collections();
  const result = await reservations.updateOne(
    { _id: id, status: "confirmed", attendanceConfirmedAt: null, startsAt: { $gt: new Date(now.getTime() - 60 * MINUTE) } },
    { $set: { attendanceConfirmedAt: now, autoCancelAt: null, updatedAt: now } },
  );
  if (result.modifiedCount) await logAudit({ ...auditActor(actor), action: "reservation.attendance_confirmed", reservationId: id });
  return result.modifiedCount > 0;
}

export async function resendManageLink(id: ObjectId, actor: Actor) {
  const { reservations } = await collections();
  const doc = await reservations.findOne({ _id: id });
  if (!doc || doc.status === "cancelled" || !doc.manage) throw new ReservationError("Réservation introuvable ou annulée.", "not_found");
  await sendConfirmation(doc);
  await logAudit({ ...auditActor(actor), action: "reservation.link_resent", reservationId: id });
}

type FollowUp = "check" | "lastCall";

// Envois de suivi, dans l'ordre : demande de 10 h (courriel + SMS), dernier rappel 4 h avant (courriel).
// Chacun renvoie vrai si au moins un message est parti.
const FOLLOW_UPS: { field: FollowUp; label: string; send: (doc: ReservationDoc) => Promise<boolean> }[] = [
  { field: "check", label: "Demande de confirmation", send: sendConfirmationRequest },
  { field: "lastCall", label: "Dernier rappel", send: sendLastCall },
];

// Appelé chaque minute par la tâche planifiée (instrumentation.ts).
export async function processDueReminders(now = new Date()) {
  const { reservations } = await collections();
  const totals = { sent: 0, failed: 0, skipped: 0, autoCancelled: 0 };

  for (const { field, label, send } of FOLLOW_UPS) {
    const state = `${field}.state`;
    const dueAt = `${field}.dueAt`;
    const claimedAt = `${field}.claimedAt`;

    // Un envoi interrompu (redémarrage du serveur) ne reste pas bloqué indéfiniment.
    await reservations.updateMany(
      { [state]: "processing", [claimedAt]: { $lt: new Date(now.getTime() - 15 * MINUTE) } },
      { $set: { [state]: "failed" } },
    );

    for (let index = 0; index < 200; index += 1) {
      // Chaque envoi est réservé atomiquement avant de partir : jamais de doublon,
      // même si deux passages se chevauchent.
      const doc = await reservations.findOneAndUpdate(
        { status: "confirmed", [state]: "pending", [dueAt]: { $lte: now }, startsAt: { $gt: now } },
        { $set: { [state]: "processing", [claimedAt]: now } },
        { sort: { startsAt: 1 }, returnDocument: "after" },
      );
      if (!doc) break;

      // Présence déjà confirmée : rien à demander.
      if (doc.attendanceConfirmedAt) {
        await reservations.updateOne({ _id: doc._id }, { $set: { [state]: "skipped" } });
        totals.skipped += 1;
        continue;
      }

      // Une erreur sur une réservation ne bloque pas les envois des suivantes.
      let delivered = false;
      try {
        delivered = await send(doc);
      } catch (error) {
        console.error(`${label} impossible pour la réservation ${doc.reference} :`, error);
      }
      await reservations.updateOne({ _id: doc._id }, { $set: { [state]: delivered ? "sent" : "failed" } });
      if (delivered) totals.sent += 1;
      else totals.failed += 1;
    }
  }

  // Annulation automatique : ni confirmation ni modification avant l'heure limite.
  // Une réservation dont l'heure est déjà passée n'est jamais annulée (serveur arrêté entre-temps).
  for (let index = 0; index < 200; index += 1) {
    const doc = await reservations.findOneAndUpdate(
      { status: "confirmed", attendanceConfirmedAt: null, autoCancelAt: { $ne: null, $lte: now }, startsAt: { $gt: now } },
      { $set: { status: "cancelled", cancelReason: "no_confirmation", cancelledAt: now, updatedAt: now } },
      { returnDocument: "after" },
    );
    if (!doc) break;

    for (const field of ["check", "lastCall"] as const) {
      if (doc[field].state === "pending") await reservations.updateOne({ _id: doc._id }, { $set: { [`${field}.state`]: "skipped" } });
    }
    await logAudit({ actor: "system", action: "reservation.auto_cancel", reservationId: doc._id });
    try {
      await sendAutoCancellation(doc);
    } catch (error) {
      console.error(`Courriel d'annulation automatique impossible pour ${doc.reference} :`, error);
    }
    totals.autoCancelled += 1;
  }

  return { ...totals, anonymized: await anonymizeOldReservations(now) };
}

// Loi 25 : on ne garde pas les données personnelles plus longtemps que nécessaire.
async function anonymizeOldReservations(now: Date) {
  const { reservations } = await collections();
  const cutoff = addDays(restaurantNow(now).date, -PERSONAL_DATA_RETENTION_DAYS);
  const result = await reservations.updateMany(
    { date: { $lt: cutoff }, anonymizedAt: { $exists: false } },
    {
      $set: { firstName: "Client", lastName: "anonymisé", phone: "", email: "", note: "", anonymizedAt: now },
      $unset: { manage: "" },
    },
  );
  return result.modifiedCount;
}

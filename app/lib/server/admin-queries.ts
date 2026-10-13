import "server-only";

import { ObjectId } from "mongodb";

import { daySlots, occupancyAt, seatingMinutes, seatsLeft } from "@/app/lib/reservations/availability";
import { SLOT_INTERVAL_MINUTES } from "@/app/lib/reservations/config";
import { addDays, restaurantNow } from "@/app/lib/reservations/time";
import type { Area, ReservationSettings } from "@/app/lib/reservations/types";
import { normalizePhone } from "@/app/lib/reservations/validation";

import { logAudit } from "./audit";
import { collections } from "./db";
import { forwardInboundSms } from "./notifications";
import { BLOCKING_STATUSES, getAreas, getSettings, toInterval } from "./reservations";

export async function dayOverview(date: string) {
  const [areas, settings] = await Promise.all([getAreas(), getSettings()]);
  const { reservations } = await collections();
  const docs = await reservations.find({ date }).sort({ startMinutes: 1, createdAt: 1 }).toArray();
  const duration = seatingMinutes(settings);

  const slotSet = new Set(daySlots(settings, date));
  for (const doc of docs) {
    if (BLOCKING_STATUSES.includes(doc.status)) {
      slotSet.add(Math.floor(doc.startMinutes / SLOT_INTERVAL_MINUTES) * SLOT_INTERVAL_MINUTES);
    }
  }
  const slots = [...slotSet].sort((a, b) => a - b);

  const areaStats = areas.map((area) => {
    const active = docs.filter((doc) => doc.areaId === area.id && BLOCKING_STATUSES.includes(doc.status));
    const intervals = active.map(toInterval);
    let peak = 0;
    let peakAt: number | null = null;
    for (const interval of intervals) {
      const occupancy = occupancyAt(intervals, interval.start);
      if (occupancy > peak) {
        peak = occupancy;
        peakAt = interval.start;
      }
    }
    return {
      area,
      reservations: active.length,
      guests: active.reduce((total, doc) => total + doc.partySize, 0),
      peak,
      peakAt,
      cells: slots.map((minutes) => ({ minutes, seatsLeft: seatsLeft(area.capacity, intervals, minutes, duration) })),
    };
  });

  return { areas, settings, slots, areaStats, reservations: docs };
}

// Places libres pour chacun des 96 créneaux de 15 min de la journée, par lieu.
// `excludeId` retire la réservation en cours de modification du calcul.
export async function seatsForDay(date: string, excludeId?: ObjectId) {
  const [areas, settings] = await Promise.all([getAreas(), getSettings()]);
  const { reservations } = await collections();
  const docs = await reservations
    .find(
      { date, status: { $in: BLOCKING_STATUSES }, ...(excludeId ? { _id: { $ne: excludeId } } : {}) },
      { projection: { areaId: 1, startMinutes: 1, endMinutes: 1, partySize: 1 } },
    )
    .toArray();
  const duration = seatingMinutes(settings);
  const allSlots = Array.from({ length: 1440 / SLOT_INTERVAL_MINUTES }, (_, index) => index * SLOT_INTERVAL_MINUTES);

  return {
    areas,
    openSlots: daySlots(settings, date),
    seats: Object.fromEntries(
      areas.map((area) => {
        const intervals = docs.filter((doc) => doc.areaId === area.id).map(toInterval);
        return [area.id, allSlots.map((slot) => seatsLeft(area.capacity, intervals, slot, duration))];
      }),
    ),
  };
}

export async function monthSummary(month: string) {
  const { reservations } = await collections();
  const firstDay = `${month}-01`;
  const nextMonth = addDays(firstDay, 32).slice(0, 7);
  const rows = await reservations
    .aggregate<{ _id: string; reservations: number; guests: number }>([
      { $match: { date: { $gte: firstDay, $lt: `${nextMonth}-01` }, status: { $in: BLOCKING_STATUSES } } },
      { $group: { _id: "$date", reservations: { $sum: 1 }, guests: { $sum: "$partySize" } } },
    ])
    .toArray();
  return new Map(rows.map((row) => [row._id, { reservations: row.reservations, guests: row.guests }]));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Recherche par nom, prénom, courriel, téléphone ou référence, toutes dates.
// Les réservations à venir sont listées en premier.
export async function searchReservations(query: string) {
  const terms = query.trim().slice(0, 80).split(/\s+/).filter(Boolean);
  if (!terms.length || terms.join("").length < 2) return [];

  const { reservations } = await collections();
  const filter = {
    $and: terms.map((term) => {
      const pattern = new RegExp(escapeRegex(term), "i");
      const digits = term.replace(/\D/g, "");
      return {
        $or: [
          { firstName: pattern },
          { lastName: pattern },
          { email: pattern },
          { reference: term.toUpperCase() },
          ...(digits.length >= 3 ? [{ phone: { $regex: escapeRegex(digits) } }] : []),
        ],
      };
    }),
  };

  const docs = await reservations.find(filter).sort({ startsAt: -1 }).limit(100).toArray();
  const today = restaurantNow().date;
  const upcoming = docs.filter((doc) => doc.date >= today).reverse();
  const past = docs.filter((doc) => doc.date < today);
  return [...upcoming, ...past];
}

export async function getReservation(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const { reservations } = await collections();
  return reservations.findOne({ _id: new ObjectId(id) });
}

export async function futureReservationCounts(now = new Date()) {
  const { reservations } = await collections();
  const rows = await reservations
    .aggregate<{ _id: string; count: number }>([
      { $match: { startsAt: { $gt: now }, status: "confirmed" } },
      { $group: { _id: "$areaId", count: { $sum: 1 } } },
    ])
    .toArray();
  return new Map(rows.map((row) => [row._id, row.count]));
}

export async function saveAreas(updates: Pick<Area, "id" | "capacity" | "active">[], adminId: ObjectId) {
  const { areas } = await collections();
  const now = new Date();
  const before = await getAreas();
  await Promise.all(
    updates.map((update) =>
      areas.updateOne({ _id: update.id }, { $set: { capacity: update.capacity, active: update.active, updatedAt: now } }),
    ),
  );
  await logAudit({
    actor: "admin",
    adminId,
    action: "settings.areas",
    details: { before: before.map(({ id, capacity, active }) => ({ id, capacity, active })), after: updates },
  });
}

export async function saveSettings(settings: ReservationSettings, adminId: ObjectId) {
  const { settings: collection } = await collections();
  const before = await getSettings();
  await collection.updateOne({ _id: "reservations" }, { $set: { ...settings, updatedAt: new Date() } });
  await logAudit({ actor: "admin", adminId, action: "settings.rules", details: { before, after: settings } });
}

export async function recentInboundSms(limit = 10) {
  const { inboundSms } = await collections();
  const since = new Date(Date.now() - 3 * 86_400_000);
  return inboundSms.find({ receivedAt: { $gte: since } }).sort({ receivedAt: -1 }).limit(limit).toArray();
}

export async function inboundSmsFor(reservationId: ObjectId) {
  const { inboundSms } = await collections();
  return inboundSms.find({ reservationId }).sort({ receivedAt: -1 }).limit(20).toArray();
}

// Réponse d'un client au SMS de rappel : rattachée à sa prochaine réservation
// et transférée par courriel au restaurant.
export async function handleInboundSms(from: string, body: string, messageSid: string) {
  const { inboundSms, reservations } = await collections();
  const phone = normalizePhone(from) ?? from.slice(0, 20);
  const yesterday = addDays(restaurantNow().date, -1);
  const reservation = await reservations
    .find({ phone, date: { $gte: yesterday }, status: { $ne: "cancelled" } })
    .sort({ startsAt: 1 })
    .limit(1)
    .next();

  await inboundSms.insertOne({
    from: phone,
    body: body.slice(0, 1600),
    receivedAt: new Date(),
    messageSid: messageSid.slice(0, 64),
    reservationId: reservation?._id ?? null,
  });
  await forwardInboundSms(phone, body.slice(0, 1600), reservation);
}

export async function updateSmsDeliveryStatus(messageSid: string, twilioStatus: string, errorCode: string | null) {
  const status = twilioStatus === "delivered" ? "delivered" : twilioStatus === "failed" || twilioStatus === "undelivered" ? "failed" : null;
  if (!status) return;
  const { reservations } = await collections();
  await reservations.updateOne(
    { "notifications.providerId": messageSid },
    {
      $set: {
        "notifications.$.status": status,
        ...(errorCode ? { "notifications.$.error": `Twilio ${errorCode.slice(0, 10)}` } : {}),
      },
    },
  );
}

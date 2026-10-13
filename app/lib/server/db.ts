import "server-only";

import { MongoClient, type Db, type ObjectId } from "mongodb";

import { DEFAULT_AREAS, DEFAULT_SETTINGS } from "@/app/lib/reservations/config";
import type {
  NotificationLog,
  ReminderState,
  ReservationSettings,
  ReservationSource,
  ReservationStatus,
} from "@/app/lib/reservations/types";

import { requireEnv } from "./env";

export type AreaDoc = {
  _id: string;
  name: string;
  capacity: number;
  active: boolean;
  order: number;
  updatedAt: Date;
};

export type SettingsDoc = ReservationSettings & { _id: "reservations"; updatedAt: Date };

export type ReservationDoc = {
  _id: ObjectId;
  reference: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note: string;
  date: string;
  time: string;
  startMinutes: number;
  endMinutes: number;
  startsAt: Date;
  partySize: number;
  areaId: string;
  status: ReservationStatus;
  overbooked: boolean;
  source: ReservationSource;
  attendanceConfirmedAt: Date | null;
  // Le jeton du lien client : l'empreinte sert à le retrouver, la version
  // chiffrée permet de renvoyer le même lien (rappel, bouton « Renvoyer »).
  manage?: { tokenHash: string; tokenCipher: string; expiresAt: Date };
  // Demande de confirmation le jour J à 10 h (courriel + SMS), dernier rappel 4 h avant
  // (courriel), puis annulation automatique si la présence n'est toujours pas confirmée.
  check: { state: ReminderState; dueAt: Date; claimedAt?: Date };
  lastCall: { state: ReminderState; dueAt: Date; claimedAt?: Date };
  autoCancelAt: Date | null;
  cancelReason?: "no_confirmation";
  notifications: NotificationLog[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: ObjectId | null;
  cancelledAt?: Date;
  anonymizedAt?: Date;
};

export type AdminDoc = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  mustChangePassword: boolean;
  createdAt: Date;
  passwordChangedAt?: Date;
  lastLoginAt?: Date;
};

export type SessionDoc = {
  _id: string;
  adminId: ObjectId;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
  ip: string;
  userAgent: string;
};

export type RateLimitDoc = { _id: string; count: number; expiresAt: Date };
export type LockDoc = { _id: string; version: number };

export type AuditDoc = {
  at: Date;
  actor: "admin" | "client" | "system";
  adminId?: ObjectId;
  action: string;
  reservationId?: ObjectId;
  details?: Record<string, unknown>;
  ip?: string;
};

export type InboundSmsDoc = {
  from: string;
  body: string;
  receivedAt: Date;
  messageSid: string;
  reservationId: ObjectId | null;
};

const globalForMongo = globalThis as typeof globalThis & {
  __le1000MongoClient?: Promise<MongoClient>;
  __le1000Db?: Promise<Db>;
};

export function getMongoClient() {
  globalForMongo.__le1000MongoClient ??= new MongoClient(requireEnv("MONGO_URI"), { maxPoolSize: 10 })
    .connect()
    .catch((error) => {
      globalForMongo.__le1000MongoClient = undefined;
      throw error;
    });
  return globalForMongo.__le1000MongoClient;
}

function getDb() {
  globalForMongo.__le1000Db ??= initialize().catch((error) => {
    globalForMongo.__le1000Db = undefined;
    throw error;
  });
  return globalForMongo.__le1000Db;
}

function typedCollections(db: Db) {
  return {
    areas: db.collection<AreaDoc>("areas"),
    settings: db.collection<SettingsDoc>("settings"),
    reservations: db.collection<ReservationDoc>("reservations"),
    admins: db.collection<AdminDoc>("admins"),
    sessions: db.collection<SessionDoc>("sessions"),
    rateLimits: db.collection<RateLimitDoc>("rateLimits"),
    locks: db.collection<LockDoc>("locks"),
    auditLog: db.collection<AuditDoc>("auditLog"),
    inboundSms: db.collection<InboundSmsDoc>("inboundSms"),
  };
}

export async function collections() {
  return typedCollections(await getDb());
}

async function initialize() {
  const client = await getMongoClient();
  const db = client.db();
  const c = typedCollections(db);

  await Promise.all([
    c.reservations.createIndex({ date: 1, areaId: 1, status: 1 }),
    c.reservations.createIndex({ reference: 1 }, { unique: true }),
    c.reservations.createIndex(
      { "manage.tokenHash": 1 },
      { unique: true, partialFilterExpression: { "manage.tokenHash": { $exists: true } } },
    ),
    c.reservations.createIndex({ "check.state": 1, "check.dueAt": 1 }),
    c.reservations.createIndex({ "lastCall.state": 1, "lastCall.dueAt": 1 }),
    c.reservations.createIndex({ status: 1, autoCancelAt: 1 }),
    c.reservations.createIndex({ phone: 1, startsAt: -1 }),
    c.reservations.createIndex({ email: 1, startsAt: -1 }),
    c.reservations.createIndex({ "notifications.providerId": 1 }, { sparse: true }),
    c.admins.createIndex({ email: 1 }, { unique: true }),
    c.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    c.sessions.createIndex({ adminId: 1 }),
    c.rateLimits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    c.auditLog.createIndex({ reservationId: 1, at: -1 }),
    c.auditLog.createIndex({ at: 1 }, { expireAfterSeconds: 2 * 365 * 86_400 }),
    c.inboundSms.createIndex({ receivedAt: 1 }, { expireAfterSeconds: 365 * 86_400 }),
  ]);

  await ensureDefaults(c);

  // Migration : les réservations créées avec l'ancien rappel unique passent au suivi
  // actuel, sans annulation automatique (elles n'en avaient pas été averties).
  await c.reservations.updateMany({ check: { $exists: false } }, [
    {
      $set: {
        check: { state: "skipped", dueAt: "$startsAt" },
        lastCall: { state: "skipped", dueAt: "$startsAt" },
        autoCancelAt: null,
      },
    },
    { $unset: ["reminder", "morning"] },
  ]);

  return db;
}

// Les lieux sont créés désactivés et sans places : l'admin les configure.
// Sans effet sur ce qui existe déjà ; rappelé si un document a disparu.
export async function ensureDefaults(c: ReturnType<typeof typedCollections>) {
  const now = new Date();
  await Promise.all([
    ...DEFAULT_AREAS.map((area) =>
      c.areas.updateOne(
        { _id: area.id },
        { $setOnInsert: { name: area.name, order: area.order, capacity: 0, active: false, updatedAt: now } },
        { upsert: true },
      ),
    ),
    c.settings.updateOne({ _id: "reservations" }, { $setOnInsert: { ...DEFAULT_SETTINGS, updatedAt: now } }, { upsert: true }),
  ]);
}

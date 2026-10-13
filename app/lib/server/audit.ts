import "server-only";

import type { ObjectId } from "mongodb";

import { collections, type AuditDoc } from "./db";

export async function logAudit(entry: Omit<AuditDoc, "at">) {
  try {
    const { auditLog } = await collections();
    await auditLog.insertOne({ ...entry, at: new Date() });
  } catch (error) {
    console.error("Impossible d'écrire dans le journal d'audit :", error);
  }
}

export async function auditTrail(reservationId: ObjectId) {
  const { auditLog } = await collections();
  return auditLog.find({ reservationId }).sort({ at: -1 }).limit(50).toArray();
}

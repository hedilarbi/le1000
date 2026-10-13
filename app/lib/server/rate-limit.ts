import "server-only";

import { MongoServerError } from "mongodb";

import { collections } from "./db";

function windowFor(key: string, windowSeconds: number) {
  const index = Math.floor(Date.now() / (windowSeconds * 1000));
  return { id: `${key}:${index}`, expiresAt: new Date((index + 1) * windowSeconds * 1000) };
}

// Compteur par fenêtre fixe, partagé entre toutes les instances via MongoDB.
export async function consume(key: string, limit: number, windowSeconds: number) {
  const { rateLimits } = await collections();
  const { id, expiresAt } = windowFor(key, windowSeconds);
  const increment = () =>
    rateLimits.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
      { upsert: true, returnDocument: "after" },
    );

  let doc;
  try {
    doc = await increment();
  } catch (error) {
    // Deux premières requêtes simultanées : l'une des deux insertions échoue.
    if (!(error instanceof MongoServerError && error.code === 11000)) throw error;
    doc = await increment();
  }
  return {
    allowed: (doc?.count ?? 1) <= limit,
    retryAfterSeconds: Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000)),
  };
}

export async function currentCount(key: string, windowSeconds: number) {
  const { rateLimits } = await collections();
  const doc = await rateLimits.findOne({ _id: windowFor(key, windowSeconds).id });
  return doc?.count ?? 0;
}

export async function clearLimit(key: string, windowSeconds: number) {
  const { rateLimits } = await collections();
  await rateLimits.deleteOne({ _id: windowFor(key, windowSeconds).id });
}

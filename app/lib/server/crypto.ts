import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";

import { requireEnv } from "./env";

export function randomToken(bytes: number) {
  return randomBytes(bytes).toString("base64url");
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

// Comparaison à temps constant, quelle que soit la longueur des chaînes.
export function safeEqual(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

function reservationTokenKey() {
  const key = Buffer.from(requireEnv("RESERVATION_TOKEN_KEY"), "base64");
  if (key.length !== 32) throw new Error("RESERVATION_TOKEN_KEY doit contenir 32 octets encodés en base64.");
  return key;
}

function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", reservationTokenKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

export function decrypt(payload: string) {
  const data = Buffer.from(payload, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", reservationTokenKey(), data.subarray(0, 12));
  decipher.setAuthTag(data.subarray(12, 28));
  return Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]).toString("utf8");
}

// 18 octets = 144 bits d'aléa : impossible à deviner, et assez court pour un SMS.
const MANAGE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{24}$/;

export function createManageToken() {
  const token = randomToken(18);
  return { token, tokenHash: sha256(token), tokenCipher: encrypt(token) };
}

export function isManageTokenFormat(token: string) {
  return MANAGE_TOKEN_PATTERN.test(token);
}

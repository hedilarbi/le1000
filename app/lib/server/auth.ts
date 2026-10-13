import "server-only";

import { hash, verify } from "@node-rs/argon2";
import type { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { randomToken, sha256 } from "./crypto";
import { collections } from "./db";
import { isProduction } from "./env";
import { requestMeta } from "./request";

// Préfixe __Host- : cookie limité au domaine exact, en HTTPS, sur tout le site.
export const SESSION_COOKIE = isProduction ? "__Host-le1000-admin" : "le1000-admin";

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const IDLE_TIMEOUT_MS = 2 * 60 * 60 * 1000;
const TOUCH_INTERVAL_MS = 5 * 60 * 1000;
const MAX_TOKEN_LENGTH = 64;

export const MIN_PASSWORD_LENGTH = 12;

export type AdminUser = {
  id: ObjectId;
  email: string;
  mustChangePassword: boolean;
};

// Hachage argon2id (algorithme par défaut) avec les paramètres recommandés par l'OWASP.
export function hashPassword(password: string) {
  return hash(password);
}

export async function verifyPassword(passwordHash: string, password: string) {
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}

// Empreinte factice : un courriel inconnu prend autant de temps à vérifier
// qu'un vrai compte, on ne peut donc pas deviner quels comptes existent.
let dummyHash: Promise<string> | undefined;

export async function verifyAdminPassword(passwordHash: string | undefined, password: string) {
  dummyHash ??= hashPassword(randomToken(16));
  const valid = await verifyPassword(passwordHash ?? (await dummyHash), password);
  return Boolean(passwordHash) && valid;
}

export async function startSession(adminId: ObjectId) {
  const token = randomToken(32);
  const now = new Date();
  const { ip, userAgent } = await requestMeta();
  const { sessions } = await collections();

  await sessions.insertOne({
    _id: sha256(token),
    adminId,
    createdAt: now,
    lastSeenAt: now,
    expiresAt: new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000),
    ip,
    userAgent,
  });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export const getCurrentAdmin = cache(async (): Promise<AdminUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length > MAX_TOKEN_LENGTH) return null;

  const { sessions, admins } = await collections();
  const session = await sessions.findOne({ _id: sha256(token) });
  const now = Date.now();
  if (!session || session.expiresAt.getTime() <= now || now - session.lastSeenAt.getTime() > IDLE_TIMEOUT_MS) {
    return null;
  }

  const admin = await admins.findOne({ _id: session.adminId });
  if (!admin) return null;

  if (now - session.lastSeenAt.getTime() > TOUCH_INTERVAL_MS) {
    await sessions.updateOne({ _id: session._id }, { $set: { lastSeenAt: new Date(now) } });
  }

  return { id: admin._id, email: admin.email, mustChangePassword: admin.mustChangePassword };
});

// À appeler dans chaque page, Server Action et route de l'admin : le proxy ne
// fait qu'une vérification rapide du cookie, c'est ici que la session est validée.
export async function requireAdmin(options: { allowPasswordChange?: boolean } = {}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (admin.mustChangePassword && !options.allowPasswordChange) redirect("/admin/mot-de-passe");
  return admin;
}

export async function endSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token && token.length <= MAX_TOKEN_LENGTH) {
    const { sessions } = await collections();
    await sessions.deleteOne({ _id: sha256(token) });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function endAllSessions(adminId: ObjectId) {
  const { sessions } = await collections();
  await sessions.deleteMany({ adminId });
}

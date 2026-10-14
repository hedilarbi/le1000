"use server";

import { logAudit } from "@/app/lib/server/audit";
import { startSession, verifyAdminPassword } from "@/app/lib/server/auth";
import { collections } from "@/app/lib/server/db";
import { clearLimit, consume, currentCount } from "@/app/lib/server/rate-limit";
import { requestMeta } from "@/app/lib/server/request";

// Après connexion, le navigateur recharge entièrement la page de destination
// (voir LoginForm) : aucun état du routeur client ne survit au changement de session.
export type LoginState = { error?: string; redirectTo?: string };

const WINDOW_SECONDS = 15 * 60;
const MAX_ATTEMPTS_PER_IP = 20;
const MAX_FAILURES_PER_ACCOUNT = 5;
const INVALID = "Courriel ou mot de passe invalide.";
const LOCKED = "Trop de tentatives. Réessayez dans 15 minutes.";

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 254);
  const password = String(formData.get("password") ?? "").slice(0, 256);
  const { ip } = await requestMeta();

  if (!(await consume(`login-ip:${ip}`, MAX_ATTEMPTS_PER_IP, WINDOW_SECONDS)).allowed) return { error: LOCKED };
  if ((await currentCount(`login-fail:${email}`, WINDOW_SECONDS)) >= MAX_FAILURES_PER_ACCOUNT) return { error: LOCKED };
  if (!email || !password) return { error: INVALID };

  const { admins } = await collections();
  const admin = await admins.findOne({ email });
  if (!(await verifyAdminPassword(admin?.passwordHash, password)) || !admin) {
    await consume(`login-fail:${email}`, MAX_FAILURES_PER_ACCOUNT, WINDOW_SECONDS);
    await logAudit({ actor: "admin", action: "auth.login_failed", details: { email }, ip });
    return { error: INVALID };
  }

  await clearLimit(`login-fail:${email}`, WINDOW_SECONDS);
  await admins.updateOne({ _id: admin._id }, { $set: { lastLoginAt: new Date() } });
  await startSession(admin._id);
  await logAudit({ actor: "admin", adminId: admin._id, action: "auth.login", ip });
  return { redirectTo: admin.mustChangePassword ? "/admin/mot-de-passe" : "/admin" };
}

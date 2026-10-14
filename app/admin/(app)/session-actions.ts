"use server";

import { redirect } from "next/navigation";

import { logAudit } from "@/app/lib/server/audit";
import {
  endAllSessions,
  endSession,
  getCurrentAdmin,
  hashPassword,
  MIN_PASSWORD_LENGTH,
  requireAdmin,
  startSession,
  verifyPassword,
} from "@/app/lib/server/auth";
import { collections } from "@/app/lib/server/db";
import { consume } from "@/app/lib/server/rate-limit";
import { requestMeta } from "@/app/lib/server/request";

export async function logoutAction() {
  const admin = await getCurrentAdmin();
  await endSession();
  if (admin) await logAudit({ actor: "admin", adminId: admin.id, action: "auth.logout" });
  redirect("/admin/login");
}

export type PasswordState = { error?: string; redirectTo?: string };

export async function changePasswordAction(_previous: PasswordState, formData: FormData): Promise<PasswordState> {
  const admin = await requireAdmin({ allowPasswordChange: true });
  const current = String(formData.get("current") ?? "").slice(0, 256);
  const next = String(formData.get("next") ?? "").slice(0, 256);
  const confirmation = String(formData.get("confirmation") ?? "").slice(0, 256);

  if (!(await consume(`password:${admin.id.toHexString()}`, 10, 15 * 60)).allowed) {
    return { error: "Trop de tentatives. Réessayez dans 15 minutes." };
  }
  if (next.length < MIN_PASSWORD_LENGTH) return { error: `Le nouveau mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.` };
  if (next !== confirmation) return { error: "Les deux mots de passe ne correspondent pas." };
  if (next === current) return { error: "Le nouveau mot de passe doit être différent de l'actuel." };

  const { admins } = await collections();
  const doc = await admins.findOne({ _id: admin.id });
  if (!doc || !(await verifyPassword(doc.passwordHash, current))) return { error: "Mot de passe actuel incorrect." };

  await admins.updateOne(
    { _id: admin.id },
    { $set: { passwordHash: await hashPassword(next), mustChangePassword: false, passwordChangedAt: new Date() } },
  );
  // Toutes les autres sessions sont fermées, celle-ci est renouvelée.
  await endAllSessions(admin.id);
  await startSession(admin.id);
  await logAudit({ actor: "admin", adminId: admin.id, action: "auth.password_changed", ip: (await requestMeta()).ip });
  return { redirectTo: "/admin" };
}

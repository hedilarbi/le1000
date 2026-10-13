import type { Metadata } from "next";

import { MIN_PASSWORD_LENGTH, requireAdmin } from "@/app/lib/server/auth";

import { ui } from "../../_components/ui";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = { title: "Mot de passe" };

export default async function PasswordPage() {
  const admin = await requireAdmin({ allowPasswordChange: true });

  return (
    <div className="mx-auto max-w-md">
      <h1 className={`${ui.heading} mb-2`}>Changer le mot de passe</h1>
      {admin.mustChangePassword ? (
        <p className={`${ui.error} mb-6`}>
          Pour des raisons de sécurité, choisissez un nouveau mot de passe avant de continuer. Il doit être différent de celui de la
          boîte courriel.
        </p>
      ) : (
        <p className={`${ui.muted} mb-6`}>Les autres appareils connectés seront déconnectés.</p>
      )}
      <div className={`${ui.card} p-6`}>
        <PasswordForm email={admin.email} minLength={MIN_PASSWORD_LENGTH} />
      </div>
    </div>
  );
}

"use client";

import { useActionState, useEffect } from "react";

import { SubmitButton } from "../../_components/submit-button";
import { ui } from "../../_components/ui";
import { changePasswordAction, type PasswordState } from "../session-actions";

export function PasswordForm({ email, minLength }: { email: string; minLength: number }) {
  const [state, action] = useActionState<PasswordState, FormData>(changePasswordAction, {});

  // Nouvelle session : rechargement complet du tableau de bord.
  useEffect(() => {
    if (state.redirectTo) window.location.replace(state.redirectTo);
  }, [state.redirectTo]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="email" name="username" autoComplete="username" value={email} hidden readOnly />
      <label className={ui.label}>
        Mot de passe actuel
        <input name="current" type="password" autoComplete="current-password" required className={ui.input} />
      </label>
      <label className={ui.label}>
        Nouveau mot de passe ({minLength} caractères minimum)
        <input name="next" type="password" autoComplete="new-password" minLength={minLength} required className={ui.input} />
      </label>
      <label className={ui.label}>
        Confirmer le nouveau mot de passe
        <input name="confirmation" type="password" autoComplete="new-password" minLength={minLength} required className={ui.input} />
      </label>
      {state.error && (
        <p role="alert" className={ui.error}>
          {state.error}
        </p>
      )}
      <SubmitButton className={`${ui.primary} mt-2`}>Enregistrer le mot de passe</SubmitButton>
    </form>
  );
}

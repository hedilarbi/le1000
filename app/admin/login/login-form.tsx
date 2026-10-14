"use client";

import { useActionState, useEffect, useState } from "react";

import { SubmitButton } from "../_components/submit-button";
import { ui } from "../_components/ui";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(loginAction, {});
  // Contrôlé : après un échec, le courriel reste saisi (seul le mot de passe est vidé).
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.redirectTo) window.location.replace(state.redirectTo);
  }, [state.redirectTo]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className={ui.label}>
        Courriel
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={ui.input}
        />
      </label>
      <label className={ui.label}>
        Mot de passe
        <input name="password" type="password" autoComplete="current-password" required className={ui.input} />
      </label>
      {state.error && (
        <p role="alert" className={ui.error}>
          {state.error}
        </p>
      )}
      <SubmitButton className={`${ui.primary} mt-2 w-full py-3`} pendingLabel="Connexion…" disabled={Boolean(state.redirectTo)}>
        {state.redirectTo ? "Connexion…" : "Se connecter"}
      </SubmitButton>
    </form>
  );
}

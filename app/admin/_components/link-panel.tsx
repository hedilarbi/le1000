"use client";

import { useActionState, useState } from "react";

import { resendLinkAction, type ResendState } from "../(app)/reservations/actions";
import { SubmitButton } from "./submit-button";
import { ui } from "./ui";

export function LinkPanel({ id, url, canResend }: { id: string; url: string; canResend: boolean }) {
  const [copied, setCopied] = useState(false);
  const [state, action] = useActionState<ResendState, FormData>(resendLinkAction, {});

  return (
    <div className="flex flex-col gap-3">
      <p className="break-all rounded-lg bg-ink px-3 py-2 font-mono text-xs text-ivory/70">{url}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={ui.small}
          onClick={async () => {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "Copié ✓" : "Copier le lien"}
        </button>
        {canResend && (
          <form action={action}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton className={ui.small} pendingLabel="Envoi…">
              Renvoyer par courriel
            </SubmitButton>
          </form>
        )}
      </div>
      {state.message && <p className={ui.success}>{state.message}</p>}
      {state.error && <p className={ui.error}>{state.error}</p>}
    </div>
  );
}

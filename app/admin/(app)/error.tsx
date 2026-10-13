"use client";

import { ui } from "../_components/ui";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={`${ui.card} mx-auto max-w-lg p-6 text-center`}>
      <h1 className={`${ui.subheading} mb-2`}>Une erreur est survenue</h1>
      <p className="mb-5 text-sm text-ivory/60">L&apos;action n&apos;a pas pu être effectuée. Réessayez dans un instant.</p>
      <button type="button" onClick={reset} className={ui.primary}>
        Réessayer
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

import { rs } from "./styles";

// Dernière vérification avant l'envoi : le courriel et le cellulaire servent à la
// confirmation de la réservation, une erreur la ferait annuler faute de réponse.
export function ContactCheckDialog({
  email,
  phone,
  onConfirm,
  onEdit,
}: {
  email: string;
  phone: string;
  onConfirm: () => void;
  onEdit: () => void;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEdit();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onEdit]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onEdit();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-check-title"
        className="w-full max-w-lg rounded-[2px] border border-gold/40 bg-ink-soft p-[clamp(22px,4vw,36px)] shadow-2xl"
      >
        <span className={rs.eyebrow}>DERNIÈRE VÉRIFICATION</span>
        <h2 id="contact-check-title" className="mt-3 font-display text-[clamp(30px,4vw,42px)] uppercase leading-[.95] text-white">
          Vos coordonnées sont-elles exactes ?
        </h2>

        <dl className="mt-6 flex flex-col gap-4 rounded-[2px] border border-ivory/10 bg-ink/60 p-5">
          <div>
            <dt className={rs.labelText}>COURRIEL</dt>
            <dd className="mt-1 break-all text-lg text-gold-bright">{email}</dd>
          </div>
          <div>
            <dt className={rs.labelText}>CELLULAIRE</dt>
            <dd className="mt-1 text-lg text-gold-bright">{phone}</dd>
          </div>
        </dl>

        <p className="mt-5 text-[15px] font-light leading-relaxed text-ivory/80">
          Ces coordonnées sont <strong className="font-semibold text-white">essentielles</strong> : c&apos;est par courriel et par texto que vous
          recevrez la confirmation et la demande de confirmation de présence. Sans réponse de votre part, la réservation sera annulée.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onEdit} className={rs.ghost}>
            Modifier
          </button>
          <button ref={confirmRef} type="button" onClick={onConfirm} className={rs.gold}>
            Oui, c&apos;est correct
          </button>
        </div>
      </div>
    </div>
  );
}

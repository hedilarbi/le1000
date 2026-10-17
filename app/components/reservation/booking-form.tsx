"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { bookAction, type BookingState } from "@/app/(site)/reservation/actions";
import { MAX_ONLINE_PARTY_SIZE, RESERVATION_PHONE_DISPLAY, RESERVATION_PHONE_LINK } from "@/app/lib/reservations/config";
import { formatDateFr, formatTimeFr } from "@/app/lib/reservations/time";
import { formatPhoneInput } from "@/app/lib/reservations/validation";

import { Dropdown } from "../ui/dropdown";
import { AreaTimeFields, type Slot } from "./area-time-fields";
import { ContactCheckDialog } from "./contact-check-dialog";
import { rs } from "./styles";
import { TurnstileWidget } from "./turnstile-widget";

const LARGE_GROUP = MAX_ONLINE_PARTY_SIZE + 1;
const PARTY_OPTIONS = Array.from({ length: MAX_ONLINE_PARTY_SIZE }, (_, index) => index + 1);

export function LargeGroupNotice() {
  return (
    <div className={`${rs.notice} flex flex-col gap-3`}>
      <p>
        Pour les groupes de <strong>{LARGE_GROUP} personnes et plus</strong>, la réservation se fait par téléphone : nous organisons votre
        venue avec vous.
      </p>
      <a href={RESERVATION_PHONE_LINK} className={`${rs.gold} self-start`}>
        Appeler le {RESERVATION_PHONE_DISPLAY}
      </a>
    </div>
  );
}

function SubmitBooking({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending || disabled} className={rs.gold}>
      {pending ? "Réservation en cours…" : "Confirmer la réservation"}
    </button>
  );
}

export function BookingForm({
  initialDate,
  initialPartySize,
  minDate,
  maxDate,
  turnstileSiteKey,
}: {
  initialDate: string;
  initialPartySize: number;
  minDate: string;
  maxDate: string;
  turnstileSiteKey: string | null;
}) {
  const [state, action] = useActionState<BookingState, FormData>(bookAction, {});
  const confirmationRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Le formulaire n'est envoyé qu'après validation du courriel et du cellulaire dans la fenêtre.
  const contactsApproved = useRef(false);
  const [reviewing, setReviewing] = useState(false);

  // La confirmation est plus courte que le formulaire : sans ce défilement, la page
  // resterait en bas (sur le footer) après l'envoi.
  useEffect(() => {
    if (!state.booked) return;
    confirmationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    confirmationRef.current?.focus({ preventScroll: true });
  }, [state.booked]);
  const [date, setDate] = useState(initialDate);
  const [partySize, setPartySize] = useState(initialPartySize);
  const [slot, setSlot] = useState<Slot | null>(null);
  // Jeton anti-robot Cloudflare, exigé par le serveur (sauf en développement sans clé).
  const [turnstileToken, setTurnstileToken] = useState("");
  const humanCheckPending = Boolean(turnstileSiteKey) && !turnstileToken;
  // Champs contrôlés : une erreur du serveur ne vide pas le formulaire.
  const [contact, setContact] = useState({ firstName: "", lastName: "", phone: "", email: "", note: "" });
  const setField = (field: keyof typeof contact) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact((current) => ({ ...current, [field]: event.target.value }));

  if (state.booked) {
    const booked = state.booked;
    return (
      <div ref={confirmationRef} tabIndex={-1} className={`${rs.card} flex scroll-mt-28 flex-col gap-5 outline-none`} role="status">
        <span className={rs.eyebrow}>RÉSERVATION CONFIRMÉE</span>
        <h2 className="font-display text-[clamp(36px,4vw,56px)] uppercase leading-[.95] text-white">À bientôt au 1000 !</h2>
        <dl className="grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-2">
          <div>
            <dt className={rs.labelText}>DATE</dt>
            <dd className="first-letter:uppercase">{formatDateFr(booked.date)}</dd>
          </div>
          <div>
            <dt className={rs.labelText}>HEURE</dt>
            <dd>{formatTimeFr(booked.time)}</dd>
          </div>
          <div>
            <dt className={rs.labelText}>PERSONNES</dt>
            <dd>{booked.partySize}</dd>
          </div>
          <div>
            <dt className={rs.labelText}>LIEU</dt>
            <dd>{booked.areaName}</dd>
          </div>
          <div>
            <dt className={rs.labelText}>RÉFÉRENCE</dt>
            <dd className="font-mono">{booked.reference}</dd>
          </div>
        </dl>
        <p className="text-[15px] font-light leading-relaxed text-ivory/75">
          Un courriel de confirmation a été envoyé à <strong className="font-medium text-ivory">{booked.email}</strong> avec un lien pour
          modifier ou annuler votre réservation.{" "}
          {booked.needsConfirmation
            ? "Le jour de votre réservation, à 10 h, vous recevrez un courriel et un texto pour confirmer votre présence. Sans confirmation, la réservation sera annulée automatiquement."
            : "Votre réservation est confirmée, on vous attend !"}
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={(event) => {
        if (contactsApproved.current) {
          contactsApproved.current = false;
          return;
        }
        event.preventDefault();
        setReviewing(true);
      }}
      className="flex flex-col gap-[clamp(28px,4vw,44px)]"
    >
      {reviewing && (
        <ContactCheckDialog
          email={contact.email}
          phone={contact.phone}
          onEdit={() => {
            setReviewing(false);
            formRef.current?.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
          }}
          onConfirm={() => {
            setReviewing(false);
            contactsApproved.current = true;
            formRef.current?.requestSubmit();
          }}
        />
      )}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className={`${rs.card} flex flex-col gap-6`}>
        <span className={rs.eyebrow}>1 · VOTRE RÉSERVATION</span>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={rs.label}>
            <span className={rs.labelText}>DATE</span>
            <input
              type="date"
              name="date"
              required
              min={minDate}
              max={maxDate}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setSlot(null);
              }}
              className={rs.input}
            />
          </label>
          <div className={rs.label}>
            <span className={rs.labelText}>PERSONNES</span>
            <Dropdown
              label="Nombre de personnes"
              placeholder="Choisir"
              name="partySize"
              value={String(partySize)}
              onChange={(value) => {
                setPartySize(Number(value));
                setSlot(null);
              }}
              options={[
                ...PARTY_OPTIONS.map((size) => ({ value: String(size), label: `${size} personne${size > 1 ? "s" : ""}` })),
                { value: String(LARGE_GROUP), label: `${LARGE_GROUP} personnes et plus` },
              ]}
            />
          </div>
        </div>
        {partySize >= LARGE_GROUP ? (
          <LargeGroupNotice />
        ) : (
          date && <AreaTimeFields key={`${date}|${partySize}`} date={date} partySize={partySize} onChange={setSlot} />
        )}
      </div>

      {partySize < LARGE_GROUP && (
        <div className={`${rs.card} flex flex-col gap-6`}>
          <span className={rs.eyebrow}>2 · VOS COORDONNÉES</span>
          {slot && (
            <>
              <input type="hidden" name="areaId" value={slot.areaId} />
              <input type="hidden" name="time" value={slot.time} />
            </>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={rs.label}>
              <span className={rs.labelText}>PRÉNOM</span>
              <input name="firstName" required maxLength={60} autoComplete="given-name" value={contact.firstName} onChange={setField("firstName")} className={rs.input} />
            </label>
            <label className={rs.label}>
              <span className={rs.labelText}>NOM</span>
              <input name="lastName" required maxLength={60} autoComplete="family-name" value={contact.lastName} onChange={setField("lastName")} className={rs.input} />
            </label>
            <label className={rs.label}>
              <span className={rs.labelText}>CELLULAIRE (CONFIRMATION PAR TEXTO)</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel-national"
                placeholder="819-234-5678"
                value={contact.phone}
                onChange={(event) => setContact((current) => ({ ...current, phone: formatPhoneInput(event.target.value) }))}
                className={rs.input}
              />
            </label>
            <label className={rs.label}>
              <span className={rs.labelText}>COURRIEL</span>
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="vous@exemple.com"
                value={contact.email}
                onChange={setField("email")}
                className={rs.input}
              />
            </label>
            <label className={`${rs.label} sm:col-span-2`}>
              <span className={rs.labelText}>NOTE (FACULTATIF)</span>
              <textarea
                name="note"
                rows={3}
                maxLength={500}
                placeholder="Allergies, occasion spéciale, chaise haute…"
                value={contact.note}
                onChange={setField("note")}
                className={rs.input}
              />
            </label>
          </div>
          <p className="text-xs font-light leading-relaxed text-ivory/50">
            Vos coordonnées servent uniquement à gérer votre réservation : courriel de confirmation, puis demande de confirmation par courriel et texto le jour J.
            Voir notre{" "}
            <Link href="/politique-de-confidentialite" className="text-gold-bright underline-offset-4 hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>
          {turnstileSiteKey && (
            <>
              <input type="hidden" name="turnstileToken" value={turnstileToken} />
              <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} resetKey={state} />
            </>
          )}
          {state.error && (
            <p role="alert" className={rs.error}>
              {state.error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <SubmitBooking disabled={!slot || humanCheckPending} />
            <span className="text-sm text-ivory/55">
              {!slot
                ? "Choisissez le lieu et l'heure ci-dessus."
                : humanCheckPending
                  ? "Vérification anti-robot en cours…"
                  : `${formatTimeFr(slot.time)} · ${partySize} pers.`}
            </span>
          </div>
        </div>
      )}
    </form>
  );
}

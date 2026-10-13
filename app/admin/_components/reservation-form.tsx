"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import { SLOT_INTERVAL_MINUTES } from "@/app/lib/reservations/config";
import { formatTimeFr, minutesToTime, timeToMinutes } from "@/app/lib/reservations/time";
import type { Area } from "@/app/lib/reservations/types";
import { formatPhoneInput } from "@/app/lib/reservations/validation";

import { Dropdown } from "@/app/components/ui/dropdown";

import { saveReservationAction, type SaveState } from "../(app)/reservations/actions";
import { SubmitButton } from "./submit-button";
import { ui } from "./ui";

export type ReservationFormValues = {
  time: string;
  areaId: string;
  partySize: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note: string;
};

const HOURS = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 / SLOT_INTERVAL_MINUTES }, (_, index) => String(index * SLOT_INTERVAL_MINUTES).padStart(2, "0"));

export function ReservationForm({
  id,
  date,
  today,
  initial,
  areas,
  openSlots,
  seats,
  basePath,
}: {
  id?: string;
  date: string;
  today: string;
  initial: ReservationFormValues;
  areas: Area[];
  openSlots: number[];
  seats: Record<string, number[]>;
  basePath: string;
}) {
  const router = useRouter();
  const [state, action] = useActionState<SaveState, FormData>(saveReservationAction, {});
  // Champs contrôlés : une erreur renvoyée par le serveur ne vide pas le formulaire.
  const [values, setValues] = useState(initial);
  const [force, setForce] = useState(false);
  const update = <K extends keyof ReservationFormValues>(key: K, value: ReservationFormValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const area = areas.find((candidate) => candidate.id === values.areaId);
  const startMinutes = timeToMinutes(values.time);
  const seatsLeft = area ? seats[area.id]?.[startMinutes / SLOT_INTERVAL_MINUTES] ?? area.capacity : 0;
  const overCapacity = values.partySize > seatsLeft;
  // Places libres une fois cette réservation comptée (en modification, `seats` l'exclut déjà).
  const remainingAfter = seatsLeft - values.partySize;
  const isOpenSlot = openSlots.includes(startMinutes);
  const [hour, minute] = values.time.split(":");
  // Une ancienne réservation à une minute hors grille reste affichable.
  const minuteOptions = MINUTES.includes(minute) ? MINUTES : [...MINUTES, minute].sort();

  const changeDate = (nextDate: string) => {
    if (!nextDate) return;
    const params = new URLSearchParams({ date: nextDate, heure: values.time, lieu: values.areaId, personnes: String(values.partySize) });
    // replace : changer de date ne crée pas d'entrée d'historique (« retour » ferme la fenêtre).
    router.replace(`${basePath}?${params}`);
  };

  return (
    <form action={action} className="flex flex-col gap-6">
      {id && <input type="hidden" name="id" value={id} />}
      <input type="hidden" name="date" value={date} />

      <fieldset className={`${ui.card} grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5`}>
        <legend className="sr-only">Quand et où</legend>
        <label className={ui.label}>
          Date
          <input type="date" value={date} min={id ? undefined : today} onChange={(event) => changeDate(event.target.value)} className={ui.input} />
        </label>
        <div className={ui.label}>
          Lieu
          <Dropdown
            theme="admin"
            label="Lieu"
            placeholder="Choisir"
            name="areaId"
            value={values.areaId}
            onChange={(value) => update("areaId", value)}
            options={areas.map((candidate) => ({
              value: candidate.id,
              label: candidate.name,
              disabled: !candidate.active,
              hint: candidate.active ? undefined : "désactivé",
            }))}
          />
        </div>
        <input type="hidden" name="time" value={values.time} />
        <div className={ui.label}>
          Heure
          <Dropdown
            theme="admin"
            label="Heure"
            placeholder="--"
            value={hour}
            onChange={(value) => update("time", `${value}:${minute}`)}
            options={HOURS.map((value) => ({
              value,
              label: `${Number(value)} h`,
              hint: openSlots.some((slot) => minutesToTime(slot).startsWith(`${value}:`)) ? undefined : "fermé",
            }))}
          />
        </div>
        <div className={ui.label}>
          Minutes
          <Dropdown
            theme="admin"
            label="Minutes"
            placeholder="--"
            value={minute}
            onChange={(value) => update("time", `${hour}:${value}`)}
            options={minuteOptions.map((value) => ({ value, label: value }))}
          />
        </div>
        <label className={ui.label}>
          Personnes
          <input
            name="partySize"
            type="number"
            min={1}
            max={500}
            required
            value={values.partySize}
            onChange={(event) => update("partySize", Math.max(1, Number(event.target.value) || 1))}
            className={ui.input}
          />
        </label>

        <div className="sm:col-span-2 lg:col-span-5">
          {!area?.active ? (
            <p className={ui.error}>Ce lieu est désactivé. Activez-le dans la configuration ou choisissez-en un autre.</p>
          ) : overCapacity ? (
            <div className={`${ui.error} flex flex-col gap-2`}>
              <p>
                <strong>{seatsLeft <= 0 ? "Complet" : `Il ne reste que ${seatsLeft} place${seatsLeft > 1 ? "s" : ""}`}</strong> à{" "}
                {formatTimeFr(values.time)} en {area.name}. Cette réservation dépasserait la capacité de{" "}
                {values.partySize - Math.max(0, seatsLeft)} place(s).
              </p>
              <label className="flex items-center gap-2 font-medium text-red-100">
                <input
                  type="checkbox"
                  name="allowOverbooking"
                  checked={force}
                  onChange={(event) => setForce(event.target.checked)}
                  className="h-4 w-4 accent-[#d1a647]"
                />
                Forcer la réservation (surbooking)
              </label>
            </div>
          ) : (
            <p className={ui.success}>
              ✓ {remainingAfter} place{remainingAfter > 1 ? "s" : ""} restante{remainingAfter > 1 ? "s" : ""} sur {area.capacity} à{" "}
              {formatTimeFr(values.time)} en {area.name} (ces {values.partySize} pers. comprises)
              {!isOpenSlot && " — attention : en dehors des heures d'ouverture"}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className={`${ui.card} grid gap-4 p-5 sm:grid-cols-2`}>
        <legend className="sr-only">Client</legend>
        <label className={ui.label}>
          Prénom
          <input name="firstName" required maxLength={60} value={values.firstName} onChange={(event) => update("firstName", event.target.value)} className={ui.input} />
        </label>
        <label className={ui.label}>
          Nom
          <input name="lastName" required maxLength={60} value={values.lastName} onChange={(event) => update("lastName", event.target.value)} className={ui.input} />
        </label>
        <label className={ui.label}>
          Téléphone (pour le rappel SMS)
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="819-234-5678"
            value={values.phone}
            onChange={(event) => update("phone", formatPhoneInput(event.target.value))}
            className={ui.input}
          />
        </label>
        <label className={ui.label}>
          Courriel (facultatif)
          <input name="email" type="email" maxLength={254} value={values.email} onChange={(event) => update("email", event.target.value)} className={ui.input} />
        </label>
        <label className={`${ui.label} sm:col-span-2`}>
          Note (allergies, occasion, chaise haute…)
          <textarea name="note" rows={2} maxLength={500} value={values.note} onChange={(event) => update("note", event.target.value)} className={ui.input} />
        </label>
      </fieldset>

      {state.error && (
        <p role="alert" className={ui.error}>
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton className={`${ui.primary} px-6 py-3 text-base`} disabled={!area?.active || (overCapacity && !force)}>
          {id ? "Enregistrer les modifications" : "Créer la réservation"}
        </SubmitButton>
        <span className="text-sm text-ivory/50">
          {!values.email
            ? "Sans courriel, seul le SMS de demande de confirmation sera envoyé."
            : id
              ? "Le client sera prévenu par courriel si la date, l'heure, le lieu ou le nombre de personnes change."
              : "Le client recevra un courriel de confirmation avec son lien."}
        </span>
      </div>
    </form>
  );
}

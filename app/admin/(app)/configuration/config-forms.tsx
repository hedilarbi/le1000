"use client";

import { useActionState } from "react";

import { WEEKDAY_NAMES } from "@/app/lib/reservations/config";
import type { Area, ReservationSettings } from "@/app/lib/reservations/types";

import { SubmitButton } from "../../_components/submit-button";
import { ui } from "../../_components/ui";
import { saveAreasAction, saveRulesAction, type ConfigState } from "./actions";

// Lundi en premier, comme sur un calendrier de restaurant.
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

function Feedback({ state }: { state: ConfigState }) {
  return (
    <>
      {state.error && <p className={ui.error}>{state.error}</p>}
      {state.message && <p className={ui.success}>{state.message}</p>}
      {state.warnings?.map((warning) => (
        <p key={warning} className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-100">
          {warning}
        </p>
      ))}
    </>
  );
}

function Switch({ name, defaultChecked, label }: { name: string; defaultChecked: boolean; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      {/* Le rail et la pastille ont leur propre boîte : le libellé peut passer sur deux lignes sans les décaler. */}
      <span className="relative inline-block h-7 w-12 shrink-0">
        <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-ivory/15 transition peer-checked:bg-emerald-500/70 peer-focus-visible:ring-2 peer-focus-visible:ring-gold" />
        <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-ivory shadow transition peer-checked:translate-x-5" />
      </span>
      <span className="text-sm leading-snug text-ivory/75">{label}</span>
    </label>
  );
}

export function AreasForm({ areas, futureCounts }: { areas: Area[]; futureCounts: Record<string, number> }) {
  const [state, action] = useActionState<ConfigState, FormData>(saveAreasAction, {});

  return (
    <form action={action} className="flex flex-col gap-4">
      <ul className="flex flex-col divide-y divide-ivory/10">
        {areas.map((area) => (
          <li key={area.id} className="grid items-center gap-3 py-4 sm:grid-cols-[1fr_160px_200px]">
            <div>
              <p className="text-lg font-semibold text-ivory">{area.name}</p>
              <p className="text-xs text-ivory/45">
                {futureCounts[area.id] ? `${futureCounts[area.id]} réservation(s) à venir` : "Aucune réservation à venir"}
              </p>
            </div>
            <label className={ui.label}>
              Nombre de places
              <input
                name={`capacity_${area.id}`}
                type="number"
                min={0}
                max={1000}
                required
                defaultValue={area.capacity}
                className={ui.input}
              />
            </label>
            <Switch name={`active_${area.id}`} defaultChecked={area.active} label="Disponible à la réservation" />
          </li>
        ))}
      </ul>
      <p className="text-xs text-ivory/45">
        Un lieu désactivé n&apos;est plus proposé aux clients ni dans l&apos;admin. Les réservations déjà prises sont conservées.
      </p>
      <Feedback state={state} />
      <SubmitButton className={`${ui.primary} self-start`}>Enregistrer les lieux</SubmitButton>
    </form>
  );
}

function NumberField({ label, name, min, max, step, value }: { label: string; name: string; min: number; max: number; step: number; value: number }) {
  return (
    <label className={ui.label}>
      {label}
      <input name={name} type="number" min={min} max={max} step={step} required defaultValue={value} className={ui.input} />
    </label>
  );
}

export function RulesForm({ settings }: { settings: ReservationSettings }) {
  const [state, action] = useActionState<ConfigState, FormData>(saveRulesAction, {});

  return (
    <form action={action} className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[.15em] text-gold">Heures d&apos;ouverture</h3>
        <ul className="flex flex-col divide-y divide-ivory/10">
          {WEEK_ORDER.map((day) => {
            const hours = settings.weeklyHours[day];
            return (
              <li key={day} className="grid items-center gap-3 py-3 sm:grid-cols-[130px_150px_1fr_1fr]">
                <span className="font-medium text-ivory">{WEEKDAY_NAMES[day]}</span>
                <Switch name={`open_${day}`} defaultChecked={hours.open} label="Ouvert" />
                <label className={ui.label}>
                  Ouverture
                  <input name={`opensAt_${day}`} type="time" step={900} required defaultValue={hours.opensAt} className={ui.input} />
                </label>
                <label className={ui.label}>
                  Fermeture
                  <input name={`closesAt_${day}`} type="time" step={900} required defaultValue={hours.closesAt} className={ui.input} />
                </label>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-xs text-ivory/45">Une fermeture plus tôt que l&apos;ouverture signifie après minuit (ex. 16:00 → 02:00).</p>
      </div>

      {/* items-end : les champs restent alignés même si un libellé passe sur deux lignes. */}
      <div className="grid items-end gap-4 sm:grid-cols-2">
        <NumberField label="Durée d'occupation des places (min)" name="occupancyMinutes" min={30} max={600} step={15} value={settings.occupancyMinutes} />
        <NumberField label="Marge de sécurité (min)" name="bufferMinutes" min={0} max={240} step={5} value={settings.bufferMinutes} />
        <NumberField
          label="Dernière réservation avant fermeture (min)"
          name="lastSeatingBeforeCloseMinutes"
          min={0}
          max={600}
          step={15}
          value={settings.lastSeatingBeforeCloseMinutes}
        />
        <NumberField
          label="Délai minimum pour réserver en ligne (min)"
          name="minOnlineLeadMinutes"
          min={0}
          max={1440}
          step={15}
          value={settings.minOnlineLeadMinutes}
        />
      </div>
      <p className="-mt-3 text-xs text-ivory/45">
        Les places d&apos;une réservation sont bloquées pendant la durée d&apos;occupation + la marge. Le délai minimum empêche de réserver en
        ligne un créneau trop proche (ex. 60 : à 17h, pas de réservation en ligne avant 18h) ; le client est invité à appeler. Les
        modifications s&apos;appliquent aux nouvelles réservations.
      </p>

      <Feedback state={state} />
      <SubmitButton className={`${ui.primary} self-start`}>Enregistrer les horaires et règles</SubmitButton>
    </form>
  );
}

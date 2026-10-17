"use client";

import { useEffect, useRef, useState } from "react";

import { RESERVATION_PHONE_DISPLAY, RESERVATION_PHONE_LINK } from "@/app/lib/reservations/config";
import { formatDateFr, formatTimeFr } from "@/app/lib/reservations/time";

import { Dropdown } from "../ui/dropdown";
import { rs } from "./styles";

export type Slot = { areaId: string; time: string };

// slots : réservables en ligne ; phoneOnly : trop proches (délai minimum), par téléphone seulement.
type Availability = {
  areas: { id: string; name: string; slots: string[]; phoneOnly: string[] }[];
  message: string | null;
  leadMessage: string | null;
};
type CheckStatus = "checking" | "available" | "unavailable" | "tooSoon" | "error";
type LoadState = { key: string; data: Availability | null; error: string | null };

function useAvailability(date: string, partySize: number) {
  const key = `${date}|${partySize}`;
  const [state, setState] = useState<LoadState>({ key: "", data: null, error: null });

  useEffect(() => {
    if (!date) return;
    const controller = new AbortController();
    fetch(`/api/reservations/availability?date=${encodeURIComponent(date)}&personnes=${partySize}`, { signal: controller.signal })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Disponibilités indisponibles.");
        setState({ key, data: body, error: null });
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setState({ key, data: null, error: error.message });
      });
    return () => controller.abort();
  }, [date, partySize, key]);

  return { loading: Boolean(date) && state.key !== key, data: state.key === key ? state.data : null, error: state.key === key ? state.error : null };
}

// Message qui renvoie vers le téléphone (réservation trop proche, date complète…).
function PhoneNotice({ text }: { text: string }) {
  return (
    <div className={`${rs.notice} flex flex-col gap-3`}>
      <p>{text}</p>
      <a href={RESERVATION_PHONE_LINK} className={`${rs.gold} self-start`}>
        Appeler le {RESERVATION_PHONE_DISPLAY}
      </a>
    </div>
  );
}

// Lieu, heure et minutes : les choix disponibles (calculés par le serveur pour la date
// et le nombre de personnes), plus les heures trop proches, qui renvoient au téléphone.
export function AreaTimeFields({ date, partySize, onChange }: { date: string; partySize: number; onChange: (slot: Slot | null) => void }) {
  const { loading, data, error } = useAvailability(date, partySize);
  const [areaId, setAreaId] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const area = data?.areas.find((candidate) => candidate.id === areaId);
  const choices = (candidate: Availability["areas"][number] | undefined) =>
    [...new Set([...(candidate?.phoneOnly ?? []), ...(candidate?.slots ?? [])])].sort();
  const slots = choices(area);
  const hours = [...new Set(slots.map((time) => time.slice(0, 2)))];
  const minutes = slots.filter((time) => time.startsWith(`${hour}:`)).map((time) => time.slice(3));

  const [check, setCheck] = useState<CheckStatus | null>(null);
  const latestCheck = useRef("");

  // Dès que lieu, heure et minutes sont choisis, le serveur revérifie la disponibilité
  // (quelqu'un a pu réserver entre-temps). Le formulaire n'est validable qu'après ce contrôle.
  const verify = async (slot: Slot) => {
    const key = `${date}|${partySize}|${slot.areaId}|${slot.time}`;
    latestCheck.current = key;
    setCheck("checking");
    let status: CheckStatus = "error";
    try {
      const response = await fetch(`/api/reservations/availability?date=${encodeURIComponent(date)}&personnes=${partySize}`, { cache: "no-store" });
      const body = (await response.json()) as Availability;
      const fresh = body.areas.find((candidate) => candidate.id === slot.areaId);
      if (response.ok) {
        status = fresh?.phoneOnly.includes(slot.time) ? "tooSoon" : fresh?.slots.includes(slot.time) ? "available" : "unavailable";
      }
    } catch {
      status = "error";
    }
    if (latestCheck.current !== key) return;
    setCheck(status);
    onChange(status === "available" ? slot : null);
  };

  const update = (nextArea: string, nextHour: string, nextMinute: string) => {
    setAreaId(nextArea);
    setHour(nextHour);
    setMinute(nextMinute);
    onChange(null);
    if (nextArea && nextHour && nextMinute) {
      void verify({ areaId: nextArea, time: `${nextHour}:${nextMinute}` });
    } else {
      latestCheck.current = "";
      setCheck(null);
    }
  };

  const chooseArea = (nextArea: string) => {
    const nextSlots = choices(data?.areas.find((candidate) => candidate.id === nextArea));
    const time = `${hour}:${minute}`;
    if (nextSlots.includes(time)) return update(nextArea, hour, minute);
    update(nextArea, nextSlots.some((slot) => slot.startsWith(`${hour}:`)) ? hour : "", "");
  };

  // Choisir une heure présélectionne la première minute disponible : un clic de moins.
  const chooseHour = (nextHour: string) => {
    const available = slots.filter((time) => time.startsWith(`${nextHour}:`)).map((time) => time.slice(3));
    update(areaId, nextHour, available.includes(minute) ? minute : (available[0] ?? ""));
  };

  if (loading) return <p className="text-sm text-ivory/55">Recherche des disponibilités…</p>;
  if (error) return <p className={rs.error}>{error}</p>;
  if (!data || data.message) return <PhoneNotice text={data?.message ?? "Aucune disponibilité en ligne pour cette date."} />;
  // Tous les lieux complets pour ce nombre de personnes : le resto peut parfois trouver une solution.
  if (data.areas.every((candidate) => !choices(candidate).length)) {
    return <PhoneNotice text="Complet en ligne pour cette date et ce nombre de personnes. Appelez-nous : nous pourrons peut-être vous trouver une place." />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className={rs.label}>
          <span className={rs.labelText}>LIEU</span>
          <Dropdown
            label="Lieu"
            placeholder="Choisir"
            value={areaId}
            onChange={chooseArea}
            options={data.areas.map((candidate) => ({
              value: candidate.id,
              label: candidate.name,
              disabled: !choices(candidate).length,
              hint: choices(candidate).length ? undefined : "Complet",
            }))}
          />
        </div>
        <div className={rs.label}>
          <span className={rs.labelText}>HEURE</span>
          <Dropdown
            label="Heure"
            placeholder="--"
            value={hour}
            onChange={chooseHour}
            disabled={!area}
            options={hours.map((value) => ({ value, label: `${Number(value)} h` }))}
          />
        </div>
        <div className={rs.label}>
          <span className={rs.labelText}>MINUTES</span>
          <Dropdown
            label="Minutes"
            placeholder="--"
            value={minute}
            onChange={(value) => update(areaId, hour, value)}
            disabled={!hour}
            options={minutes.map((value) => ({ value, label: value }))}
          />
        </div>
      </div>
      {check === "checking" && <p className="text-sm text-ivory/60">Vérification de la disponibilité…</p>}
      {check === "available" && area && (
        <p role="status" className="rounded-[2px] border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          ✓ Places disponibles : {area.name}, {formatDateFr(date)} à {formatTimeFr(`${hour}:${minute}`)}, {partySize} personne{partySize > 1 ? "s" : ""}.
        </p>
      )}
      {check === "tooSoon" && data.leadMessage && <PhoneNotice text={data.leadMessage} />}
      {check === "unavailable" && (
        <p role="alert" className={rs.error}>
          Ce créneau vient d&apos;être réservé. Choisissez une autre heure ou un autre lieu.
        </p>
      )}
      {check === "error" && (
        <p role="alert" className={rs.error}>
          La disponibilité n&apos;a pas pu être vérifiée. Réessayez dans un instant.
        </p>
      )}
    </div>
  );
}

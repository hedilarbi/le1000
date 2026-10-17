import type { Metadata } from "next";
import Link from "next/link";

import { addDays, formatDateFr, formatDuration, isDateString, restaurantNow } from "@/app/lib/reservations/time";
import { formatPhone } from "@/app/lib/reservations/validation";
import { dayOverview, monthSummary, recentInboundSms } from "@/app/lib/server/admin-queries";
import { requireAdmin } from "@/app/lib/server/auth";
import { BLOCKING_STATUSES } from "@/app/lib/server/reservations";

import { presenceState, type PresenceState } from "../_components/reservation-badges";
import { ReservationRow } from "../_components/reservation-row";
import { ui } from "../_components/ui";
import { AreaCards } from "./_dashboard/area-cards";
import { AvailabilityGrid } from "./_dashboard/availability-grid";
import { MonthCalendar } from "./_dashboard/month-calendar";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function DashboardPage({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const params = await searchParams;
  const today = restaurantNow().date;
  const date = typeof params.date === "string" && isDateString(params.date) ? params.date : today;
  const areaFilter = typeof params.lieu === "string" ? params.lieu : null;
  const stateFilter = PRESENCE_FILTERS.find((filter) => filter.slug === params.etat) ?? null;

  const [overview, month, smsReplies] = await Promise.all([dayOverview(date), monthSummary(date.slice(0, 7)), recentInboundSms(5)]);
  const areaNames = Object.fromEntries(overview.areas.map((area) => [area.id, area.name]));
  const active = overview.reservations.filter((reservation) => reservation.status !== "cancelled");
  const cancelled = overview.reservations.filter((reservation) => reservation.status === "cancelled");
  // Filtres combinables : un lieu et un état de confirmation à la fois.
  const inArea = areaFilter ? active.filter((reservation) => reservation.areaId === areaFilter) : active;
  const inState = stateFilter ? active.filter((reservation) => presenceState(reservation) === stateFilter.state) : active;
  const listed = stateFilter ? inArea.filter((reservation) => presenceState(reservation) === stateFilter.state) : inArea;
  const filterHref = (lieu: string | null, etat: string | null) =>
    `/admin?date=${date}${lieu ? `&lieu=${lieu}` : ""}${etat ? `&etat=${etat}` : ""}`;
  const expectedGuests = active
    .filter((reservation) => BLOCKING_STATUSES.includes(reservation.status))
    .reduce((total, reservation) => total + reservation.partySize, 0);
  const durationMinutes = overview.settings.occupancyMinutes + overview.settings.bufferMinutes;
  const relativeDay = date === today ? "Aujourd'hui" : date === addDays(today, 1) ? "Demain" : date === addDays(today, -1) ? "Hier" : null;

  return (
    // Deux colonnes dès le haut de la page : la journée à gauche ; à droite le calendrier
    // (pour changer de jour) puis les places libres.
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex min-w-0 flex-col gap-5">
        <header className={`${ui.card} flex flex-wrap items-center justify-between gap-4 border-gold/25 bg-[linear-gradient(135deg,rgba(209,166,71,.14),rgba(26,26,26,0)_60%)] px-6 py-5`}>
          <div>
            {relativeDay && (
              <span className="mb-2 inline-block rounded-full bg-gold px-3 py-0.5 text-xs font-bold uppercase tracking-[.18em] text-on-gold">
                {relativeDay}
              </span>
            )}
            <h1 className="font-display text-[clamp(40px,4.4vw,60px)] uppercase leading-[.9] text-white first-letter:uppercase">
              {formatDateFr(date)}
            </h1>
            <p className="mt-2 text-sm text-ivory/60">
              {active.length} réservation{active.length > 1 ? "s" : ""} · {expectedGuests} personne{expectedGuests > 1 ? "s" : ""} attendue
              {expectedGuests > 1 ? "s" : ""}
            </p>
          </div>
          <Link href={`/admin/reservations/nouvelle?date=${date}`} className={`${ui.primary} px-5 py-3 text-base`}>
            + Nouvelle réservation
          </Link>
        </header>

        <AreaCards stats={overview.areaStats} />

        <section className={`${ui.card} overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/10 p-4">
            <div>
              <h2 className={ui.subheading}>Réservations ({active.length})</h2>
              <p className="mt-1 text-xs text-ivory/50">{expectedGuests} personnes attendues</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex flex-wrap justify-end gap-1.5">
                <FilterChip href={filterHref(null, stateFilter?.slug ?? null)} active={!areaFilter} label={`Tous les lieux (${inState.length})`} />
                {overview.areas.map((area) => {
                  const count = inState.filter((reservation) => reservation.areaId === area.id).length;
                  if (!count && !area.active) return null;
                  return (
                    <FilterChip
                      key={area.id}
                      href={filterHref(area.id, stateFilter?.slug ?? null)}
                      active={areaFilter === area.id}
                      label={`${area.name} (${count})`}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-end gap-1.5">
                <FilterChip href={filterHref(areaFilter, null)} active={!stateFilter} label={`Tous les états (${inArea.length})`} />
                {PRESENCE_FILTERS.map((filter) => (
                  <FilterChip
                    key={filter.slug}
                    href={filterHref(areaFilter, filter.slug)}
                    active={stateFilter?.slug === filter.slug}
                    label={`${filter.label} (${inArea.filter((reservation) => presenceState(reservation) === filter.state).length})`}
                  />
                ))}
              </div>
            </div>
          </div>

          {listed.length ? (
            <ul className="divide-y divide-ivory/10">
              {listed.map((reservation) => (
                <ReservationRow key={reservation._id.toHexString()} reservation={reservation} areaName={areaNames[reservation.areaId] ?? reservation.areaId} />
              ))}
            </ul>
          ) : (
            <p className="p-6 text-center text-ivory/55">Aucune réservation pour cette journée.</p>
          )}

          {cancelled.length > 0 && (
            <details className="border-t border-ivory/10">
              <summary className="cursor-pointer p-4 text-sm text-ivory/55 hover:text-ivory">Annulées ({cancelled.length})</summary>
              <ul className="divide-y divide-ivory/10">
                {cancelled.map((reservation) => (
                  <ReservationRow key={reservation._id.toHexString()} reservation={reservation} areaName={areaNames[reservation.areaId] ?? reservation.areaId} />
                ))}
              </ul>
            </details>
          )}
        </section>
      </div>

      {/* Sur tablette et mobile, cette colonne passe en premier : le calendrier sert à changer de jour. */}
      <aside className="order-first flex flex-col gap-5 lg:order-none">
        <MonthCalendar selected={date} today={today} summary={month} />
        <AvailabilityGrid date={date} slots={overview.slots} grids={overview.areaStats} durationLabel={formatDuration(durationMinutes)} />
        {smsReplies.length > 0 && (
          <section className={`${ui.card} p-4`}>
            <h2 className={`${ui.subheading} mb-3`}>Réponses SMS récentes</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {smsReplies.map((sms) => (
                <li key={sms._id.toHexString()} className="rounded-lg bg-ivory/5 p-3">
                  <p className="text-ivory">{sms.body}</p>
                  <p className="mt-1 text-xs text-ivory/45">
                    {formatPhone(sms.from)} ·{" "}
                    {sms.reservationId ? (
                      <Link href={`/admin/reservations/${sms.reservationId.toHexString()}`} className="text-gold-bright hover:underline">
                        voir la réservation
                      </Link>
                    ) : (
                      "aucune réservation trouvée"
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}

const PRESENCE_FILTERS = [
  { slug: "attente", state: "pending", label: "En attente" },
  { slug: "non-confirmee", state: "unconfirmed", label: "Non confirmées" },
  { slug: "confirmee", state: "confirmed", label: "Présence confirmée" },
] as const satisfies readonly { slug: string; state: PresenceState; label: string }[];

function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active ? "border-gold bg-gold/15 text-gold-bright" : "border-ivory/15 text-ivory/65 hover:border-gold/60"
      }`}
    >
      {label}
    </Link>
  );
}

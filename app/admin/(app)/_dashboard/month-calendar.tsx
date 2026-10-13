import Link from "next/link";

import { addDays, daysBetween, formatMonthFr, weekdayOf } from "@/app/lib/reservations/time";

import { ui } from "../../_components/ui";

const WEEKDAY_INITIALS = ["D", "L", "M", "M", "J", "V", "S"];

// Calendrier du mois : chaque jour affiche son nombre de couverts, la couleur
// indique les soirs les plus chargés.
export function MonthCalendar({
  selected,
  today,
  summary,
}: {
  selected: string;
  today: string;
  summary: Map<string, { reservations: number; guests: number }>;
}) {
  const firstDay = `${selected.slice(0, 7)}-01`;
  const nextMonth = `${addDays(firstDay, 32).slice(0, 7)}-01`;
  const previousMonth = `${addDays(firstDay, -1).slice(0, 7)}-01`;
  const dayCount = daysBetween(firstDay, nextMonth);
  const leadingBlanks = weekdayOf(firstDay);
  const maxGuests = Math.max(1, ...[...summary.values()].map((day) => day.guests));

  return (
    <section className={`${ui.card} p-4`}>
      <div className="mb-3 flex items-center justify-between">
        <Link href={`/admin?date=${previousMonth}`} className={ui.small} aria-label="Mois précédent">
          ←
        </Link>
        <h2 className="text-sm font-semibold capitalize text-ivory">{formatMonthFr(firstDay)}</h2>
        <Link href={`/admin?date=${nextMonth}`} className={ui.small} aria-label="Mois suivant">
          →
        </Link>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_INITIALS.map((initial, index) => (
          <span key={index} className="pb-1 text-[11px] font-semibold text-ivory/40">
            {initial}
          </span>
        ))}
        {Array.from({ length: leadingBlanks }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}
        {Array.from({ length: dayCount }, (_, index) => {
          const date = addDays(firstDay, index);
          const day = summary.get(date);
          const ratio = day ? day.guests / maxGuests : 0;
          const isSelected = date === selected;
          return (
            <Link
              key={date}
              href={`/admin?date=${date}`}
              title={day ? `${day.reservations} réservation(s), ${day.guests} personne(s)` : "Aucune réservation"}
              style={day ? { backgroundColor: `rgba(209,166,71,${(0.1 + ratio * 0.45).toFixed(2)})` } : undefined}
              className={`flex h-11 flex-col items-center justify-center rounded-md text-sm transition hover:ring-1 hover:ring-gold/60 ${
                isSelected ? "ring-2 ring-gold" : ""
              } ${date === today ? "font-bold text-gold-bright" : "text-ivory/80"} ${date < today ? "opacity-50" : ""}`}
            >
              <span className="leading-none">{index + 1}</span>
            </Link>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-ivory/40">Plus la case est dorée, plus la journée est chargée.</p>
    </section>
  );
}

import Link from "next/link";

import { formatTimeFr, minutesToTime } from "@/app/lib/reservations/time";
import type { Area } from "@/app/lib/reservations/types";

import { ui } from "../../_components/ui";

type AreaGrid = { area: Area; cells: { minutes: number; seatsLeft: number }[] };

function cellTone(seatsLeft: number, capacity: number) {
  if (seatsLeft <= 0) return "bg-red-500/20 text-red-200";
  if (seatsLeft < Math.max(8, capacity * 0.2)) return "bg-amber-500/20 text-amber-100";
  return "bg-emerald-500/15 text-emerald-100";
}

// Places libres pour une arrivée à chaque créneau, en tenant compte des 3 h
// d'occupation. Un clic ouvre une nouvelle réservation pré-remplie.
export function AvailabilityGrid({
  date,
  slots,
  grids,
  durationLabel,
}: {
  date: string;
  slots: number[];
  grids: AreaGrid[];
  durationLabel: string;
}) {
  const visible = grids.filter(({ area, cells }) => area.active || cells.some((cell) => cell.seatsLeft < area.capacity));

  return (
    <section className={`${ui.card} overflow-hidden`}>
      <div className="border-b border-ivory/10 p-4">
        <h2 className={ui.subheading}>Places libres</h2>
        <p className="mt-1 text-xs text-ivory/50">Pour une arrivée à cette heure (places occupées {durationLabel}). Cliquez pour réserver.</p>
      </div>
      {!slots.length || !visible.length ? (
        <p className="p-4 text-sm text-ivory/55">Fermé ce jour-là, ou aucun lieu actif.</p>
      ) : (
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full border-separate border-spacing-1 text-sm">
            <thead className="sticky top-0 bg-charcoal">
              <tr>
                <th className="px-2 py-1.5 text-left text-xs font-semibold text-ivory/50">Heure</th>
                {visible.map(({ area }) => (
                  <th key={area.id} className="px-2 py-1.5 text-xs font-semibold text-ivory/70">
                    {area.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((minutes, row) => (
                <tr key={minutes}>
                  <td className="whitespace-nowrap px-2 font-medium text-ivory/70">{formatTimeFr(minutes)}</td>
                  {visible.map(({ area, cells }) => {
                    const seatsLeft = cells[row].seatsLeft;
                    if (!area.active) {
                      return (
                        <td key={area.id} className="rounded-md bg-ivory/5 text-center text-ivory/30">
                          —
                        </td>
                      );
                    }
                    return (
                      <td key={area.id} className="p-0">
                        <Link
                          href={`/admin/reservations/nouvelle?date=${date}&heure=${minutesToTime(minutes)}&lieu=${area.id}`}
                          className={`block rounded-md px-2 py-1.5 text-center font-semibold tabular-nums transition hover:ring-1 hover:ring-gold ${cellTone(seatsLeft, area.capacity)}`}
                        >
                          {seatsLeft <= 0 ? (seatsLeft < 0 ? seatsLeft : "Complet") : seatsLeft}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

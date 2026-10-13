import { formatTimeFr } from "@/app/lib/reservations/time";
import type { Area } from "@/app/lib/reservations/types";

import { Badge } from "../../_components/reservation-badges";
import { ui } from "../../_components/ui";

type AreaStat = { area: Area; reservations: number; guests: number; peak: number; peakAt: number | null };

export function AreaCards({ stats }: { stats: AreaStat[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ area, reservations, guests, peak, peakAt }) => {
        const fill = area.capacity > 0 ? Math.min(1, peak / area.capacity) : 0;
        return (
          <section key={area.id} className={`${ui.card} px-4 py-3 ${area.active ? "" : "opacity-60"}`}>
            <div className="flex items-start justify-between gap-2">
              <h2 className={ui.subheading}>{area.name}</h2>
              {area.active ? <Badge tone="green">Ouvert</Badge> : <Badge tone="gray">Désactivé</Badge>}
            </div>
            <p className="mt-1 text-sm text-ivory/70">
              <strong className="text-ivory">{reservations}</strong> réservation{reservations > 1 ? "s" : ""} ·{" "}
              <strong className="text-ivory">{guests}</strong> pers.
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ivory/10" aria-hidden="true">
              <div
                className={`h-full rounded-full ${fill >= 1 ? "bg-red-400" : fill >= 0.8 ? "bg-amber-400" : "bg-emerald-400"}`}
                style={{ width: `${fill * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-ivory/55">
              {peakAt === null
                ? `Capacité : ${area.capacity} places en même temps`
                : `Moment le plus chargé : ${peak} / ${area.capacity} places à ${formatTimeFr(peakAt)}`}
            </p>
          </section>
        );
      })}
    </div>
  );
}

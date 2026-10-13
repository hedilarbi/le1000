import Link from "next/link";

import { formatShortDateFr, formatTimeFr } from "@/app/lib/reservations/time";
import { formatPhone } from "@/app/lib/reservations/validation";
import type { ReservationDoc } from "@/app/lib/server/db";

import { cancelAction, setStatusAction } from "../(app)/reservations/actions";
import { NotificationSummary, ReservationBadges } from "./reservation-badges";
import { SubmitButton } from "./submit-button";
import { ui } from "./ui";

// Une ligne de réservation avec les actions rapides de l'accueil.
export function ReservationRow({
  reservation,
  areaName,
  showDate = false,
}: {
  reservation: ReservationDoc;
  areaName: string;
  showDate?: boolean;
}) {
  const id = reservation._id.toHexString();
  const fullName = `${reservation.firstName} ${reservation.lastName}`;
  const isCancelled = reservation.status === "cancelled";

  return (
    <li className={`grid gap-3 p-4 md:grid-cols-[88px_1fr_auto] md:items-center ${isCancelled ? "opacity-55" : ""}`}>
      <div className="flex items-baseline gap-2 md:flex-col md:gap-0">
        <span className="font-display text-[32px] leading-none text-gold">{formatTimeFr(reservation.time)}</span>
        {showDate && <span className="text-xs capitalize text-ivory/55">{formatShortDateFr(reservation.date)}</span>}
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/reservations/${id}`} className="text-[17px] font-semibold text-ivory hover:text-gold-bright">
            {fullName}
          </Link>
          <span className="rounded-md bg-ivory/10 px-2 py-0.5 text-sm font-semibold text-ivory">
            {reservation.partySize} pers. · {areaName}
          </span>
          <ReservationBadges reservation={reservation} />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ivory/60">
          {reservation.phone && (
            <a href={`tel:${reservation.phone}`} className="text-gold-bright hover:underline">
              {formatPhone(reservation.phone)}
            </a>
          )}
          {reservation.email && <span className="truncate">{reservation.email}</span>}
          <span className="font-mono text-xs text-ivory/40">Réf. {reservation.reference}</span>
        </div>
        {reservation.note && <p className="text-sm italic text-amber-100/80">« {reservation.note} »</p>}
        <NotificationSummary notifications={reservation.notifications} />
      </div>

      <div className="flex flex-wrap gap-1.5 md:justify-end">
        {!isCancelled && (
          <form action={setStatusAction} className="contents">
            <input type="hidden" name="id" value={id} />
            {reservation.status === "confirmed" ? (
              <>
                <SubmitButton name="status" value="arrived" className={ui.small} pendingLabel="…">
                  Arrivé
                </SubmitButton>
                <SubmitButton name="status" value="no_show" className={ui.small} pendingLabel="…">
                  Absent
                </SubmitButton>
              </>
            ) : (
              <SubmitButton name="status" value="confirmed" className={ui.small} pendingLabel="…">
                Remettre en attente
              </SubmitButton>
            )}
          </form>
        )}
        <Link href={`/admin/reservations/${id}`} className={ui.small}>
          {isCancelled ? "Voir" : "Modifier"}
        </Link>
        {!isCancelled && (
          <form action={cancelAction} className="contents">
            <input type="hidden" name="id" value={id} />
            <SubmitButton
              className={`${ui.small} border-red-400/30 text-red-300 hover:border-red-400 hover:text-red-200`}
              pendingLabel="…"
              confirmMessage={`Annuler la réservation de ${fullName} ?${reservation.email ? " Le client sera prévenu par courriel." : ""}`}
            >
              Annuler
            </SubmitButton>
          </form>
        )}
      </div>
    </li>
  );
}

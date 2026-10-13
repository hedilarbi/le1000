import type { Metadata } from "next";
import Link from "next/link";

import { ManageReservation } from "@/app/components/reservation/manage-reservation";
import { rs } from "@/app/components/reservation/styles";
import {
  BOOKING_HORIZON_DAYS,
  CLIENT_CHANGE_CUTOFF_MINUTES,
  RESTAURANT_PHONE_DISPLAY,
  RESTAURANT_PHONE_LINK,
} from "@/app/lib/reservations/config";
import { addDays, formatDateFr, formatTimeFr, restaurantNow } from "@/app/lib/reservations/time";
import { confirmationIsOpen } from "@/app/lib/server/notifications";
import { getAreas, findByManageToken } from "@/app/lib/server/reservations";

export const metadata: Metadata = {
  title: "Ma réservation",
  robots: { index: false, follow: false },
};

export default async function ManageReservationPage({ params }: PageProps<"/r/[token]">) {
  const { token } = await params;
  const reservation = await findByManageToken(token);

  if (!reservation) {
    return (
      <Shell>
        <h1 className="font-display text-[clamp(40px,5vw,72px)] uppercase leading-[.95] text-white">Lien expiré</h1>
        <p className="max-w-[520px] text-[16px] font-light leading-relaxed text-ivory/75">
          Ce lien de réservation n&apos;est plus valide. Pour toute question, appelez-nous au{" "}
          <a href={RESTAURANT_PHONE_LINK} className="text-gold-bright">
            {RESTAURANT_PHONE_DISPLAY}
          </a>
          .
        </p>
        <Link href="/reservation" className={`${rs.gold} self-start`}>
          Faire une réservation
        </Link>
      </Shell>
    );
  }

  const now = new Date();
  const startsAt = reservation.startsAt.getTime();
  const isConfirmed = reservation.status === "confirmed";
  const today = restaurantNow(now).date;
  const areaName = (await getAreas()).find((area) => area.id === reservation.areaId)?.name ?? reservation.areaId;

  return (
    <Shell>
      <span className={rs.eyebrow}>MA RÉSERVATION · {reservation.reference}</span>
      <h1 className="font-display text-[clamp(40px,5vw,72px)] uppercase leading-[.95] text-white">
        {reservation.status === "cancelled" ? "Réservation annulée" : `Bonjour ${reservation.firstName}`}
      </h1>

      <dl className={`${rs.card} grid gap-x-8 gap-y-4 text-[16px] sm:grid-cols-2`}>
        <div>
          <dt className={rs.labelText}>DATE</dt>
          <dd className="mt-1 first-letter:uppercase">{formatDateFr(reservation.date)}</dd>
        </div>
        <div>
          <dt className={rs.labelText}>HEURE</dt>
          <dd className="mt-1">{formatTimeFr(reservation.time)}</dd>
        </div>
        <div>
          <dt className={rs.labelText}>PERSONNES</dt>
          <dd className="mt-1">{reservation.partySize}</dd>
        </div>
        <div>
          <dt className={rs.labelText}>LIEU</dt>
          <dd className="mt-1">{areaName}</dd>
        </div>
        {isConfirmed && (reservation.attendanceConfirmedAt || !reservation.autoCancelAt) && (
          <p className="text-emerald-300 sm:col-span-2">✓ Votre réservation est confirmée. À bientôt !</p>
        )}
        {isConfirmed && !reservation.attendanceConfirmedAt && reservation.autoCancelAt && (
          <p className="text-amber-200 sm:col-span-2">
            {confirmationIsOpen(reservation, now)
              ? `Merci de confirmer votre présence avant ${formatTimeFr(restaurantNow(reservation.autoCancelAt).minutes)} : sans confirmation, la réservation sera annulée.`
              : "Le jour de votre réservation, à 10 h, vous recevrez un courriel et un texto pour confirmer votre présence."}
          </p>
        )}
      </dl>

      {reservation.status === "cancelled" ? (
        <>
          <p className="text-[16px] font-light leading-relaxed text-ivory/75">
            {reservation.cancelReason === "no_confirmation"
              ? "Nous n'avons pas reçu la confirmation de votre présence : la réservation a été annulée et les places libérées."
              : "Cette réservation est annulée et les places ont été libérées."}{" "}
            Au plaisir de vous accueillir une autre fois !
          </p>
          <Link href="/reservation" className={`${rs.gold} self-start`}>
            Faire une nouvelle réservation
          </Link>
        </>
      ) : (
        <ManageReservation
          token={token}
          date={reservation.date}
          partySize={reservation.partySize}
          canConfirm={isConfirmed && !reservation.attendanceConfirmedAt && confirmationIsOpen(reservation, now) && now.getTime() < startsAt}
          canChange={isConfirmed && now.getTime() < startsAt - CLIENT_CHANGE_CUTOFF_MINUTES * 60_000}
          canCancel={isConfirmed && now.getTime() < startsAt}
          minDate={today}
          maxDate={addDays(today, BOOKING_HORIZON_DAYS)}
        />
      )}

      <p className="text-sm font-light text-ivory/50">
        Une question ? Appelez-nous au{" "}
        <a href={RESTAURANT_PHONE_LINK} className="text-gold-bright">
          {RESTAURANT_PHONE_DISPLAY}
        </a>
        .
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main id="rs-root" className="relative min-h-[80svh] overflow-hidden bg-ink">
      <div className="relative mx-auto flex max-w-[860px] flex-col gap-7 px-[clamp(20px,5vw,80px)] pb-[clamp(80px,12vh,140px)] pt-[clamp(130px,20vh,200px)]">
        {children}
      </div>
    </main>
  );
}

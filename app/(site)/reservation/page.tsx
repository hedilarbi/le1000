import type { Metadata } from "next";

import { BookingForm } from "@/app/components/reservation/booking-form";
import { BOOKING_HORIZON_DAYS, MAX_ONLINE_PARTY_SIZE, RESERVATION_PHONE_DISPLAY, RESERVATION_PHONE_LINK } from "@/app/lib/reservations/config";
import { addDays, formatDuration, isDateString, restaurantNow } from "@/app/lib/reservations/time";
import { readEnv } from "@/app/lib/server/env";
import { getSettings } from "@/app/lib/server/reservations";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Faire une réservation",
  description:
    "Réservez vos places au 1000 Resto Bar Relais à Trois-Rivières : bar, terrasse ou salle à manger. Confirmation immédiate par courriel.",
  path: "/reservation",
});

export default async function ReservationPage({ searchParams }: PageProps<"/reservation">) {
  const params = await searchParams;
  const settings = await getSettings();
  const today = restaurantNow().date;
  const maxDate = addDays(today, BOOKING_HORIZON_DAYS);
  const requestedDate = typeof params.date === "string" ? params.date : "";
  const date = isDateString(requestedDate) && requestedDate >= today && requestedDate <= maxDate ? requestedDate : today;
  const requestedSize = Number.parseInt(typeof params.personnes === "string" ? params.personnes : "", 10);
  const partySize = Math.min(MAX_ONLINE_PARTY_SIZE + 1, Math.max(1, Number.isNaN(requestedSize) ? 2 : requestedSize));

  return (
    <main id="rs-root" className="relative overflow-hidden bg-ink">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[3%] top-[6%] select-none font-display text-[clamp(200px,32vw,540px)] font-bold leading-[.8] text-ivory/[.028]"
      >
        1000
      </span>
      <div className="relative mx-auto grid max-w-[1400px] gap-[clamp(34px,5vw,86px)] px-[clamp(20px,5vw,80px)] pb-[clamp(80px,12vh,160px)] pt-[clamp(130px,20vh,210px)] lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-[clamp(18px,2vw,28px)]">
          <span className="flex items-center gap-3.5 font-label text-xs tracking-[.42em] text-gold">
            <span aria-hidden="true" className="block h-px w-[clamp(24px,4vw,54px)] bg-[linear-gradient(90deg,rgba(173,111,35,0),#D1A647)]" />
            RÉSERVATION
          </span>
          <h1 className="font-display text-[clamp(48px,7vw,104px)] uppercase leading-[.93] text-white">
            Vos places
            <br />
            <span className="text-gold-gradient">vous attendent</span>
          </h1>
          <p className="max-w-[460px] text-[clamp(16px,1.3vw,18px)] font-light leading-[1.78] text-ivory-warm">
            Bar, terrasse ou salle à manger : choisissez votre lieu et votre heure, la confirmation arrive aussitôt par courriel.
          </p>
          <div className="mt-2 flex flex-col gap-2 border-t border-ivory/10 pt-6 text-sm font-light leading-relaxed text-ivory/60">
            <p>
              Groupe de {MAX_ONLINE_PARTY_SIZE + 1} personnes et plus, ou réservation dans moins de {formatDuration(settings.minOnlineLeadMinutes)} ?
              Appelez-nous.
            </p>
            <a href={RESERVATION_PHONE_LINK} className="font-display text-[34px] leading-none text-gold-bright">
              {RESERVATION_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <BookingForm
          initialDate={date}
          initialPartySize={partySize}
          minDate={today}
          maxDate={maxDate}
          turnstileSiteKey={readEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY") ?? null}
        />
      </div>
    </main>
  );
}

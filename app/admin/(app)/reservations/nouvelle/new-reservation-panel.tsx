
import { formatDateFr, isDateString, isTimeString, minutesToTime, restaurantNow } from "@/app/lib/reservations/time";
import { seatsForDay } from "@/app/lib/server/admin-queries";

import { BackLink } from "../../../_components/back-link";
import { ReservationForm } from "../../../_components/reservation-form";
import { ui } from "../../../_components/ui";

type Params = Record<string, string | string[] | undefined>;

const text = (value: string | string[] | undefined) => (typeof value === "string" ? value : "");

// Formulaire de nouvelle réservation, pré-rempli depuis l'URL (?date, ?heure, ?lieu, ?personnes).
// Partagé par la page /admin/reservations/nouvelle et la fenêtre ouverte depuis le tableau de bord.
export async function NewReservationPanel({ params, inModal = false }: { params: Params; inModal?: boolean }) {
  const now = restaurantNow();
  const date = isDateString(text(params.date)) && text(params.date) >= now.date ? text(params.date) : now.date;
  const { areas, openSlots, seats } = await seatsForDay(date);

  const requestedArea = areas.find((area) => area.id === text(params.lieu) && area.active);
  const defaultArea = requestedArea ?? areas.find((area) => area.active) ?? areas[0];
  const upcomingSlot = date === now.date ? openSlots.find((slot) => slot >= now.minutes) : openSlots[0];
  const time = isTimeString(text(params.heure)) ? text(params.heure) : minutesToTime(upcomingSlot ?? 18 * 60);
  const partySize = Math.min(500, Math.max(1, Number.parseInt(text(params.personnes), 10) || 2));

  return (
    <div className="flex flex-col gap-5">
      <div>
        {!inModal && (
          <BackLink href={`/admin?date=${date}`}>Retour au {formatDateFr(date)}</BackLink>
        )}
        <h1 className={`${ui.heading} mt-4`}>Nouvelle réservation</h1>
      </div>
      <ReservationForm
        key={date}
        date={date}
        today={now.date}
        areas={areas}
        openSlots={openSlots}
        seats={seats}
        basePath="/admin/reservations/nouvelle"
        initial={{
          time,
          areaId: defaultArea?.id ?? "",
          partySize,
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          note: "",
        }}
      />
    </div>
  );
}

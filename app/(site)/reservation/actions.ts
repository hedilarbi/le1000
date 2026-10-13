"use server";

import { RESTAURANT_PHONE_DISPLAY } from "@/app/lib/reservations/config";
import { firstIssue, onlineReservationSchema } from "@/app/lib/reservations/validation";
import { consume } from "@/app/lib/server/rate-limit";
import { requestMeta } from "@/app/lib/server/request";
import { verifyTurnstile } from "@/app/lib/server/turnstile";
import { createReservation, getAreas, ReservationError } from "@/app/lib/server/reservations";

export type BookingState = {
  error?: string;
  booked?: { reference: string; date: string; time: string; partySize: number; areaName: string; email: string; needsConfirmation: boolean };
};

const TOO_MANY = `Trop de réservations ont été faites depuis cet appareil. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`;

export async function bookAction(_previous: BookingState, formData: FormData): Promise<BookingState> {
  // Champ invisible pour les humains : seul un robot le remplit.
  if (formData.get("website")) return { error: "La réservation n'a pas pu être enregistrée." };

  const { ip } = await requestMeta();
  if (!(await consume(`booking-ip:${ip}`, 10, 60 * 60)).allowed) return { error: TOO_MANY };
  if (!(await verifyTurnstile(String(formData.get("turnstileToken") ?? ""), ip))) {
    return { error: `La vérification anti-robot a échoué. Réessayez, ou appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.` };
  }

  const parsed = onlineReservationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  if (!(await consume(`booking-phone:${parsed.data.phone}`, 5, 24 * 60 * 60)).allowed) return { error: TOO_MANY };

  try {
    const reservation = await createReservation(parsed.data, { kind: "client", ip });
    const areas = await getAreas();
    return {
      booked: {
        reference: reservation.reference,
        date: reservation.date,
        time: reservation.time,
        partySize: reservation.partySize,
        areaName: areas.find((area) => area.id === reservation.areaId)?.name ?? "",
        email: reservation.email,
        // Réservation future : le client devra confirmer sa présence le jour J.
        needsConfirmation: reservation.autoCancelAt !== null,
      },
    };
  } catch (error) {
    if (error instanceof ReservationError) return { error: error.message };
    console.error("Réservation en ligne impossible :", error);
    return { error: `Un problème technique empêche la réservation. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.` };
  }
}

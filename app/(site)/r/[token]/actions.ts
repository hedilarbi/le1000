"use server";

import { refresh } from "next/cache";

import { RESTAURANT_PHONE_DISPLAY } from "@/app/lib/reservations/config";
import { clientChangeSchema, firstIssue } from "@/app/lib/reservations/validation";
import { consume } from "@/app/lib/server/rate-limit";
import { requestMeta } from "@/app/lib/server/request";
import {
  cancelReservation,
  confirmAttendance,
  findByManageToken,
  ReservationError,
  updateReservation,
  type Actor,
} from "@/app/lib/server/reservations";

export type ManageState = { error?: string; message?: string };

const EXPIRED = `Ce lien n'est plus valide. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`;

// Le jeton du lien est la seule preuve d'identité du client : on le revalide
// à chaque action.
async function authorize(formData: FormData) {
  const { ip } = await requestMeta();
  if (!(await consume(`manage:${ip}`, 30, 10 * 60)).allowed) {
    throw new ReservationError("Trop de tentatives. Réessayez dans quelques minutes.", "locked");
  }
  const reservation = await findByManageToken(String(formData.get("token") ?? ""));
  if (!reservation) throw new ReservationError(EXPIRED, "not_found");
  return { reservation, actor: { kind: "client", ip } satisfies Actor };
}

async function run(work: () => Promise<string>): Promise<ManageState> {
  try {
    const message = await work();
    refresh();
    return { message };
  } catch (error) {
    if (error instanceof ReservationError) return { error: error.message };
    console.error("Action client impossible :", error);
    return { error: `Un problème technique est survenu. Appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.` };
  }
}

export async function confirmAttendanceAction(_previous: ManageState, formData: FormData) {
  return run(async () => {
    const { reservation, actor } = await authorize(formData);
    await confirmAttendance(reservation._id, actor);
    return "Merci ! Votre présence est confirmée.";
  });
}

export async function cancelByClientAction(_previous: ManageState, formData: FormData) {
  return run(async () => {
    const { reservation, actor } = await authorize(formData);
    await cancelReservation(reservation._id, actor);
    return "Votre réservation est annulée. Un courriel de confirmation vous a été envoyé.";
  });
}

export async function changeByClientAction(_previous: ManageState, formData: FormData) {
  return run(async () => {
    const { reservation, actor } = await authorize(formData);
    const parsed = clientChangeSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) throw new ReservationError(firstIssue(parsed.error));
    await updateReservation(reservation._id, parsed.data, actor);
    return "Votre réservation est modifiée. Vous allez recevoir un courriel avec les nouveaux détails.";
  });
}

"use server";

import { ObjectId } from "mongodb";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";

import { adminReservationSchema, firstIssue } from "@/app/lib/reservations/validation";
import { requireAdmin } from "@/app/lib/server/auth";
import { requestMeta } from "@/app/lib/server/request";
import {
  cancelReservation,
  createReservation,
  ReservationError,
  resendManageLink,
  setAttendanceStatus,
  updateReservation,
  type Actor,
} from "@/app/lib/server/reservations";

async function adminActor(): Promise<Actor> {
  const admin = await requireAdmin();
  return { kind: "admin", adminId: admin.id, ip: (await requestMeta()).ip };
}

function reservationId(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!ObjectId.isValid(id)) throw new ReservationError("Réservation introuvable.", "not_found");
  return new ObjectId(id);
}

const ATTENDANCE_STATUSES = ["confirmed", "arrived", "no_show"] as const;

export async function setStatusAction(formData: FormData) {
  const actor = await adminActor();
  const status = ATTENDANCE_STATUSES.find((candidate) => candidate === formData.get("status"));
  if (!status) throw new ReservationError("Statut invalide.");
  await setAttendanceStatus(reservationId(formData), status, actor);
  refresh();
}

export async function cancelAction(formData: FormData) {
  const actor = await adminActor();
  // Depuis la fiche, une case permet de ne pas prévenir le client ; depuis la liste, il est toujours prévenu.
  const notifyClient = formData.get("notifyChoice") ? formData.get("notify") === "1" : true;
  await cancelReservation(reservationId(formData), actor, { notifyClient });
  refresh();
}

export type ResendState = { message?: string; error?: string };

export async function resendLinkAction(_previous: ResendState, formData: FormData): Promise<ResendState> {
  const actor = await adminActor();
  try {
    await resendManageLink(reservationId(formData), actor);
    return { message: "Courriel renvoyé au client." };
  } catch (error) {
    if (error instanceof ReservationError) return { error: error.message };
    throw error;
  }
}

export type SaveState = { error?: string; seatsLeft?: number };

export async function saveReservationAction(_previous: SaveState, formData: FormData): Promise<SaveState> {
  const actor = await adminActor();
  const parsed = adminReservationSchema.safeParse({
    ...Object.fromEntries(formData),
    email: String(formData.get("email") ?? ""),
    allowOverbooking: formData.get("allowOverbooking") === "on",
  });
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  const { allowOverbooking, ...input } = parsed.data;
  const id = formData.get("id");

  try {
    if (id) {
      await updateReservation(reservationId(formData), input, actor, { allowOverbooking });
    } else {
      await createReservation(input, actor, { allowOverbooking });
    }
  } catch (error) {
    if (error instanceof ReservationError) return { error: error.message, seatsLeft: error.seatsLeft };
    throw error;
  }

  redirect(`/admin?date=${input.date}`);
}

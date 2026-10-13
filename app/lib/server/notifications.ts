import "server-only";

import type { ObjectId } from "mongodb";

import {
  autoCancelEmail,
  cancellationEmail,
  confirmationEmail,
  confirmationRequestEmail,
  confirmationRequestSms,
  inboundSmsEmail,
  lastCallEmail,
  restaurantNewBookingEmail,
  updateEmail,
  type AttendanceMode,
  type MessageReservation,
} from "@/app/lib/reservations/messages";
import { formatTimeFr, restaurantNow } from "@/app/lib/reservations/time";
import type { NotificationKind } from "@/app/lib/reservations/types";
import { SITE_URL } from "@/app/lib/seo";

import { decrypt } from "./crypto";
import { collections, type ReservationDoc } from "./db";
import { sendEmail, type DeliveryResult } from "./email";
import { readEnv } from "./env";
import { sendSms } from "./sms";

export function manageUrl(token: string) {
  return `${SITE_URL}/r/${token}`;
}

export function adminReservationUrl(id: ObjectId) {
  return `${SITE_URL}/admin/reservations/${id.toHexString()}`;
}

export function manageUrlFor(reservation: ReservationDoc) {
  return reservation.manage ? manageUrl(decrypt(reservation.manage.tokenCipher)) : null;
}

function restaurantEmail() {
  return readEnv("RESTAURANT_NOTIFICATION_EMAIL");
}

async function messageData(reservation: ReservationDoc): Promise<MessageReservation> {
  const { areas } = await collections();
  const area = await areas.findOne({ _id: reservation.areaId });
  return { ...reservation, areaName: area?.name ?? reservation.areaId };
}

async function record(reservationId: ObjectId, kind: NotificationKind, result: DeliveryResult) {
  const { reservations } = await collections();
  await reservations.updateOne(
    { _id: reservationId },
    {
      $push: {
        notifications: {
          kind,
          status: result.status,
          at: new Date(),
          ...(result.providerId ? { providerId: result.providerId } : {}),
          ...(result.error ? { error: result.error } : {}),
        },
      },
    },
  );
  return result;
}

async function emailClient(reservation: ReservationDoc, kind: NotificationKind, content: { subject: string; text: string; html: string }) {
  if (!reservation.email) return record(reservation._id, kind, { status: "skipped", error: "Pas de courriel" });
  const result = await sendEmail({ to: reservation.email, replyTo: restaurantEmail(), ...content });
  return record(reservation._id, kind, result);
}

// Heure limite pour confirmer (« 16h00 »), affichée dans les messages.
function confirmBefore(reservation: ReservationDoc) {
  return reservation.autoCancelAt ? formatTimeFr(restaurantNow(reservation.autoCancelAt).minutes) : "";
}

// La demande de confirmation est-elle déjà ouverte (jour J à partir de 10 h) ?
export function confirmationIsOpen(reservation: ReservationDoc, now = new Date()) {
  return reservation.check.state !== "skipped" && now >= reservation.check.dueAt;
}

function attendanceMode(reservation: ReservationDoc): AttendanceMode {
  if (reservation.attendanceConfirmedAt || !reservation.autoCancelAt) return "confirmed";
  return confirmationIsOpen(reservation) ? "ask" : "later";
}

export async function sendConfirmation(reservation: ReservationDoc) {
  const url = manageUrlFor(reservation);
  if (!url) return;
  const content = confirmationEmail(await messageData(reservation), url, attendanceMode(reservation), confirmBefore(reservation));
  await emailClient(reservation, "confirmation_email", content);
}

export async function sendUpdate(reservation: ReservationDoc) {
  const url = manageUrlFor(reservation);
  if (!url) return;
  const content = updateEmail(await messageData(reservation), url, attendanceMode(reservation), confirmBefore(reservation));
  await emailClient(reservation, "update_email", content);
}

export async function sendCancellation(reservation: ReservationDoc) {
  await emailClient(reservation, "cancellation_email", cancellationEmail(await messageData(reservation)));
}

// Jour J à 10 h : courriel + SMS. Vrai si au moins un des deux est parti.
export async function sendConfirmationRequest(reservation: ReservationDoc) {
  const url = manageUrlFor(reservation);
  if (!url) return false;
  const data = await messageData(reservation);
  const deadline = confirmBefore(reservation);
  const [email, sms] = await Promise.all([
    emailClient(reservation, "check_email", confirmationRequestEmail(data, url, deadline)),
    sendSms(reservation.phone, confirmationRequestSms(data, url, deadline)).then((result) => record(reservation._id, "check_sms", result)),
  ]);
  return email.status === "sent" || sms.status === "sent";
}

// 4 h avant : dernier courriel avant l'annulation automatique.
export async function sendLastCall(reservation: ReservationDoc) {
  const url = manageUrlFor(reservation);
  if (!url) return false;
  const result = await emailClient(reservation, "last_call_email", lastCallEmail(await messageData(reservation), url, confirmBefore(reservation)));
  return result.status === "sent";
}

export async function sendAutoCancellation(reservation: ReservationDoc) {
  await emailClient(reservation, "auto_cancel_email", autoCancelEmail(await messageData(reservation)));
}

export async function notifyRestaurant(reservation: ReservationDoc) {
  const to = restaurantEmail();
  if (!to) return;
  const content = restaurantNewBookingEmail(await messageData(reservation), adminReservationUrl(reservation._id));
  await record(reservation._id, "restaurant_email", await sendEmail({ to, replyTo: reservation.email, ...content }));
}

export async function forwardInboundSms(from: string, body: string, reservation: ReservationDoc | null) {
  const to = restaurantEmail();
  if (!to) return;
  const data = reservation ? await messageData(reservation) : null;
  await sendEmail({ to, ...inboundSmsEmail(from, body, data, reservation ? adminReservationUrl(reservation._id) : null) });
}

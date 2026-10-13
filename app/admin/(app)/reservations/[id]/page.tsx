import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { formatDateFr, formatTimeFr, isDateString, isTimeString, restaurantNow } from "@/app/lib/reservations/time";
import { STATUS_LABELS } from "@/app/lib/reservations/types";
import { formatPhone } from "@/app/lib/reservations/validation";
import { getReservation, inboundSmsFor, seatsForDay } from "@/app/lib/server/admin-queries";
import { auditTrail } from "@/app/lib/server/audit";
import { requireAdmin } from "@/app/lib/server/auth";
import { manageUrlFor } from "@/app/lib/server/notifications";

import { BackLink } from "../../../_components/back-link";
import { LinkPanel } from "../../../_components/link-panel";
import { KIND_LABELS, NotificationSummary, ReservationBadges, STATUS_SYMBOLS } from "../../../_components/reservation-badges";
import { ReservationForm } from "../../../_components/reservation-form";
import { SubmitButton } from "../../../_components/submit-button";
import { ui } from "../../../_components/ui";
import { cancelAction, setStatusAction } from "../actions";

export const metadata: Metadata = { title: "Réservation" };

const text = (value: string | string[] | undefined) => (typeof value === "string" ? value : "");

const AUDIT_LABELS: Record<string, string> = {
  "reservation.create": "Réservation créée",
  "reservation.update": "Réservation modifiée",
  "reservation.cancel": "Réservation annulée",
  "reservation.attendance_confirmed": "Présence confirmée par le client",
  "reservation.link_resent": "Lien renvoyé au client",
  "reservation.status.arrived": "Marqué arrivé",
  "reservation.status.no_show": "Marqué absent",
  "reservation.status.confirmed": "Remis en attente",
};

const dateTimeFormatter = new Intl.DateTimeFormat("fr-CA", {
  timeZone: "America/Toronto",
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function ReservationPage({ params, searchParams }: PageProps<"/admin/reservations/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const reservation = await getReservation(id);
  if (!reservation) notFound();

  const now = restaurantNow();
  const date = isDateString(text(query.date)) ? text(query.date) : reservation.date;
  const [{ areas, openSlots, seats }, trail, smsReplies] = await Promise.all([
    seatsForDay(date, reservation._id),
    auditTrail(reservation._id),
    inboundSmsFor(reservation._id),
  ]);
  const area = areas.find((candidate) => candidate.id === reservation.areaId);
  const isCancelled = reservation.status === "cancelled";
  const editable = !isCancelled && !reservation.anonymizedAt;
  const manageUrl = editable ? manageUrlFor(reservation) : null;
  const fullName = `${reservation.firstName} ${reservation.lastName}`;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <BackLink href={`/admin?date=${reservation.date}`}>Retour au {formatDateFr(reservation.date)}</BackLink>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className={ui.heading}>{fullName}</h1>
          <ReservationBadges reservation={reservation} />
        </div>
        <p className="mt-1 text-ivory/60">
          {formatDateFr(reservation.date)} à {formatTimeFr(reservation.time)} · {reservation.partySize} pers. · {area?.name ?? reservation.areaId} ·
          Réf. <span className="font-mono">{reservation.reference}</span>
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div>
          {editable ? (
            <ReservationForm
              key={date}
              id={id}
              date={date}
              today={now.date}
              areas={areas}
              openSlots={openSlots}
              seats={seats}
              basePath={`/admin/reservations/${id}`}
              initial={{
                time: isTimeString(text(query.heure)) ? text(query.heure) : reservation.time,
                areaId: text(query.lieu) || reservation.areaId,
                partySize: Number.parseInt(text(query.personnes), 10) || reservation.partySize,
                firstName: reservation.firstName,
                lastName: reservation.lastName,
                phone: reservation.phone ? formatPhone(reservation.phone) : "",
                email: reservation.email,
                note: reservation.note,
              }}
            />
          ) : (
            <div className={`${ui.card} p-5 text-ivory/70`}>
              <p>
                {reservation.anonymizedAt
                  ? "Les données personnelles de cette réservation ont été anonymisées."
                  : `Cette réservation a été annulée${reservation.cancelledAt ? ` le ${dateTimeFormatter.format(reservation.cancelledAt)}` : ""}.`}
              </p>
              {reservation.phone && <p className="mt-2">Téléphone : {formatPhone(reservation.phone)}</p>}
              {reservation.email && <p>Courriel : {reservation.email}</p>}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-5">
          {editable && (
            <section className={`${ui.card} flex flex-col gap-3 p-4`}>
              <h2 className={ui.subheading}>Statut : {STATUS_LABELS[reservation.status]}</h2>
              <form action={setStatusAction} className="flex flex-wrap gap-2">
                <input type="hidden" name="id" value={id} />
                {reservation.status !== "arrived" && (
                  <SubmitButton name="status" value="arrived" className={ui.secondary} pendingLabel="…">
                    Arrivé
                  </SubmitButton>
                )}
                {reservation.status !== "no_show" && (
                  <SubmitButton name="status" value="no_show" className={ui.secondary} pendingLabel="…">
                    Absent
                  </SubmitButton>
                )}
                {reservation.status !== "confirmed" && (
                  <SubmitButton name="status" value="confirmed" className={ui.secondary} pendingLabel="…">
                    Remettre en attente
                  </SubmitButton>
                )}
              </form>
              <form action={cancelAction} className="flex flex-col gap-2 border-t border-ivory/10 pt-3">
                <input type="hidden" name="id" value={id} />
                {reservation.email && (
                  <label className="flex items-center gap-2 text-sm text-ivory/70">
                    <input type="hidden" name="notifyChoice" value="1" />
                    <input type="checkbox" name="notify" value="1" defaultChecked className="h-4 w-4 accent-[#d1a647]" />
                    Prévenir le client par courriel
                  </label>
                )}
                <SubmitButton className={ui.danger} pendingLabel="Annulation…" confirmMessage={`Annuler la réservation de ${fullName} ?`}>
                  Annuler la réservation
                </SubmitButton>
              </form>
            </section>
          )}

          {manageUrl && (
            <section className={`${ui.card} flex flex-col gap-2 p-4`}>
              <h2 className={ui.subheading}>Lien du client</h2>
              <p className="text-xs text-ivory/50">Permet au client de voir, modifier ou annuler sa réservation.</p>
              <LinkPanel id={id} url={manageUrl} canResend={Boolean(reservation.email)} />
            </section>
          )}

          <section className={`${ui.card} flex flex-col gap-3 p-4`}>
            <h2 className={ui.subheading}>Envois</h2>
            {reservation.notifications.length ? (
              <>
                <NotificationSummary notifications={reservation.notifications} />
                <ul className="flex flex-col gap-1.5 text-xs text-ivory/55">
                  {reservation.notifications.map((notification, index) => (
                    <li key={index}>
                      {dateTimeFormatter.format(notification.at)} · {KIND_LABELS[notification.kind]} · {STATUS_SYMBOLS[notification.status]}
                      {notification.error && <span className="text-red-300"> ({notification.error})</span>}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-ivory/50">Aucun envoi pour l&apos;instant.</p>
            )}
          </section>

          {smsReplies.length > 0 && (
            <section className={`${ui.card} flex flex-col gap-2 p-4`}>
              <h2 className={ui.subheading}>Réponses SMS</h2>
              {smsReplies.map((sms) => (
                <p key={sms._id.toHexString()} className="rounded-lg bg-ivory/5 p-3 text-sm">
                  {sms.body}
                  <span className="mt-1 block text-xs text-ivory/45">{dateTimeFormatter.format(sms.receivedAt)}</span>
                </p>
              ))}
            </section>
          )}

          <section className={`${ui.card} flex flex-col gap-2 p-4`}>
            <h2 className={ui.subheading}>Historique</h2>
            <ul className="flex flex-col gap-1.5 text-sm text-ivory/65">
              {trail.map((entry) => (
                <li key={entry._id.toHexString()}>
                  <span className="text-ivory/45">{dateTimeFormatter.format(entry.at)}</span> · {AUDIT_LABELS[entry.action] ?? entry.action}
                  {entry.actor === "client" && " (client)"}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

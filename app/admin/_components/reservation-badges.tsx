import type { NotificationKind, NotificationLog } from "@/app/lib/reservations/types";
import type { ReservationDoc } from "@/app/lib/server/db";

const TONES = {
  green: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-500/15 text-amber-200",
  red: "border-red-400/30 bg-red-500/15 text-red-200",
  blue: "border-sky-400/30 bg-sky-500/15 text-sky-200",
  gray: "border-ivory/15 bg-ivory/5 text-ivory/60",
} as const;

export function Badge({ tone, children }: { tone: keyof typeof TONES; children: React.ReactNode }) {
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${TONES[tone]}`}>{children}</span>;
}

type BadgeReservation = Pick<
  ReservationDoc,
  "status" | "attendanceConfirmedAt" | "check" | "autoCancelAt" | "cancelReason" | "overbooked" | "source"
>;

export function ReservationBadges({ reservation }: { reservation: BadgeReservation }) {
  const badges: React.ReactNode[] = [];
  const { check, autoCancelAt } = reservation;

  if (reservation.status === "cancelled") {
    badges.push(
      <Badge key="s" tone="gray">
        {reservation.cancelReason === "no_confirmation" ? "Annulée faute de confirmation" : "Annulée"}
      </Badge>,
    );
  } else if (reservation.status === "arrived") badges.push(<Badge key="s" tone="blue">Arrivé</Badge>);
  else if (reservation.status === "no_show") badges.push(<Badge key="s" tone="red">Absent</Badge>);
  else if (reservation.attendanceConfirmedAt || !autoCancelAt) badges.push(<Badge key="s" tone="green">Présence confirmée</Badge>);
  else {
    if (check.state === "sent") badges.push(<Badge key="s" tone="amber">En attente de confirmation</Badge>);
    if (check.state === "failed") badges.push(<Badge key="f" tone="red">Demande non envoyée</Badge>);
  }

  if (reservation.overbooked) badges.push(<Badge key="o" tone="amber">Surbooking</Badge>);
  badges.push(
    <Badge key="src" tone="gray">
      {reservation.source === "online" ? "En ligne" : "Saisie admin"}
    </Badge>,
  );

  return <span className="flex flex-wrap gap-1.5">{badges}</span>;
}

export const KIND_LABELS: Record<NotificationKind, string> = {
  confirmation_email: "Confirmation",
  update_email: "Modification",
  cancellation_email: "Annulation",
  check_email: "Demande 10 h (courriel)",
  check_sms: "Demande 10 h (SMS)",
  last_call_email: "Dernier rappel",
  auto_cancel_email: "Annulation auto",
  restaurant_email: "Copie resto",
};

export const STATUS_SYMBOLS: Record<NotificationLog["status"], string> = {
  sent: "envoyé",
  delivered: "reçu ✓",
  failed: "échec ✗",
  skipped: "non envoyé",
};

// Dernier état de chaque type d'envoi (courriels et SMS) pour le client.
export function NotificationSummary({ notifications }: { notifications: NotificationLog[] }) {
  const latest = new Map<NotificationKind, NotificationLog>();
  for (const notification of notifications) {
    if (notification.kind !== "restaurant_email") latest.set(notification.kind, notification);
  }
  if (!latest.size) return null;

  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ivory/45">
      {[...latest.values()].map((notification) => (
        <span
          key={notification.kind}
          title={notification.error}
          className={notification.status === "failed" ? "text-red-300" : undefined}
        >
          {KIND_LABELS[notification.kind]} : {STATUS_SYMBOLS[notification.status]}
        </span>
      ))}
    </span>
  );
}

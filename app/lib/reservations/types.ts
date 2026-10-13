export type Area = {
  id: string;
  name: string;
  capacity: number;
  active: boolean;
  order: number;
};

export type DayHours = {
  open: boolean;
  opensAt: string;
  closesAt: string;
};

export type ReservationSettings = {
  occupancyMinutes: number;
  bufferMinutes: number;
  lastSeatingBeforeCloseMinutes: number;
  // Délai minimum entre maintenant et l'heure réservée, pour les réservations en ligne.
  minOnlineLeadMinutes: number;
  // Index 0 = dimanche, comme Date.getUTCDay().
  weeklyHours: DayHours[];
};

export type ReservationStatus = "confirmed" | "arrived" | "no_show" | "cancelled";
export type ReservationSource = "online" | "admin";

export type NotificationKind =
  | "confirmation_email"
  | "update_email"
  | "cancellation_email"
  | "check_email"
  | "check_sms"
  | "last_call_email"
  | "auto_cancel_email"
  | "restaurant_email";

export type NotificationStatus = "sent" | "delivered" | "failed" | "skipped";

export type NotificationLog = {
  kind: NotificationKind;
  status: NotificationStatus;
  at: Date;
  providerId?: string;
  error?: string;
};

export type ReminderState = "pending" | "processing" | "sent" | "failed" | "skipped";

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  confirmed: "Confirmée",
  arrived: "Arrivé",
  no_show: "Absent",
  cancelled: "Annulée",
};

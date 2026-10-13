// Règles fixes du système de réservation. Les valeurs modifiables par l'admin
// (capacités, horaires, durée d'occupation) sont stockées en base.

export const TIME_ZONE = "America/Toronto";

export const SLOT_INTERVAL_MINUTES = 30;
export const MAX_ONLINE_PARTY_SIZE = 7;
export const MAX_ADMIN_PARTY_SIZE = 500;
// Réservations à venir autorisées en ligne par cellulaire ou par courriel (anti-spam).
export const MAX_ACTIVE_ONLINE_RESERVATIONS = 2;
export const BOOKING_HORIZON_DAYS = 60;
export const CLIENT_CHANGE_CUTOFF_MINUTES = 60;
// Suivi d'une réservation faite à l'avance (heures du restaurant) :
// le jour J à 10 h, courriel + SMS pour confirmer la présence ; 4 h avant, dernier
// courriel ; 3 h avant, annulation si rien n'est confirmé ni modifié. Pour une
// réservation avant 14 h, seule la demande de 10 h part, et l'annulation a lieu à midi.
export const CONFIRMATION_REQUEST_TIME = "10:00";
export const LAST_CALL_LEAD_MINUTES = 240;
export const AUTO_CANCEL_LEAD_MINUTES = 180;
export const LUNCH_AUTO_CANCEL_TIME = "12:00";
export const PERSONAL_DATA_RETENTION_DAYS = 365;

export const RESTAURANT_NAME = "Le 1000 Resto Bar Relais";
export const RESTAURANT_PHONE_DISPLAY = "819-697-1214";
export const RESTAURANT_PHONE_LINK = "tel:+18196971214";

export const DEFAULT_AREAS = [
  { id: "bar", name: "Bar", order: 1 },
  { id: "terrasse", name: "Terrasse", order: 2 },
  { id: "salle-a-manger", name: "Salle à manger", order: 3 },
] as const;

export const DEFAULT_SETTINGS = {
  occupancyMinutes: 150,
  bufferMinutes: 30,
  lastSeatingBeforeCloseMinutes: 60,
  minOnlineLeadMinutes: 60,
  weeklyHours: Array.from({ length: 7 }, () => ({ open: true, opensAt: "11:00", closesAt: "23:00" })),
};

export const WEEKDAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

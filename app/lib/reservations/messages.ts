import { RESTAURANT_NAME, RESTAURANT_PHONE_DISPLAY } from "./config";
import { formatDateFr, formatShortDateFr, formatTimeFr } from "./time";
import { formatPhone } from "./validation";

// Contenu des courriels et SMS envoyés aux clients et au restaurant.

export type MessageReservation = {
  reference: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note: string;
  date: string;
  time: string;
  partySize: number;
  areaName: string;
};

export type EmailContent = { subject: string; text: string; html: string };

const ADDRESS_LINE = `1000 montée Sainte-Marthe, Trois-Rivières · ${RESTAURANT_PHONE_DISPLAY}`;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const people = (count: number) => `${count} personne${count > 1 ? "s" : ""}`;

function detailRows(reservation: MessageReservation): [string, string][] {
  return [
    ["Date", formatDateFr(reservation.date)],
    ["Heure", formatTimeFr(reservation.time)],
    ["Personnes", String(reservation.partySize)],
    ["Lieu", reservation.areaName],
    ["Référence", reservation.reference],
  ];
}

type EmailBlock = {
  title: string;
  paragraphs: string[];
  rows?: [string, string][];
  button?: { label: string; url: string };
  footnote?: string;
};

function renderEmail(block: EmailBlock): Omit<EmailContent, "subject"> {
  const rowsText = block.rows?.map(([label, value]) => `${label} : ${value}`).join("\n") ?? "";
  const text = [
    block.title,
    "",
    ...block.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    rowsText,
    block.button ? `\n${block.button.label} : ${block.button.url}` : "",
    block.footnote ? `\n${block.footnote}` : "",
    "",
    RESTAURANT_NAME,
    ADDRESS_LINE,
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const rowsHtml = block.rows
    ?.map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#7a6a4f;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1a1a1a;font-size:15px;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f2efe8;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2efe8;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:10px;overflow:hidden">
<tr><td style="background:#0d0e0e;padding:22px 28px;color:#d1a647;font-size:20px;font-weight:700;letter-spacing:.06em">LE 1000 · RESTO BAR RELAIS</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:21px;color:#0d0e0e">${escapeHtml(block.title)}</h1>
${block.paragraphs.map((paragraph) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#333">${escapeHtml(paragraph)}</p>`).join("")}
${rowsHtml ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px">${rowsHtml}</table>` : ""}
${block.button ? `<p style="margin:24px 0"><a href="${escapeHtml(block.button.url)}" style="display:inline-block;background:#d1a647;color:#160f04;padding:14px 26px;border-radius:6px;font-weight:700;text-decoration:none;font-size:15px">${escapeHtml(block.button.label)}</a></p>` : ""}
${block.footnote ? `<p style="margin:0;font-size:13px;line-height:1.6;color:#666">${escapeHtml(block.footnote)}</p>` : ""}
</td></tr>
<tr><td style="padding:18px 28px;background:#faf8f3;font-size:12px;color:#7a6a4f">${escapeHtml(RESTAURANT_NAME)}<br>${escapeHtml(ADDRESS_LINE)}</td></tr>
</table></td></tr></table></body></html>`;

  return { text, html };
}

// confirmed : présence confirmée (réservation du jour même, ou confirmée par le client) ;
// ask : la demande de confirmation est partie ; later : elle partira le jour J à 10 h.
export type AttendanceMode = "confirmed" | "ask" | "later";

// Heure limite de confirmation (« 16h00 ») ; vide si la réservation n'expire pas.
function attendanceText(mode: AttendanceMode, confirmBefore: string) {
  if (mode === "confirmed") return "Votre réservation est confirmée, on vous attend !";
  if (mode === "ask") {
    return `Merci de confirmer votre présence avant ${confirmBefore} avec le bouton ci-dessous. Sans confirmation, la réservation sera annulée automatiquement.`;
  }
  return "Le jour de votre réservation, à 10 h, vous recevrez un courriel et un texto pour confirmer votre présence. Sans confirmation, la réservation sera annulée automatiquement.";
}

export function confirmationEmail(reservation: MessageReservation, manageUrl: string, mode: AttendanceMode, confirmBefore: string): EmailContent {
  return {
    subject: "Votre réservation est enregistrée – Le 1000",
    ...renderEmail({
      title: `Merci ${reservation.firstName}, votre réservation est bien enregistrée`,
      paragraphs: [attendanceText(mode, confirmBefore)],
      rows: detailRows(reservation),
      button: { label: mode === "ask" ? "Confirmer ma présence" : "Voir ma réservation", url: manageUrl },
      footnote: "Ce lien vous permet aussi de modifier ou d'annuler votre réservation. Ne le partagez pas.",
    }),
  };
}

export function updateEmail(reservation: MessageReservation, manageUrl: string, mode: AttendanceMode, confirmBefore: string): EmailContent {
  return {
    subject: "Votre réservation a été modifiée – Le 1000",
    ...renderEmail({
      title: "Votre réservation a été modifiée",
      paragraphs: [`Bonjour ${reservation.firstName}, voici les nouveaux détails de votre réservation.`, attendanceText(mode, confirmBefore)],
      rows: detailRows(reservation),
      button: { label: mode === "ask" ? "Confirmer ma présence" : "Voir ma réservation", url: manageUrl },
    }),
  };
}

export function cancellationEmail(reservation: MessageReservation): EmailContent {
  return {
    subject: "Votre réservation a été annulée – Le 1000",
    ...renderEmail({
      title: "Votre réservation a été annulée",
      paragraphs: [
        `Bonjour ${reservation.firstName}, la réservation ci-dessous a été annulée.`,
        `Pour réserver de nouveau, rendez-vous sur notre site ou appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`,
      ],
      rows: detailRows(reservation),
    }),
  };
}

// Jour J à 10 h : demande de confirmation (courriel).
export function confirmationRequestEmail(reservation: MessageReservation, manageUrl: string, confirmBefore: string): EmailContent {
  return {
    subject: `Aujourd'hui à ${formatTimeFr(reservation.time)} : merci de confirmer avant ${confirmBefore} – Le 1000`,
    ...renderEmail({
      title: `Bonjour ${reservation.firstName}, c'est aujourd'hui !`,
      paragraphs: [
        `Nous avons hâte de vous accueillir. Merci de confirmer votre présence avant ${confirmBefore}. Sans confirmation, votre réservation sera annulée automatiquement.`,
        "Si vos plans ont changé, vous pouvez aussi modifier ou annuler votre réservation.",
      ],
      rows: detailRows(reservation),
      button: { label: "Confirmer ma présence", url: manageUrl },
    }),
  };
}

// Jour J à 10 h : demande de confirmation (SMS). Reste dans l'alphabet GSM-7
// (pas de ê, â, ô, ’…) et sous 160 caractères : un seul SMS facturé.
// Heures pleines sans « 00 » (19h, 16h30).
export function confirmationRequestSms(reservation: MessageReservation, manageUrl: string, confirmBefore: string) {
  const short = (time: string) => time.replace(/h00$/, "h");
  const people = `${reservation.partySize} personne${reservation.partySize > 1 ? "s" : ""}`;
  return [
    `Veuillez confirmer votre réservation pour ${people} à ${short(formatTimeFr(reservation.time))} avant ${short(confirmBefore)}`,
    manageUrl,
    "Merci, Le 1000",
    "STOP: désabonnement",
  ].join("\n");
}

// 4 h avant : dernier rappel (courriel), 1 h avant l'annulation automatique.
export function lastCallEmail(reservation: MessageReservation, manageUrl: string, confirmBefore: string): EmailContent {
  return {
    subject: `Dernier rappel : confirmez avant ${confirmBefore} – Le 1000`,
    ...renderEmail({
      title: `${reservation.firstName}, nous attendons votre confirmation`,
      paragraphs: [
        `Sans confirmation d'ici ${confirmBefore}, votre réservation de ${formatTimeFr(reservation.time)} sera annulée et les places seront libérées.`,
      ],
      rows: detailRows(reservation),
      button: { label: "Confirmer ma présence", url: manageUrl },
    }),
  };
}

export function autoCancelEmail(reservation: MessageReservation): EmailContent {
  return {
    subject: "Votre réservation a été annulée faute de confirmation – Le 1000",
    ...renderEmail({
      title: "Votre réservation a été annulée",
      paragraphs: [
        `Bonjour ${reservation.firstName}, nous n'avons pas reçu la confirmation de votre présence : la réservation ci-dessous a été annulée et les places ont été libérées.`,
        `Pour réserver de nouveau, rendez-vous sur notre site ou appelez-nous au ${RESTAURANT_PHONE_DISPLAY}.`,
      ],
      rows: detailRows(reservation),
    }),
  };
}

export function restaurantNewBookingEmail(reservation: MessageReservation, adminUrl: string): EmailContent {
  return {
    subject: `Nouvelle réservation en ligne : ${formatShortDateFr(reservation.date)} ${formatTimeFr(reservation.time)}, ${people(reservation.partySize)} (${reservation.areaName})`,
    ...renderEmail({
      title: "Nouvelle réservation en ligne",
      paragraphs: [],
      rows: [
        ...detailRows(reservation),
        ["Client", `${reservation.firstName} ${reservation.lastName}`],
        ["Téléphone", formatPhone(reservation.phone)],
        ["Courriel", reservation.email],
        ...(reservation.note ? ([["Note", reservation.note]] as [string, string][]) : []),
      ],
      button: { label: "Ouvrir dans l'admin", url: adminUrl },
    }),
  };
}

export function inboundSmsEmail(from: string, body: string, reservation: MessageReservation | null, adminUrl: string | null): EmailContent {
  return {
    subject: `Réponse SMS de ${reservation ? `${reservation.firstName} ${reservation.lastName}` : formatPhone(from)}`,
    ...renderEmail({
      title: "Un client a répondu au SMS de rappel",
      paragraphs: [body],
      rows: [
        ["Téléphone", formatPhone(from)],
        ...(reservation ? detailRows(reservation) : []),
      ],
      button: adminUrl ? { label: "Ouvrir la réservation", url: adminUrl } : undefined,
    }),
  };
}

import { z } from "zod";

import { MAX_ADMIN_PARTY_SIZE, MAX_ONLINE_PARTY_SIZE } from "./config";
import { isDateString, isTimeString } from "./time";

// Numéros nord-américains uniquement (le numéro d'envoi Twilio est canadien).
export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  return `+1${digits}`;
}

// Mise en forme pendant la saisie : accepte espaces, tirets, parenthèses et un +1
// (ou 1) en tête, qui est retiré. Affiche 819-234-5678.
export function formatPhoneInput(value: string) {
  let digits = value.replace(/\D/g, "");
  if (value.trim().startsWith("+1") || (digits.length > 10 && digits.startsWith("1"))) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatPhone(e164: string) {
  const digits = e164.replace(/^\+1/, "");
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const trimmed = (max: number) => z.string().trim().max(max);

const dateField = z.string().refine(isDateString, "Date invalide.");
const timeField = z.string().refine(isTimeString, "Heure invalide.");
const areaField = z.string().regex(/^[a-z0-9-]{1,40}$/, "Lieu invalide.");

const phoneField = z
  .string()
  .transform((value, context) => {
    const phone = normalizePhone(value);
    if (!phone) {
      context.addIssue({ code: "custom", message: "Ce numéro de cellulaire n'existe pas. Entrez un numéro canadien ou américain valide, ex. 819-555-1234." });
      return z.NEVER;
    }
    return phone;
  });

const emailField = z.string().trim().toLowerCase().max(254).pipe(z.email("Adresse courriel invalide."));

const contactFields = {
  firstName: trimmed(60).min(1, "Le prénom est requis."),
  lastName: trimmed(60).min(1, "Le nom est requis."),
  phone: phoneField,
  email: emailField,
  note: trimmed(500).default(""),
};

export const onlineReservationSchema = z.object({
  date: dateField,
  time: timeField,
  areaId: areaField,
  partySize: z.coerce.number().int().min(1).max(MAX_ONLINE_PARTY_SIZE, `Pour ${MAX_ONLINE_PARTY_SIZE + 1} personnes et plus, appelez-nous.`),
  ...contactFields,
});

export const adminReservationSchema = z.object({
  date: dateField,
  time: timeField,
  areaId: areaField,
  partySize: z.coerce.number().int().min(1).max(MAX_ADMIN_PARTY_SIZE),
  ...contactFields,
  // Une réservation prise par téléphone peut ne pas avoir de courriel.
  email: z.string().trim().toLowerCase().max(254).pipe(z.union([z.literal(""), z.email("Adresse courriel invalide.")])),
  allowOverbooking: z.boolean().default(false),
});

export const clientChangeSchema = z.object({
  date: dateField,
  time: timeField,
  areaId: areaField,
  partySize: z.coerce.number().int().min(1).max(MAX_ONLINE_PARTY_SIZE, `Pour ${MAX_ONLINE_PARTY_SIZE + 1} personnes et plus, appelez-nous.`),
});

export function firstIssue(error: z.ZodError) {
  return error.issues[0]?.message ?? "Données invalides.";
}

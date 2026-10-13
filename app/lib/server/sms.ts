import "server-only";

import { createHmac } from "node:crypto";

import { SITE_URL } from "@/app/lib/seo";

import { safeEqual } from "./crypto";
import type { DeliveryResult } from "./email";
import { readEnv } from "./env";

export const TWILIO_STATUS_PATH = "/api/twilio/status";
export const TWILIO_INBOUND_PATH = "/api/twilio/inbound";

export async function sendSms(to: string, body: string): Promise<DeliveryResult> {
  // En développement (APP_ENV=dev), aucun SMS ne part : le contenu est seulement affiché.
  if (readEnv("APP_ENV") === "dev") {
    console.info(`[APP_ENV=dev] SMS non envoyé à …${to.slice(-4)} : ${body}`);
    return { status: "skipped", error: "SMS désactivés (APP_ENV=dev)" };
  }

  const accountSid = readEnv("TWILIO_ACCOUNT_SID");
  const authToken = readEnv("TWILIO_AUTH_TOKEN");
  const from = readEnv("TWILIO_FROM_NUMBER");
  if (!accountSid || !authToken || !from) {
    console.warn("SMS non envoyé (Twilio non configuré).");
    return { status: "skipped", error: "Twilio non configuré" };
  }

  const params = new URLSearchParams({ To: to, From: from, Body: body });
  if (SITE_URL.startsWith("https://")) params.set("StatusCallback", `${SITE_URL}${TWILIO_STATUS_PATH}`);

  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await response.json().catch(() => ({}))) as { sid?: string; code?: number; message?: string };
    if (!response.ok) {
      return { status: "failed", error: `Twilio ${data.code ?? response.status} : ${data.message ?? "erreur"}`.slice(0, 300) };
    }
    return { status: "sent", providerId: data.sid };
  } catch (error) {
    console.error("Échec de l'envoi Twilio :", error);
    return { status: "failed", error: "Twilio injoignable" };
  }
}

// Vérifie que la requête vient bien de Twilio (en-tête X-Twilio-Signature).
// L'URL doit être l'adresse publique exacte appelée par Twilio, pas celle vue
// derrière nginx.
export function isValidTwilioSignature(path: string, params: Record<string, string>, signature: string | null) {
  const authToken = readEnv("TWILIO_AUTH_TOKEN");
  if (!authToken || !signature) return false;

  const payload = Object.keys(params)
    .sort()
    .reduce((data, key) => data + key + params[key], `${SITE_URL}${path}`);
  const expected = createHmac("sha1", authToken).update(payload, "utf8").digest("base64");
  return safeEqual(expected, signature);
}

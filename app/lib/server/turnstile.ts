import "server-only";

import { isProduction, readEnv } from "./env";

// Vérifie auprès de Cloudflare le jeton anti-robot (Turnstile) envoyé avec le formulaire.
// Sans clé secrète : refusé en production, ignoré en développement.
export async function verifyTurnstile(token: string, ip: string) {
  const secret = readEnv("TURNSTILE_SECRET_KEY");
  if (!secret) {
    if (isProduction) console.error("TURNSTILE_SECRET_KEY manquante : réservations en ligne refusées.");
    return !isProduction;
  }
  if (!token || token.length > 2048) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip !== "inconnue" ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(8_000),
    });
    const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!result.success) console.warn("Turnstile refusé :", result["error-codes"]);
    return result.success === true;
  } catch (error) {
    console.error("Vérification Turnstile impossible :", error);
    return false;
  }
}

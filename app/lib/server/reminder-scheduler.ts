import "server-only";

import { processDueReminders } from "./reservations";

const INTERVAL_MS = 60_000;
const FIRST_RUN_DELAY_MS = 15_000;

const globalForScheduler = globalThis as typeof globalThis & { __le1000ReminderTimer?: ReturnType<typeof setInterval> };

// Tâche planifiée intégrée au serveur Next.js (lancée par instrumentation.ts) :
// chaque minute, envoie les demandes de confirmation et rappels dus, et annule les
// réservations non confirmées à temps.
// Un seul minuteur par processus, même après un rechargement à chaud en développement.
// Plusieurs processus ne posent pas de problème : chaque rappel est réservé en base
// avant l'envoi et ne part qu'une fois.
export function startReminderScheduler() {
  if (globalForScheduler.__le1000ReminderTimer) return;

  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try {
      const result = await processDueReminders();
      if (result.sent || result.failed || result.skipped || result.autoCancelled || result.anonymized) {
        console.info(
          `[rappels] envoyés: ${result.sent}, échecs: ${result.failed}, ignorés: ${result.skipped}, annulées faute de confirmation: ${result.autoCancelled}, anonymisées: ${result.anonymized}`,
        );
      }
    } catch (error) {
      console.error("[rappels] Échec de la tâche planifiée :", error);
    } finally {
      running = false;
    }
  };

  globalForScheduler.__le1000ReminderTimer = setInterval(tick, INTERVAL_MS);
  setTimeout(tick, FIRST_RUN_DELAY_MS);
  console.info("[rappels] Tâche planifiée démarrée (toutes les minutes).");
}

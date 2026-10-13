// Exécuté une fois au démarrage du serveur Next.js.
export async function register() {
  // Uniquement côté serveur Node.js (pas dans le runtime Edge), et jamais pendant `next build`.
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;

  const { startReminderScheduler } = await import("./app/lib/server/reminder-scheduler");
  startReminderScheduler();
}

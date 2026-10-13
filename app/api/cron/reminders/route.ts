import { safeEqual } from "@/app/lib/server/crypto";
import { readEnv } from "@/app/lib/server/env";
import { processDueReminders } from "@/app/lib/server/reservations";

export const runtime = "nodejs";

// Appelé toutes les 5 minutes par la crontab de l'EC2 :
//   curl -fsS -X POST -H "Authorization: Bearer $CRON_SECRET" http://127.0.0.1:3000/api/cron/reminders
export async function POST(request: Request) {
  const secret = readEnv("CRON_SECRET");
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secret || !safeEqual(provided, secret)) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const result = await processDueReminders();
  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}

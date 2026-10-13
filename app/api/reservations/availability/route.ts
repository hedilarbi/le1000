import { MAX_ONLINE_PARTY_SIZE } from "@/app/lib/reservations/config";
import { isDateString } from "@/app/lib/reservations/time";
import { consume } from "@/app/lib/server/rate-limit";
import { clientIpFrom } from "@/app/lib/server/request";
import { onlineAvailability } from "@/app/lib/server/reservations";

export const runtime = "nodejs";

// Créneaux disponibles en ligne pour une date et un nombre de personnes.
// Ne renvoie aucune donnée personnelle.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? "";
  const partySize = Number(searchParams.get("personnes"));

  if (!isDateString(date) || !Number.isInteger(partySize) || partySize < 1 || partySize > MAX_ONLINE_PARTY_SIZE) {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (!(await consume(`availability:${clientIpFrom(request.headers)}`, 60, 60)).allowed) {
    return Response.json({ error: "Trop de requêtes. Patientez une minute." }, { status: 429 });
  }

  return Response.json(await onlineAvailability(date, partySize), { headers: { "Cache-Control": "no-store" } });
}

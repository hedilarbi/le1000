"use server";

import { refresh } from "next/cache";
import { z } from "zod";

import { isTimeString } from "@/app/lib/reservations/time";
import { firstIssue } from "@/app/lib/reservations/validation";
import { futureReservationCounts, saveAreas, saveSettings } from "@/app/lib/server/admin-queries";
import { requireAdmin } from "@/app/lib/server/auth";
import { getAreas } from "@/app/lib/server/reservations";

export type ConfigState = { message?: string; error?: string; warnings?: string[] };

const capacitySchema = z.coerce.number().int("Nombre de places invalide.").min(0).max(1000, "1000 places maximum par lieu.");

export async function saveAreasAction(_previous: ConfigState, formData: FormData): Promise<ConfigState> {
  const admin = await requireAdmin();
  const current = await getAreas();

  const updates = [];
  for (const area of current) {
    const capacity = capacitySchema.safeParse(formData.get(`capacity_${area.id}`));
    if (!capacity.success) return { error: `${area.name} : ${firstIssue(capacity.error)}` };
    const active = formData.get(`active_${area.id}`) === "on";
    if (active && capacity.data === 0) return { error: `${area.name} : indiquez un nombre de places avant d'activer le lieu.` };
    updates.push({ id: area.id, capacity: capacity.data, active });
  }

  await saveAreas(updates, admin.id);

  // Les réservations déjà prises sont conservées : on prévient l'admin.
  const futureCounts = await futureReservationCounts();
  const warnings = updates
    .filter((update) => {
      const before = current.find((area) => area.id === update.id);
      return before && ((before.active && !update.active) || update.capacity < before.capacity) && futureCounts.get(update.id);
    })
    .map((update) => {
      const area = current.find((candidate) => candidate.id === update.id)!;
      const count = futureCounts.get(update.id)!;
      return `${area.name} : ${count} réservation${count > 1 ? "s" : ""} à venir ${count > 1 ? "sont maintenues" : "est maintenue"}. Vérifiez-les dans le tableau de bord.`;
    });

  refresh();
  return { message: "Lieux enregistrés.", warnings };
}

const minutesField = (label: string, max: number) =>
  z.coerce.number().int(`${label} : nombre entier requis.`).min(0, `${label} : valeur invalide.`).max(max, `${label} : ${max} minutes maximum.`);

const rulesSchema = z.object({
  occupancyMinutes: minutesField("Durée d'occupation", 600).min(30, "Durée d'occupation : 30 minutes minimum."),
  bufferMinutes: minutesField("Marge de sécurité", 240),
  lastSeatingBeforeCloseMinutes: minutesField("Dernière réservation", 600),
  minOnlineLeadMinutes: minutesField("Délai minimum en ligne", 1440),
});

export async function saveRulesAction(_previous: ConfigState, formData: FormData): Promise<ConfigState> {
  const admin = await requireAdmin();
  const rules = rulesSchema.safeParse(Object.fromEntries(formData));
  if (!rules.success) return { error: firstIssue(rules.error) };

  const weeklyHours = [];
  for (let day = 0; day < 7; day += 1) {
    const open = formData.get(`open_${day}`) === "on";
    const opensAt = String(formData.get(`opensAt_${day}`) ?? "");
    const closesAt = String(formData.get(`closesAt_${day}`) ?? "");
    if (!isTimeString(opensAt) || !isTimeString(closesAt)) return { error: "Heures d'ouverture invalides." };
    if (open && opensAt === closesAt) return { error: "L'heure de fermeture doit être différente de l'heure d'ouverture." };
    weeklyHours.push({ open, opensAt, closesAt });
  }

  await saveSettings({ ...rules.data, weeklyHours }, admin.id);
  refresh();
  return { message: "Horaires et règles enregistrés." };
}

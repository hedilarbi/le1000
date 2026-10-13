import type { Metadata } from "next";

import { futureReservationCounts } from "@/app/lib/server/admin-queries";
import { requireAdmin } from "@/app/lib/server/auth";
import { getAreas, getSettings } from "@/app/lib/server/reservations";

import { ui } from "../../_components/ui";
import { AreasForm, RulesForm } from "./config-forms";

export const metadata: Metadata = { title: "Configuration" };

export default async function ConfigurationPage() {
  await requireAdmin();
  const [areas, settings, futureCounts] = await Promise.all([getAreas(), getSettings(), futureReservationCounts()]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <h1 className={ui.heading}>Configuration</h1>

      <section className={`${ui.card} p-5`}>
        <h2 className={`${ui.subheading} mb-1`}>Lieux et nombre de places</h2>
        <AreasForm areas={areas} futureCounts={Object.fromEntries(futureCounts)} />
      </section>

      <section className={`${ui.card} p-5`}>
        <h2 className={`${ui.subheading} mb-4`}>Horaires et règles de réservation</h2>
        <RulesForm settings={settings} />
      </section>
    </div>
  );
}

import type { Metadata } from "next";

import { requireAdmin } from "@/app/lib/server/auth";

import { NewReservationPanel } from "./new-reservation-panel";

export const metadata: Metadata = { title: "Nouvelle réservation" };

// Version pleine page ; depuis le tableau de bord, le même formulaire s'ouvre
// dans une fenêtre (@modal/(.)reservations/nouvelle).
export default async function NewReservationPage({ searchParams }: PageProps<"/admin/reservations/nouvelle">) {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-5xl">
      <NewReservationPanel params={await searchParams} />
    </div>
  );
}

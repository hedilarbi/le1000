import { requireAdmin } from "@/app/lib/server/auth";

import { Modal } from "../../../../_components/modal";
import { NewReservationPanel } from "../../../reservations/nouvelle/new-reservation-panel";

// Clic sur une case « Places libres » ou sur « + Nouvelle réservation » : formulaire
// pré-rempli dans une fenêtre. Après l'enregistrement, le retour au tableau de bord la ferme.
export default async function NewReservationModal({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  return (
    <Modal label="Nouvelle réservation">
      <NewReservationPanel params={await searchParams} inModal />
    </Modal>
  );
}

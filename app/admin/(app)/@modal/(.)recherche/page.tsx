import { requireAdmin } from "@/app/lib/server/auth";

import { Modal } from "../../../_components/modal";
import { readQuery, SearchPanel } from "../../recherche/search-panel";

// Recherche ouverte depuis l'admin : même contenu que /admin/recherche, dans une fenêtre.
export default async function SearchModal({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const { q } = await searchParams;

  return (
    <Modal label="Rechercher une réservation">
      <SearchPanel query={readQuery(q)} />
    </Modal>
  );
}

import type { Metadata } from "next";

import { requireAdmin } from "@/app/lib/server/auth";

import { readQuery, SearchPanel } from "./search-panel";

export const metadata: Metadata = { title: "Rechercher" };

// Version pleine page (lien direct ou rechargement) ; depuis le tableau de bord,
// la même recherche s'ouvre dans une fenêtre modale (@modal/(.)recherche).
export default async function SearchPage({ searchParams }: PageProps<"/admin/recherche">) {
  await requireAdmin();
  const { q } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl">
      <SearchPanel query={readQuery(q)} />
    </div>
  );
}

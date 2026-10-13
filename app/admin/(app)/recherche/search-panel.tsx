import Form from "next/form";

import { searchReservations } from "@/app/lib/server/admin-queries";
import { getAreas } from "@/app/lib/server/reservations";

import { ReservationRow } from "../../_components/reservation-row";
import { ui } from "../../_components/ui";

export function readQuery(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim().slice(0, 80) : "";
}

// Recherche partagée par la page /admin/recherche et la fenêtre modale du tableau de bord.
export async function SearchPanel({ query }: { query: string }) {
  const [results, areas] = await Promise.all([searchReservations(query), getAreas()]);
  const areaNames = Object.fromEntries(areas.map((area) => [area.id, area.name]));

  return (
    <div className="flex flex-col gap-5">
      <h1 className={ui.heading}>Rechercher une réservation</h1>
      {/* Navigation côté client sans nouvelle entrée d'historique : « retour » ferme la fenêtre. */}
      <Form action="/admin/recherche" replace className="flex gap-2" role="search">
        <input
          name="q"
          type="search"
          defaultValue={query}
          autoFocus
          placeholder="Nom, téléphone, courriel ou référence"
          aria-label="Rechercher"
          className={`${ui.input} py-3 text-base`}
        />
        <button type="submit" className={ui.primary}>
          Rechercher
        </button>
      </Form>

      {query.length >= 2 && (
        <section className={`${ui.card} overflow-hidden`}>
          <p className="border-b border-ivory/10 p-4 text-sm text-ivory/55">
            {results.length ? `${results.length} résultat${results.length > 1 ? "s" : ""} — les réservations à venir en premier` : "Aucun résultat."}
          </p>
          <ul className="divide-y divide-ivory/10">
            {results.map((reservation) => (
              <ReservationRow
                key={reservation._id.toHexString()}
                reservation={reservation}
                areaName={areaNames[reservation.areaId] ?? reservation.areaId}
                showDate
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

import type { Metadata } from "next";

import { MenuEffects } from "@/app/components/menu-effects";
import { getMenuMarkup } from "@/app/lib/menu-markup";

export const metadata: Metadata = {
  title: "Menu — Le 1000 Resto Bar Relais",
  description:
    "Le menu du 1000 Resto Bar Relais : entrées, plats à partager, salades, burgers, pizzas, grillades, poké bowls, poutines et desserts.",
};

export default function MenuPage() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: getMenuMarkup() }} />
      <MenuEffects />
    </main>
  );
}

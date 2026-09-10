import type { Metadata } from "next";

import { MenuEffects } from "@/app/components/menu-effects";
import { MenuContent } from "@/app/components/page-content/menu-content";

export const metadata: Metadata = {
  title: "Menu — Le 1000 Resto Bar Relais",
  description:
    "Le menu du 1000 Resto Bar Relais : entrées, plats à partager, salades, burgers, pizzas, grillades, poké bowls, poutines et desserts.",
};

export default function MenuPage() {
  return (
    <main>
      <MenuContent />
      <MenuEffects />
    </main>
  );
}

import type { Metadata } from "next";

import { MenuEffects } from "@/app/components/menu-effects";
import { MenuContent } from "@/app/components/page-content/menu-content";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Menu du restaurant à Trois-Rivières",
  description: "Consultez le menu du 1000 : entrées, burgers, pizzas, tacos, grillades, poké bowls, poutines, desserts et promotions quotidiennes.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <main>
      <MenuContent />
      <MenuEffects />
    </main>
  );
}

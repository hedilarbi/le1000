import type { Metadata } from "next";

import { HomeEffects } from "@/app/components/home-effects";
import { OpeningIntro } from "@/app/components/opening-intro";
import { HomeContent } from "@/app/components/page-content/home-content";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Le 1000 Resto Bar Relais | Restaurant à Trois-Rivières",
  description: "Découvrez Le 1000 Resto Bar Relais à Trois-Rivières : cuisine généreuse, cocktails, terrasse, événements et ambiance sportive au Golf Le Marthelinois.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <OpeningIntro />
      <HomeContent />
      <HomeEffects />
    </main>
  );
}

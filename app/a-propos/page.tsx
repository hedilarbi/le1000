import type { Metadata } from "next";

import { AboutEffects } from "@/app/components/about-effects";
import { AboutContent } from "@/app/components/page-content/about-content";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "À propos de notre resto-bar",
  description: "Découvrez l’histoire, l’équipe et l’ambiance du 1000 Resto Bar Relais, une adresse chaleureuse située au Golf Le Marthelinois à Trois-Rivières.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
      <AboutEffects />
    </main>
  );
}

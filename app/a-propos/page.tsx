import type { Metadata } from "next";

import { AboutEffects } from "@/app/components/about-effects";
import { AboutContent } from "@/app/components/page-content/about-content";

export const metadata: Metadata = {
  title: "À propos — Le 1000 Resto Bar Relais",
  description:
    "L’histoire, la philosophie et l’équipe derrière Le 1000 Resto Bar Relais — une adresse chaleureuse pensée pour se retrouver.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
      <AboutEffects />
    </main>
  );
}

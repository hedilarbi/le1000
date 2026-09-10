import type { Metadata } from "next";

import { ContactEffects } from "@/app/components/contact-effects";
import { ContactContent } from "@/app/components/page-content/contact-content";

export const metadata: Metadata = {
  title: "Contact — Le 1000 Resto Bar Relais",
  description:
    "Nous joindre, réserver une table ou organiser un événement au 1000 Resto Bar Relais — adresse, téléphone, horaires et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactContent />
      <ContactEffects />
    </main>
  );
}

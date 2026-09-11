import type { Metadata } from "next";

import { ContactEffects } from "@/app/components/contact-effects";
import { ContactContent } from "@/app/components/page-content/contact-content";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact, réservation et événements",
  description: "Contactez Le 1000 Resto Bar Relais à Trois-Rivières pour une réservation, une question ou un événement. Téléphone, adresse, itinéraire et formulaire.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <ContactContent />
      <ContactEffects />
    </main>
  );
}

import type { Metadata } from "next";

import { ContactEffects } from "@/app/components/contact-effects";
import { getContactMarkup } from "@/app/lib/contact-markup";

export const metadata: Metadata = {
  title: "Contact — Le 1000 Resto Bar Relais",
  description:
    "Nous joindre, réserver une table ou organiser un événement au 1000 Resto Bar Relais — adresse, téléphone, horaires et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: getContactMarkup() }} />
      <ContactEffects />
    </main>
  );
}

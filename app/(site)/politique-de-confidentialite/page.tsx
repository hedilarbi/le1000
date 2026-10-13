import type { Metadata } from "next";

import { PERSONAL_DATA_RETENTION_DAYS, RESTAURANT_NAME, RESTAURANT_PHONE_DISPLAY } from "@/app/lib/reservations/config";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Politique de confidentialité",
  description: "Comment Le 1000 Resto Bar Relais protège les renseignements personnels recueillis lors des réservations.",
  path: "/politique-de-confidentialite",
});

const sections = [
  {
    title: "Renseignements recueillis",
    body: [
      "Lorsque vous faites une réservation, nous recueillons votre prénom, votre nom, votre numéro de téléphone, votre adresse courriel, la date, l'heure, le nombre de personnes et, si vous la remplissez, la note jointe à la réservation.",
      "Le formulaire de contact recueille votre nom, votre adresse courriel et votre message.",
    ],
  },
  {
    title: "Utilisation",
    body: [
      "Ces renseignements servent uniquement à gérer votre réservation : vous envoyer la confirmation par courriel, vous demander par courriel et par texto de confirmer votre présence le jour de la réservation, et vous joindre au besoin. Nous ne les vendons pas et ne les utilisons pas à des fins publicitaires.",
    ],
  },
  {
    title: "Fournisseurs",
    body: [
      "Pour fonctionner, le système de réservation s'appuie sur des fournisseurs infonuagiques : MongoDB Atlas (hébergement des données), Amazon Web Services (envoi des courriels), Twilio (envoi des textos) et Cloudflare Turnstile (protection anti-robot du formulaire). Ces fournisseurs peuvent traiter des renseignements à l'extérieur du Québec, dans le cadre d'ententes qui encadrent leur protection.",
    ],
  },
  {
    title: "Conservation",
    body: [
      `Les renseignements personnels liés à une réservation sont anonymisés automatiquement ${Math.round(PERSONAL_DATA_RETENTION_DAYS / 30)} mois après la date de la réservation.`,
    ],
  },
  {
    title: "Textos",
    body: ["Vous pouvez cesser de recevoir nos textos à tout moment en répondant STOP."],
  },
  {
    title: "Témoins (cookies)",
    body: [
      "Le site public n'utilise pas de témoins publicitaires. Un témoin de session sécurisé est utilisé uniquement dans l'espace réservé au personnel.",
    ],
  },
  {
    title: "Vos droits et responsable",
    body: [
      `Vous pouvez demander l'accès à vos renseignements, leur correction ou leur suppression en écrivant à info@le1000resto.com ou en appelant au ${RESTAURANT_PHONE_DISPLAY}. La personne responsable de la protection des renseignements personnels est la direction de ${RESTAURANT_NAME}, joignable à la même adresse.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="rs-root" className="bg-ink">
      <div className="mx-auto flex max-w-[860px] flex-col gap-10 px-[clamp(20px,5vw,80px)] pb-[clamp(80px,12vh,140px)] pt-[clamp(130px,20vh,200px)]">
        <h1 className="font-display text-[clamp(40px,5vw,76px)] uppercase leading-[.95] text-white">Politique de confidentialité</h1>
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="font-label text-[13px] tracking-[.32em] text-gold">{section.title.toUpperCase()}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-[15px] font-light leading-[1.85] text-ivory/75">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/Le1000_Logo.png";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink px-[clamp(20px,5vw,80px)] pb-9 pt-[clamp(70px,10vh,120px)]">
      <span aria-hidden="true" className="pointer-events-none absolute bottom-[-6%] left-1/2 -translate-x-1/2 select-none font-display text-[clamp(180px,30vw,460px)] font-bold leading-[.8] text-gold-deep/[.055]">
        1000
      </span>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-[clamp(28px,3vw,54px)] md:grid-cols-2 nav:grid-cols-[2fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Image src={logo} alt="Logo Le 1000 Resto Bar Relais" className="h-[52px] w-auto self-start" />
          <p className="max-w-[280px] text-[13px] font-light leading-[1.85] text-ivory/55">
            Une adresse chaleureuse où cuisine, cocktails et moments partagés se rencontrent.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="font-label text-[11px] tracking-[.32em] text-gold">NAVIGATION</span>
          <Link href="/#hero" className="text-[13px] text-ivory/70 hover:text-gold-bright">Accueil</Link>
          <Link href="/menu" className="text-[13px] text-ivory/70 hover:text-gold-bright">Menu</Link>
          <Link href="/a-propos" className="text-[13px] text-ivory/70 hover:text-gold-bright">À propos</Link>
          <Link href="/contact" className="text-[13px] text-ivory/70 hover:text-gold-bright">Contact</Link>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="font-label text-[11px] tracking-[.32em] text-gold">COORDONNÉES</span>
          <span className="text-[13px] font-light leading-[1.8] text-ivory/60">[Adresse à compléter]</span>
          <a href="tel:+10000000000" className="text-[13px] text-ivory/70 hover:text-gold-bright">[Téléphone]</a>
          <div className="mt-1.5 flex gap-[18px] text-[11px] uppercase tracking-[.2em]">
            <a href="#" className="hover:text-gold-bright">Instagram</a>
            <a href="#" className="hover:text-gold-bright">Facebook</a>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="font-label text-[11px] tracking-[.32em] text-gold">HORAIRES</span>
          <div className="grid grid-cols-[auto_auto] gap-x-[18px] gap-y-1.5 text-[13px] font-light text-ivory/60">
            <span>Lun – Jeu</span><span>[à compléter]</span>
            <span>Ven – Sam</span><span>[à compléter]</span>
            <span>Dimanche</span><span>[à compléter]</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-[clamp(48px,7vh,86px)] max-w-[1440px]">
        <div className="h-px bg-[linear-gradient(90deg,rgba(209,166,71,0),rgba(209,166,71,.35),rgba(209,166,71,0))]" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[11px] tracking-[.12em] text-ivory/40">
          <span>© 2026 Le 1000 Resto Bar Relais. Tous droits réservés.</span>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-ivory/50 hover:text-gold-bright">Mentions légales</a>
            <a href="#" className="text-ivory/50 hover:text-gold-bright">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import logo from "@/public/Le1000_Logo.png";

const links = [
  { label: "Accueil", href: "/#hero", path: "/" },

  { label: "Menu", href: "/menu", path: "/menu" },
  { label: "À propos", href: "/a-propos", path: "/a-propos" },
  { label: "Contact", href: "/contact", path: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        id="m1000-header"
        className={`fixed inset-x-0 top-0 z-80 flex items-center justify-between gap-6 border-b px-[clamp(20px,4vw,64px)] transition-[background,border-color,backdrop-filter,padding] duration-600 ease-[cubic-bezier(.16,.84,.24,1)] ${scrolled
            ? "border-gold/20 bg-ink/80 py-3.5 backdrop-blur-[14px]"
            : "border-transparent bg-transparent py-[22px] backdrop-blur-none"
          }`}
      >
        <Link href="/#hero" aria-label="Le 1000, retour en haut de la page" className="flex items-center">
          <Image
            src={logo}
            alt="Logo Le 1000 Resto Bar Relais"
            className="block h-[clamp(38px,4.4vw,54px)] w-auto"
            priority
          />
        </Link>

        <nav aria-label="Navigation principale" className="flex items-center gap-[clamp(18px,2.6vw,40px)]">
          <div className="hidden items-center gap-[clamp(18px,2.6vw,38px)] text-xs font-medium uppercase tracking-[.22em] nav:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b py-1.5 transition-colors duration-500 hover:text-gold-bright ${link.path === pathname ? "border-gold-bright/55 text-ivory" : "border-transparent text-ivory/70"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#infos"
            className="hidden items-center gap-2.5 rounded-[2px] border border-gold/55 px-[22px] py-3 text-[11px] font-medium uppercase tracking-[.24em] text-gold-bright transition-colors duration-500 hover:border-gold hover:bg-gold/15 nav:inline-flex"
          >
            Nous trouver
          </Link>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="m1000-menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-[46px] w-[46px] cursor-pointer flex-col justify-center gap-1.5 rounded-[2px] border border-ivory/20 bg-transparent px-[11px] nav:hidden"
          >
            <span className="block h-px bg-ivory" />
            <span className="block h-px bg-ivory" />
          </button>
        </nav>
      </header>

      <div
        id="m1000-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-90 flex flex-col justify-center bg-ink p-[clamp(28px,7vw,80px)] transition-[opacity,transform] duration-600 ease-[cubic-bezier(.16,.84,.24,1)] ${menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
          }`}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
          className="absolute right-[clamp(20px,5vw,64px)] top-[26px] h-12 w-12 cursor-pointer rounded-[2px] border border-ivory/20 bg-transparent font-sans text-xl leading-none text-ivory"
        >
          ×
        </button>
        <span className="font-label text-[13px] tracking-[.4em] text-gold">RESTO · BAR · RELAIS</span>
        <div className="mt-[34px] flex flex-col gap-1">
          {links.filter((link) => link.label !== "Promos").map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-[clamp(44px,13vw,80px)] uppercase leading-[1.02] transition-colors duration-500 hover:text-gold-bright ${link.path === pathname ? "tracking-[.01em] text-ivory" : "text-ivory/60"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="my-[40px] mb-[26px] h-px bg-[linear-gradient(90deg,rgba(209,166,71,.5),rgba(209,166,71,0))]" />
        <div className="flex flex-col gap-2.5 text-[13px] leading-[1.7] text-ivory/60">
          <span>[Adresse à compléter]</span>
          <a href="tel:+10000000000" className="text-gold-bright">[Téléphone à compléter]</a>
          <div className="mt-2 flex gap-[22px] text-[11px] uppercase tracking-[.22em]">
            <a href="#" aria-label="Instagram du 1000">Instagram</a>
            <a href="#" aria-label="Facebook du 1000">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}

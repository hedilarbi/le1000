import Image from "next/image";
import Link from "next/link";

import { requireAdmin } from "@/app/lib/server/auth";
import logo from "@/public/Le1000_Logo.png";

import { SubmitButton } from "../_components/submit-button";
import { logoutAction } from "./session-actions";

// L'en-tête a besoin de l'admin connecté ; chaque page et action revérifie
// la session de son côté. Le slot `modal` affiche la recherche par-dessus la page.
export default async function AdminAppLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const admin = await requireAdmin({ allowPasswordChange: true });
  const locked = admin.mustChangePassword;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 md:px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src={logo} alt="Le 1000" className="h-9 w-auto" priority />
            <span className="hidden font-label text-sm tracking-[.3em] text-gold sm:inline">ADMIN</span>
          </Link>

          <div className="flex justify-center">
            {!locked && (
              <Link
                href="/admin/recherche"
                className="flex w-full max-w-md items-center gap-3 rounded-lg border border-ivory/15 bg-ink px-4 py-2.5 text-sm text-ivory/45 transition hover:border-gold/60 hover:text-ivory/70"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <span className="truncate">Rechercher : nom, téléphone, courriel, référence…</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/mot-de-passe" className="hidden text-xs text-ivory/50 hover:text-gold-bright lg:inline">
              {admin.email}
            </Link>
            {!locked && (
              <Link
                href="/admin/configuration"
                aria-label="Configuration"
                title="Configuration"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ivory/15 text-ivory/75 transition hover:border-gold hover:text-gold-bright"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M11.08 2.25a1.5 1.5 0 0 0-1.48 1.25l-.27 1.6a7.6 7.6 0 0 0-1.6.93l-1.52-.6a1.5 1.5 0 0 0-1.84.65l-.92 1.6a1.5 1.5 0 0 0 .36 1.9l1.26 1.02a7.7 7.7 0 0 0 0 1.85L3.8 13.47a1.5 1.5 0 0 0-.36 1.9l.92 1.6a1.5 1.5 0 0 0 1.84.65l1.52-.6c.5.37 1.03.68 1.6.92l.27 1.61a1.5 1.5 0 0 0 1.48 1.25h1.84a1.5 1.5 0 0 0 1.48-1.25l.27-1.6a7.6 7.6 0 0 0 1.6-.93l1.52.6a1.5 1.5 0 0 0 1.84-.65l.92-1.6a1.5 1.5 0 0 0-.36-1.9l-1.26-1.02a7.7 7.7 0 0 0 0-1.85l1.26-1.02a1.5 1.5 0 0 0 .36-1.9l-.92-1.6a1.5 1.5 0 0 0-1.84-.65l-1.52.6a7.6 7.6 0 0 0-1.6-.92l-.27-1.61a1.5 1.5 0 0 0-1.48-1.25h-1.84ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
            <form action={logoutAction}>
              <SubmitButton
                className="inline-flex h-9 items-center rounded-lg bg-red-600 px-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
                pendingLabel="…"
              >
                Déconnexion
              </SubmitButton>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">{children}</main>
      {modal}
    </>
  );
}

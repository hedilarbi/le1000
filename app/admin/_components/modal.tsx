"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Fenêtre modale liée à l'URL : la fermer revient à la page précédente.
export function Modal({ children, label }: { children: React.ReactNode; label: string }) {
  const router = useRouter();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.back();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-[6vh] backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={label} className="relative w-full max-w-5xl rounded-2xl border border-ivory/10 bg-[#101213] p-5 shadow-2xl md:p-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Fermer"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-ivory/15 text-lg text-ivory/70 transition hover:border-gold hover:text-gold-bright"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

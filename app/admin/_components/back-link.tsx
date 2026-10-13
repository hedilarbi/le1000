import Link from "next/link";

// Bouton de retour bien visible : flèche dans un cercle, le tout encadré.
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-full border border-ivory/20 bg-ink py-1.5 pl-1.5 pr-5 text-sm font-semibold text-ivory transition hover:border-gold hover:text-gold-bright"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-on-gold transition group-hover:bg-gold-light">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z" />
        </svg>
      </span>
      {children}
    </Link>
  );
}

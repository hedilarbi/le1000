// Styles des formulaires de réservation publics, alignés sur le formulaire de contact.
export const rs = {
  label: "flex flex-col gap-2.5",
  labelText: "text-xs font-bold uppercase tracking-[.18em] text-white",
  input:
    "w-full rounded-[2px] border border-ivory/15 bg-ink/50 px-4 py-3.5 text-[15px] font-light text-ivory outline-none transition placeholder:text-ivory/35 focus:border-gold focus:bg-ink/75 [color-scheme:dark]",
  gold:
    "inline-flex items-center justify-center gap-3 rounded-[2px] bg-gold-gradient px-8 py-4 text-xs font-bold uppercase tracking-[.22em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center gap-3 rounded-[2px] border border-ivory/25 px-7 py-4 text-[11px] font-medium uppercase tracking-[.24em] text-ivory transition hover:border-gold hover:text-gold-bright disabled:opacity-50",
  eyebrow: "font-label text-[13px] tracking-[.42em] text-gold",
  card: "rounded-[2px] border border-ivory/10 bg-ink-soft/80 p-[clamp(20px,3vw,40px)]",
  error: "rounded-[2px] border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200",
  notice: "rounded-[2px] border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ivory-warm",
};

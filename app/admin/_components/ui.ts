// Classes partagées de l'interface admin : sobre, lisible sur tablette,
// aux couleurs du site.
const field =
  "rounded-lg border border-ivory/15 bg-ink px-3 py-2.5 text-[15px] text-ivory outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 disabled:opacity-50 [color-scheme:dark]";

export const ui = {
  card: "rounded-xl border border-ivory/10 bg-charcoal",
  input: `w-full ${field}`,
  label: "flex flex-col gap-1.5 text-sm font-medium text-ivory/75",
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-on-gold transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-ivory/20 px-4 py-2.5 text-sm font-medium text-ivory transition hover:border-gold hover:text-gold-bright disabled:opacity-60",
  small:
    "inline-flex items-center justify-center rounded-md border border-ivory/15 px-2.5 py-1.5 text-xs font-medium text-ivory/85 transition hover:border-gold hover:text-gold-bright disabled:opacity-60",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/40 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-60",
  heading: "font-display text-[28px] uppercase leading-none tracking-wide text-ivory",
  subheading: "font-display text-xl uppercase leading-none tracking-wide text-ivory",
  muted: "text-sm text-ivory/55",
  error: "rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-200",
  success: "rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-200",
};

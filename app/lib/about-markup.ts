import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

const sourcePath = join(
  process.cwd(),
  "Logo et page d'accueil",
  "A propos.dc.html",
);

function imageSlotsToImages(markup: string) {
  return markup.replace(
    /<image-slot\b([^>]*)><\/image-slot>/g,
    (_match, attributes: string) => {
      const src = attributes.match(/\bsrc="([^"]+)"/)?.[1] ?? "";
      const alt = attributes.match(/\bplaceholder="([^"]+)"/)?.[1] ?? "";
      const fit = attributes.match(/\bfit="([^"]+)"/)?.[1] ?? "cover";
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" style="display:block;width:100%;height:100%;object-fit:${fit};">`;
    },
  );
}

export function getAboutMarkup() {
  const source = readFileSync(sourcePath, "utf8");
  const rootStart = source.indexOf('<div id="ap-root"');
  const contentStart = source.indexOf('<section id="ap-hero"');
  const footerStart = source.indexOf('<footer data-screen-label="Footer"');

  if (rootStart === -1 || contentStart === -1 || footerStart === -1) {
    throw new Error("Impossible d’extraire la maquette À propos.");
  }

  const rootOpeningEnd = source.indexOf(">", rootStart) + 1;
  const markup = `${source.slice(rootStart, rootOpeningEnd)}${source.slice(contentStart, footerStart)}</div>`;

  return imageSlotsToImages(markup)
    .replaceAll('href="Accueil.dc.html#promo"', 'href="/#promo"')
    .replaceAll('href="Accueil.dc.html', 'href="/')
    .replaceAll('href="Menu.dc.html', 'href="/menu')
    .replaceAll('href="Contact.dc.html', 'href="/contact')
    .replace(/\s+style-hover="[^"]*"/g, "");
}

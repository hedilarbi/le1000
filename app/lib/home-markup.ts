import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

const sourcePath = join(
  process.cwd(),
  "Logo et page d'accueil",
  "Accueil.dc.html",
);

function imageSlotsToImages(markup: string) {
  return markup.replace(
    /<image-slot\b([^>]*)><\/image-slot>/g,
    (_match, attributes: string) => {
      const src = attributes.match(/\bsrc="([^"]+)"/)?.[1] ?? "";
      const placeholder =
        attributes.match(/\bplaceholder="([^"]+)"/)?.[1] ?? "";
      const fit = attributes.match(/\bfit="([^"]+)"/)?.[1] ?? "cover";

      return `<img src="${src}" alt="${placeholder}" loading="lazy" decoding="async" style="display:block;width:100%;height:100%;object-fit:${fit};">`;
    },
  );
}

export function getHomeMarkup() {
  const source = readFileSync(sourcePath, "utf8");
  const start = source.indexOf('<div id="m1000-root"');
  const end = source.indexOf("</x-dc>");
  const headerStart = source.indexOf('<header id="m1000-header"');
  const heroStart = source.indexOf('<section id="hero"');
  const footerStart = source.indexOf('<footer data-screen-label="Footer"');

  if (start === -1 || end === -1 || headerStart === -1 || heroStart === -1 || footerStart === -1) {
    throw new Error("Impossible d’extraire la maquette de la page d’accueil.");
  }

  const rootOpeningEnd = source.indexOf(">", start) + 1;
  const intro = source.slice(rootOpeningEnd, headerStart);
  const content = source.slice(heroStart, footerStart);
  const markup = `${source.slice(start, rootOpeningEnd)}${intro}${content}</div>`;

  return imageSlotsToImages(markup)
    .replaceAll('src="assets/logo-le1000.png"', 'src="/Le1000_Logo.png"')
    .replaceAll('href="Menu.dc.html', 'href="/menu')
    .replaceAll('href="A propos.dc.html', 'href="/a-propos')
    .replaceAll('href="Contact.dc.html', 'href="/contact')
    .replace(/\s+onClick="\{\{ toggleMenu \}\}"/g, "")
    .replace(/\s+style-hover="[^"]*"/g, "");
}

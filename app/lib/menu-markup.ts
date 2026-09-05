import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

const sourcePath = join(
  process.cwd(),
  "Logo et page d'accueil",
  "Menu.dc.html",
);

export function getMenuMarkup() {
  const source = readFileSync(sourcePath, "utf8");
  const start = source.indexOf('<div id="mn-root"');
  const end = source.indexOf("</x-dc>");

  if (start === -1 || end === -1) {
    throw new Error("Impossible d’extraire la maquette de la page menu.");
  }

  const originalMarkup = source.slice(start, end);
  const contentStart = originalMarkup.indexOf('<section id="mn-top"');
  const footerStart = originalMarkup.indexOf('<footer data-screen-label="Footer"');
  const rootOpeningEnd = originalMarkup.indexOf(">") + 1;
  const markup = `${originalMarkup.slice(0, rootOpeningEnd)}${originalMarkup.slice(contentStart, footerStart)}</div>`;

  return markup
    .replaceAll('src="assets/logo-le1000.png"', 'src="/Le1000_Logo.png"')
    .replaceAll('src="assets/interieur-le1000.png"', 'src="/interieur-le1000.png"')
    .replaceAll('href="Accueil.dc.html', 'href="/')
    .replaceAll('href="A propos.dc.html', 'href="/a-propos')
    .replaceAll('href="Contact.dc.html', 'href="/contact')
    .replace(/\s+onClick="\{\{ toggleMenu \}\}"/g, "")
    .replace(/\s+style-hover="[^"]*"/g, "");
}

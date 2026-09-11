import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Le 1000 Resto Bar Relais à Trois-Rivières";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(path.join(process.cwd(), "public", "Le1000_Logo.png"));
  const logoData = logoBuffer.buffer.slice(logoBuffer.byteOffset, logoBuffer.byteOffset + logoBuffer.byteLength);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0D0E0E 0%,#25292D 58%,#AD6F23 100%)", color: "#F2EFE8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 980, height: 470, padding: "56px 84px", border: "2px solid rgba(251,226,117,.55)", background: "rgba(13,14,14,.74)", textAlign: "center" }}>
        <img src={logoData as unknown as string} alt="" width={760} height={284} style={{ objectFit: "contain" }} />
        <div style={{ marginTop: 26, fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#F2EFE8" }}>Trois-Rivières</div>
      </div>
    </div>,
    size,
  );
}

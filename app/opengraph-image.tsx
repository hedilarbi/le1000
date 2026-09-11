import { ImageResponse } from "next/og";

export const alt = "Le 1000 Resto Bar Relais à Trois-Rivières";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0D0E0E 0%,#25292D 58%,#AD6F23 100%)", color: "#F2EFE8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 980, padding: "72px 84px", border: "2px solid rgba(251,226,117,.55)", background: "rgba(13,14,14,.68)", textAlign: "center" }}>
        <div style={{ fontSize: 28, letterSpacing: 12, color: "#D1A647", textTransform: "uppercase" }}>Resto Bar Relais</div>
        <div style={{ marginTop: 16, fontSize: 150, fontWeight: 800, lineHeight: 1, color: "#FBE275" }}>LE 1000</div>
        <div style={{ marginTop: 24, fontSize: 34, letterSpacing: 5, textTransform: "uppercase" }}>Trois-Rivières</div>
      </div>
    </div>,
    size,
  );
}

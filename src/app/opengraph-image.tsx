import { ImageResponse } from "next/og";

export const alt = "JabitSoft software development company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f7f8fb",
          color: "#0c1428",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "72px 78px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#2463eb",
            borderRadius: 999,
            filter: "blur(2px)",
            height: 420,
            opacity: 0.12,
            position: "absolute",
            right: -100,
            top: -120,
            width: 420,
          }}
        />
        <div style={{ display: "flex", fontSize: 31, fontWeight: 700, letterSpacing: -1 }}>
          JABITSOFT
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ color: "#2463eb", display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: 4 }}>
            BUILD · SCALE · GROW
          </div>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, marginTop: 22 }}>
            Software engineered around your business.
          </div>
          <div style={{ color: "#526079", display: "flex", fontSize: 27, lineHeight: 1.4, marginTop: 26 }}>
            AI, cloud, mobile, ERP, websites and digital growth—built as one connected system.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

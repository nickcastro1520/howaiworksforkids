import { ImageResponse } from "next/og";

export const alt = "How AI Works for Kids — ages 6–10, seven free games, no ads, no accounts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f1e7",
          color: "#1c1630",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: "#3a2bb5" }} />
          <div style={{ width: 36, height: 36, borderRadius: 18, background: "#1d6b34" }} />
          <div style={{ width: 36, height: 36, borderRadius: 18, background: "#0c5f86" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            How AI works for kids
          </div>
          <div style={{ marginTop: 24, fontSize: 32 }}>
            Ages 6–10. Seven free games. No ads. No accounts. No live chatbot.
          </div>
        </div>
        <div style={{ fontSize: 28 }}>howaiworksforkids.com · Nick Castro, Chicago</div>
      </div>
    ),
    { ...size },
  );
}

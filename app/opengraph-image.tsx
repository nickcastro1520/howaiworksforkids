import { ImageResponse } from "next/og";
import { OgPip } from "@/lib/ogPip";

export const alt = "How AI Works for Kids: teach a tiny AI named Pip. 7 free games for ages 6–10. No ads, no accounts.";
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
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #2a2170 0%, #4b2fb8 60%, #6b4cf0 100%)",
          color: "#fff",
          padding: "60px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ display: "flex", gap: 14, fontSize: 28, fontWeight: 700, color: "#ffd34d" }}>
            Ages 6–10 · Free · No sign-up
          </div>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.02, marginTop: 22 }}>Teach a tiny AI.</div>
          <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.1, marginTop: 12, color: "#79f2da" }}>
            Find out how real AI works.
          </div>
          <div style={{ fontSize: 28, marginTop: 34, color: "#e4ddff" }}>howaiworksforkids.com</div>
        </div>
        <div style={{ display: "flex", width: 380, height: 450, alignItems: "center", justifyContent: "center", background: "#fff8ec", borderRadius: 48 }}>
          <OgPip size={300} />
        </div>
      </div>
    ),
    { ...size },
  );
}

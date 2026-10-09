import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LESSONS } from "@/lib/lessons";
import { OgPip } from "@/lib/ogPip";

export type OgCard = {
  kicker: string;
  title: string;
  sub: string;
  alt: string;
  accent: string;
  /** Lesson number to highlight in the 7-light strip. */
  light?: number;
};

const PAGES: Record<string, OgCard> = {
  home: {
    kicker: "Ages 6–10 · Free · No sign-up",
    title: "Teach a tiny AI.",
    sub: "Find out how real AI works.",
    alt: "How AI Works for Kids: teach a tiny AI named Pip. 7 free AI games for ages 6–10. No ads, no accounts.",
    accent: "#79f2da",
  },
  lessons: {
    kicker: "Free AI course for kids 6–10",
    title: "7 hands-on AI lessons",
    sub: "Story · Game · Quick check · Badge",
    alt: "The lesson trail: 7 free, hands-on AI lessons for kids, each with a story, a game, a quick check, and a badge.",
    accent: "#ffd34d",
  },
  glossary: {
    kicker: "Pip's Word Book",
    title: "AI words for kids",
    sub: "Big AI words, in small kid words.",
    alt: "Pip's Word Book: twelve AI words explained in kid-friendly language.",
    accent: "#79f2da",
  },
  parents: {
    kicker: "For parents & teachers",
    title: "Teach kids about AI",
    sub: "7 free lessons · No ads · No accounts",
    alt: "A guide for parents and teachers: how to use 7 free AI lessons for kids at home or in class.",
    accent: "#ffd34d",
  },
  about: {
    kicker: "About",
    title: "Made by Nick Castro",
    sub: "Explaining AI in plain words.",
    alt: "About Nick Castro, creator of How AI Works for Kids.",
    accent: "#79f2da",
  },
  "tested-by-kids": {
    kicker: "Tested by real kids",
    title: "Kid-tested lessons",
    sub: "Tested with Nathan and Nolan. Real words only.",
    alt: "Tested by real kids: Pip's lessons for ages 6 to 10 are tested with Nathan and Nolan.",
    accent: "#ffd34d",
  },
  privacy: {
    kicker: "Privacy",
    title: "No ads. No kid accounts.",
    sub: "Progress stays on your device.",
    alt: "Privacy at How AI Works for Kids: no ads, no accounts, no kid data collected.",
    accent: "#79f2da",
  },
  finish: {
    kicker: "Finish line",
    title: "Light up Pip's brain!",
    sub: "Finish 7 lessons. Print your certificate.",
    alt: "Finish all 7 lessons to light up Pip's brain and print a certificate.",
    accent: "#ffd34d",
  },
};

for (const l of LESSONS) {
  PAGES[l.slug] = {
    kicker: `Lesson ${l.number} of ${LESSONS.length} · about ${l.minutes} min`,
    title: l.title,
    sub: `Game: ${l.game}`,
    alt: `Lesson ${l.number}, ${l.title}: a free AI lesson for kids ages 6–10 with the game ${l.game}.`,
    accent: l.color,
    light: l.number,
  };
}

export const OG_KEYS = Object.keys(PAGES);
export const ogCard = (key: string): OgCard | undefined => PAGES[key];
export const ogAlt = (key: string) => PAGES[key]?.alt ?? "How AI Works for Kids";

export const OG_SIZE = { width: 1200, height: 630 };

async function fonts() {
  const dir = join(process.cwd(), "assets");
  const [display, body] = await Promise.all([readFile(join(dir, "fredoka-700.ttf")), readFile(join(dir, "nunito-800.ttf"))]);
  return [
    { name: "Fredoka", data: display, weight: 700 as const, style: "normal" as const },
    { name: "Nunito", data: body, weight: 800 as const, style: "normal" as const },
  ];
}

export async function renderOg(card: OgCard) {
  const isLesson = card.light !== undefined;
  const titleSize = card.title.length <= 16 ? 88 : card.title.length <= 34 ? 66 : 58;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(140deg, #1d1758 0%, #2a2170 45%, #4b2fb8 100%)",
          color: "#fff",
          fontFamily: "Nunito",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 420, height: 420, borderRadius: 999, background: card.accent, opacity: 0.22, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 56px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: "#e4ddff" }}>
            <div style={{ width: 18, height: 18, borderRadius: 999, background: "#ffd34d", display: "flex" }} />
            How AI Works for Kids
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: isLesson ? "#ffd34d" : card.accent, display: "flex" }}>{card.kicker}</div>
            <div style={{ fontFamily: "Fredoka", fontSize: titleSize, lineHeight: 1.04, marginTop: 14, display: "flex" }}>{card.title}</div>
            <div style={{ fontSize: 38, marginTop: 18, color: "#fff8ec", display: "flex" }}>{card.sub}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {LESSONS.map((l) => (
              <div
                key={l.slug}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: "4px solid #fff8ec",
                  background: !isLesson || l.number <= (card.light ?? 0) ? "#ffd34d" : "transparent",
                  display: "flex",
                }}
              />
            ))}
            <div style={{ fontSize: 26, marginLeft: 12, color: "#e4ddff", display: "flex" }}>howaiworksforkids.com</div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 56 }}>
          <div
            style={{
              display: "flex",
              width: 340,
              height: 420,
              alignItems: "center",
              justifyContent: "center",
              background: "#fff8ec",
              borderRadius: 48,
              border: `8px solid ${isLesson ? card.accent : "#231d4f"}`,
            }}
          >
            <OgPip size={260} />
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}

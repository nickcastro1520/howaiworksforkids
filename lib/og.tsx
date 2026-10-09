import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { GLOSSARY } from "@/lib/glossary";
import { LESSONS, SECTIONS, SECTION_1, SECTION_2, numberWord, positionInSection } from "@/lib/lessons";
import { OgPip } from "@/lib/ogPip";

export type OgCard = {
  kicker: string;
  title: string;
  sub: string;
  alt: string;
  accent: string;
  /** Lights to fill in the strip (lesson cards fill up to their place in their section). */
  light?: number;
  /** How many lights the strip has (defaults to the Section 1 count). */
  strip?: number;
};

const PAGES: Record<string, OgCard> = {
  home: {
    kicker: "Ages 6–10 · Free · No sign-up",
    title: "Teach a tiny AI.",
    sub: "Find out how real AI works.",
    alt: `How AI Works for Kids: teach a tiny AI named Pip. ${LESSONS.length} free AI games for ages 6–10. No ads, no accounts.`,
    accent: "#79f2da",
  },
  lessons: {
    kicker: "Free AI course for kids 6–10",
    title: `${LESSONS.length} hands-on AI lessons`,
    sub: "Story · Game · Quick check · Badge",
    alt: `The lesson trail: ${LESSONS.length} free, hands-on AI lessons for kids, each with a story, a game, a quick check, and a badge.`,
    accent: "#ffd34d",
  },
  "section-2": {
    kicker: `${SECTIONS[2].kicker} · Ages 6–10 · Free`,
    title: SECTIONS[2].name,
    sub: "Pictures · Prompts · Fairness · Build an AI",
    alt: `${SECTIONS[2].kicker}, ${SECTIONS[2].name}: ${SECTION_2.length} more free AI lessons for kids ages 6–10, a final quiz, and a certificate.`,
    accent: "#79f2da",
    strip: SECTIONS[2].planned,
  },
  glossary: {
    kicker: "Pip's Word Book",
    title: "AI words for kids",
    sub: "Big AI words, in small kid words.",
    alt: `Pip's Word Book: ${numberWord(GLOSSARY.length)} AI words explained in kid-friendly language.`,
    accent: "#79f2da",
  },
  parents: {
    kicker: "For parents & teachers",
    title: "Teach kids about AI",
    sub: `${LESSONS.length} free lessons · No ads · No accounts`,
    alt: `A guide for parents and teachers: how to use ${LESSONS.length} free AI lessons for kids at home or in class.`,
    accent: "#ffd34d",
  },
  teachers: {
    kicker: "For teachers & homeschool",
    title: "Free AI lesson kit",
    sub: "Guide · Card sort · Worksheets · Parent letter",
    alt: "A free print-and-go teacher kit for Lesson 1, Meet Pip: What is AI? For teachers, homeschool parents, and club leaders.",
    accent: "#79f2da",
    light: 1,
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
  quiz: {
    kicker: "Final quiz · Ages 6–10 · Free",
    title: "How much do you know?",
    sub: "10 questions · No timer · Retakes OK",
    alt: "The How AI Works for Kids final quiz: 10 picture questions about AI across both sections, with the right answer shown after each.",
    accent: "#ffd34d",
    light: 10,
    strip: 10,
  },
  "finish-2": {
    kicker: "Section 2 finish line",
    title: "Pip grew up!",
    sub: `Finish ${SECTION_2.length} lessons + the quiz. Print your certificate.`,
    alt: `Finish all ${SECTION_2.length} Section 2 lessons and the final quiz to print a Section 2 certificate.`,
    accent: "#ffd34d",
    strip: SECTIONS[2].planned,
    light: SECTIONS[2].planned,
  },
  finish: {
    kicker: "Finish line",
    title: "Light up Pip's brain!",
    sub: `Finish ${SECTION_1.length} lessons. Print your certificate.`,
    alt: `Finish all ${SECTION_1.length} Section 1 lessons to light up Pip's brain and print a certificate.`,
    accent: "#ffd34d",
  },
};

for (const l of LESSONS) {
  PAGES[l.slug] = {
    kicker: `${l.section === 1 ? `Lesson ${l.number} of ${SECTION_1.length}` : `${SECTIONS[2].kicker} · Lesson ${l.number}`} · about ${l.minutes} min`,
    title: l.title,
    sub: `Game: ${l.game}`,
    alt: `Lesson ${l.number}, ${l.title}: a free AI lesson for kids ages 6–10 with the game ${l.game}.`,
    accent: l.color,
    light: positionInSection(l),
    strip: SECTIONS[l.section].planned,
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
            {Array.from({ length: card.strip ?? SECTION_1.length }, (_, k) => k + 1).map((n) => (
              <div
                key={n}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: "4px solid #fff8ec",
                  background: !isLesson || n <= (card.light ?? 0) ? "#ffd34d" : "transparent",
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

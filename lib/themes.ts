import type { ThemeId } from "@/lib/types";

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  short: string;
  blurb: string;
  hero: { kids: string; tweens: string };
};

export const THEMES: ThemeMeta[] = [
  {
    id: "space",
    name: "Rockets & space",
    short: "Space",
    blurb: "Rockets, moons, and star maps. No brand logos — just the fun of launch day.",
    hero: {
      kids: "Today’s world is rockets and moons. The ideas stay the same if you switch.",
      tweens: "Space is the costume. Patterns, feedback, context, and safety are the real lessons.",
    },
  },
  {
    id: "dinosaurs",
    name: "Dinosaurs",
    short: "Dinos",
    blurb: "Fossils, roaring pictures, and museum halls. Playful dinos, not a movie brand.",
    hero: {
      kids: "Today’s world is dinosaurs and fossils. You can swap worlds any time.",
      tweens: "Dinosaurs are the examples. The lessons underneath do not change.",
    },
  },
  {
    id: "ebikes",
    name: "E-bikes",
    short: "E-bikes",
    blurb: "Helmets, hills, and helper motors. Everyday bikes — not a brand ad.",
    hero: {
      kids: "Today’s world is e-bikes and trails. Same lessons, new pictures.",
      tweens: "E-bikes keep the examples close to real life. The mechanics of each lesson stay the same.",
    },
  },
];

export function getTheme(id: ThemeId): ThemeMeta {
  const theme = THEMES.find((item) => item.id === id);
  if (!theme) throw new Error(`Unknown theme ${id}`);
  return theme;
}

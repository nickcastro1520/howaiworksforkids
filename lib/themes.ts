import type { ThemeId } from "@/lib/types";

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  short: string;
  blurb: string;
  hero: string;
};

export const THEMES: ThemeMeta[] = [
  {
    id: "space",
    name: "Rockets & space",
    short: "Space",
    blurb: "A steel ship settling down on a tail of fire.",
    hero: "Today’s world is rockets and moons. The ideas stay the same if you switch.",
  },
  {
    id: "dinosaurs",
    name: "Dinosaurs",
    short: "Dinos",
    blurb: "A roaring T. rex, mid-stride.",
    hero: "Today’s world is dinosaurs and fossils. You can swap worlds any time.",
  },
  {
    id: "ebikes",
    name: "E-bikes",
    short: "E-bikes",
    blurb: "A helmeted rider popping a wheelie on a dirt e-bike.",
    hero: "Today’s world is e-bikes and trails. Same lessons, new pictures.",
  },
];

export function getTheme(id: ThemeId): ThemeMeta {
  const theme = THEMES.find((item) => item.id === id);
  if (!theme) throw new Error(`Unknown theme ${id}`);
  return theme;
}

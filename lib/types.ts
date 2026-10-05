export const THEME_IDS = ["space", "dinosaurs", "ebikes"] as const;
export const AGE_IDS = ["kids", "tweens"] as const;

export type ThemeId = (typeof THEME_IDS)[number];
export type AgeId = (typeof AGE_IDS)[number];

export type AgeCopy = {
  kids: string;
  tweens: string;
};

export type Grownup = {
  /** Short label on the chip. Hidden from the kids reading level. */
  chip: string;
  note: string;
};

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && THEME_IDS.includes(value as ThemeId);
}

export function isAgeId(value: unknown): value is AgeId {
  return typeof value === "string" && AGE_IDS.includes(value as AgeId);
}

export function pickAge(age: AgeId, copy: AgeCopy): string {
  return copy[age];
}

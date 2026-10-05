import { PREFS_KEY } from "@/lib/site";
import {
  type AgeId,
  type ThemeId,
  isAgeId,
  isThemeId,
} from "@/lib/types";
import { LESSONS } from "@/lib/lessons";

export type Prefs = {
  theme: ThemeId;
  age: AgeId;
  completed: string[];
};

export const DEFAULT_PREFS: Prefs = {
  theme: "space",
  age: "kids",
  completed: [],
};

const LESSON_SLUGS = new Set(LESSONS.map((lesson) => lesson.slug));

export function readPrefs(): Prefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    if (!isThemeId(parsed.theme) || !isAgeId(parsed.age)) return null;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter(
          (slug): slug is string =>
            typeof slug === "string" && LESSON_SLUGS.has(slug),
        )
      : [];
    return { theme: parsed.theme, age: parsed.age, completed };
  } catch {
    return null;
  }
}

export function writePrefs(prefs: Prefs): void {
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function applyPrefsToDocument(prefs: Pick<Prefs, "theme" | "age">): void {
  const root = document.documentElement;
  root.dataset.theme = prefs.theme;
  root.dataset.age = prefs.age;
  delete root.dataset.needsWelcome;
}

export const PREFS_BOOT_SCRIPT = `(function(){try{var r=localStorage.getItem(${JSON.stringify(PREFS_KEY)});var p=r?JSON.parse(r):null;var themes={space:1,dinosaurs:1,ebikes:1};var ages={kids:1,tweens:1};if(p&&themes[p.theme]&&ages[p.age]){document.documentElement.dataset.theme=p.theme;document.documentElement.dataset.age=p.age;}else{document.documentElement.dataset.needsWelcome="yes";}}catch(e){document.documentElement.dataset.needsWelcome="yes";}})();`;

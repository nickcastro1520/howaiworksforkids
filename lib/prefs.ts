import { PREFS_KEY } from "@/lib/site";
import { type ThemeId, isThemeId } from "@/lib/types";
import { LESSONS } from "@/lib/lessons";

export type Prefs = {
  theme: ThemeId;
  completed: string[];
};

export const DEFAULT_PREFS: Prefs = {
  theme: "space",
  completed: [],
};

const LESSON_SLUGS = new Set(LESSONS.map((lesson) => lesson.slug));

export function readPrefs(): Prefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    if (!isThemeId(parsed.theme)) return null;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter(
          (slug): slug is string =>
            typeof slug === "string" && LESSON_SLUGS.has(slug),
        )
      : [];
    return { theme: parsed.theme, completed };
  } catch {
    return null;
  }
}

export function writePrefs(prefs: Prefs): void {
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function applyPrefsToDocument(prefs: Pick<Prefs, "theme">): void {
  const root = document.documentElement;
  root.dataset.theme = prefs.theme;
  delete root.dataset.age;
  delete root.dataset.needsWelcome;
}

export const PREFS_BOOT_SCRIPT = `(function(){try{var r=localStorage.getItem(${JSON.stringify(PREFS_KEY)});var p=r?JSON.parse(r):null;var themes={space:1,dinosaurs:1,ebikes:1};if(p&&themes[p.theme]){document.documentElement.dataset.theme=p.theme;delete document.documentElement.dataset.age;}else{document.documentElement.dataset.needsWelcome="yes";}}catch(e){document.documentElement.dataset.needsWelcome="yes";}})();`;

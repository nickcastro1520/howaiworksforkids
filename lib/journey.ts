import { LESSONS, SECTION_1, SECTION_2, type Lesson } from "./lessons";

/**
 * Where should a kid go next? Pure functions over the list of finished lesson slugs
 * (from localStorage) and whether the final quiz was taken on this device.
 */
export type NextStep =
  | { kind: "start"; lesson: Lesson; href: string }
  | { kind: "lesson"; lesson: Lesson; href: string }
  | { kind: "quiz"; href: "/quiz" }
  | { kind: "certificate"; href: "/finish/section-2" };

const lessonHref = (l: Lesson) => `/lessons/${l.slug}`;

/** The first unfinished lesson after `from` (in course order), wrapping around to the first unfinished one. */
export function nextUnfinished(done: readonly string[], from?: Lesson): Lesson | undefined {
  const start = from ? LESSONS.findIndex((l) => l.slug === from.slug) + 1 : 0;
  const after = LESSONS.slice(start).find((l) => !done.includes(l.slug));
  return after ?? LESSONS.find((l) => !done.includes(l.slug));
}

/** The one thing a kid should tap next: start Lesson 1, keep going, take the quiz, or get the certificate. */
export function nextStep(done: readonly string[], quizTaken: boolean): NextStep {
  const known = done.filter((s) => LESSONS.some((l) => l.slug === s));
  if (known.length === 0) return { kind: "start", lesson: LESSONS[0], href: lessonHref(LESSONS[0]) };
  // Continue after the furthest lesson they finished, so a kid who jumped ahead isn't sent back to the start.
  const furthest = LESSONS.filter((l) => known.includes(l.slug)).at(-1);
  const next = nextUnfinished(known, furthest);
  if (next) return { kind: "lesson", lesson: next, href: lessonHref(next) };
  return quizTaken ? { kind: "certificate", href: "/finish/section-2" } : { kind: "quiz", href: "/quiz" };
}

export function sectionDone(done: readonly string[], section: 1 | 2): boolean {
  return (section === 1 ? SECTION_1 : SECTION_2).every((l) => done.includes(l.slug));
}

export function countDone(done: readonly string[]): number {
  return LESSONS.filter((l) => done.includes(l.slug)).length;
}

export type AfterBadge = {
  /** The next lesson to play, if any is left. */
  next?: Lesson;
  /** Set when this badge finished a whole section. */
  sectionEnd?: { section: 1 | 2; href: string; label: string };
};

/** What the badge screen should offer after finishing `lesson`. */
export function afterBadge(lesson: Lesson, done: readonly string[], quizTaken: boolean): AfterBadge {
  const next = nextUnfinished(done, lesson);
  const s = lesson.section;
  if (!sectionDone(done, s)) return { next };
  if (s === 1) return { next, sectionEnd: { section: 1, href: "/finish", label: "Get your Section 1 certificate" } };
  return {
    next,
    sectionEnd: quizTaken
      ? { section: 2, href: "/finish/section-2", label: "Get your Section 2 certificate" }
      : { section: 2, href: "/quiz", label: "Take the final quiz" },
  };
}

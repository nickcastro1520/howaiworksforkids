import { test } from "node:test";
import assert from "node:assert/strict";
import { afterBadge, countDone, nextStep } from "./journey";
import { LESSONS, SECTION_1, SECTION_2 } from "./lessons";

const slugs = (ls: { slug: string }[]) => ls.map((l) => l.slug);

test("a new kid starts at Lesson 1", () => {
  const s = nextStep([], false);
  assert.equal(s.kind, "start");
  assert.equal(s.kind === "start" && s.lesson.number, 1);
});

test("a returning kid keeps going after the furthest finished lesson", () => {
  const s = nextStep(slugs(LESSONS.slice(0, 3)), false);
  assert.equal(s.kind === "lesson" && s.lesson.number, 4);
  // jumped to lesson 9 without the rest: continue at 10, not back at 1
  const j = nextStep([LESSONS[8].slug], false);
  assert.equal(j.kind === "lesson" && j.lesson.number, 10);
  // finished the last lesson but skipped some: wrap to the first gap
  const w = nextStep([LESSONS[14].slug, LESSONS[0].slug], false);
  assert.equal(w.kind === "lesson" && w.lesson.number, 2);
  // unknown slugs are ignored
  assert.equal(nextStep(["nope"], false).kind, "start");
});

test("everything done: quiz, then certificate", () => {
  assert.equal(nextStep(slugs(LESSONS), false).kind, "quiz");
  assert.equal(nextStep(slugs(LESSONS), true).kind, "certificate");
  assert.equal(countDone(slugs(LESSONS)), 15);
});

test("badge screens never dead-end", () => {
  for (let k = 0; k < LESSONS.length; k++) {
    for (const quiz of [false, true]) {
      const done = slugs(LESSONS.slice(0, k + 1));
      const a = afterBadge(LESSONS[k], done, quiz);
      assert.ok(a.next || a.sectionEnd, `lesson ${k + 1} has somewhere to go`);
    }
  }
  const end1 = afterBadge(SECTION_1.at(-1)!, slugs(SECTION_1), false);
  assert.equal(end1.sectionEnd?.href, "/finish");
  assert.equal(end1.next?.number, 8, "after Section 1, Lesson 8 is offered");
  const end2 = afterBadge(SECTION_2.at(-1)!, slugs(LESSONS), false);
  assert.equal(end2.sectionEnd?.href, "/quiz");
  assert.equal(end2.next, undefined);
  assert.equal(afterBadge(SECTION_2.at(-1)!, slugs(LESSONS), true).sectionEnd?.href, "/finish/section-2");
  // Section 2 done but Section 1 not: quiz offered, plus the missing Section 1 lesson
  const mixed = afterBadge(SECTION_2.at(-1)!, slugs(SECTION_2), false);
  assert.equal(mixed.sectionEnd?.href, "/quiz");
  assert.equal(mixed.next?.number, 1);
});

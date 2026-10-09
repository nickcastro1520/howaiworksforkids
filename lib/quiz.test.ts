import { test } from "node:test";
import assert from "node:assert/strict";
import { FINAL_QUIZ, FINAL_QUIZ_SHOWN, QUIZ_TOTAL, grownupNote } from "./quiz";
import { LESSONS } from "./lessons";

test("10 questions, unique concept IDs, valid lessons", () => {
  assert.equal(QUIZ_TOTAL, 10);
  assert.equal(new Set(FINAL_QUIZ.map((q) => q.concept)).size, 10);
  for (const q of FINAL_QUIZ) {
    assert.equal(q.options.length, q.icons.length);
    for (const n of q.lessons) assert.ok(LESSONS.some((l) => l.number === n), `lesson ${n}`);
  }
  // Both sections are covered.
  const secs = new Set(FINAL_QUIZ.flatMap((q) => q.lessons.map((n) => LESSONS.find((l) => l.number === n)!.section)));
  assert.deepEqual([...secs].sort(), [1, 2]);
});

test("shown order keeps the right answer and spreads its position", () => {
  FINAL_QUIZ_SHOWN.forEach((s, i) => {
    assert.equal(s.options[s.answer], FINAL_QUIZ[i].options[FINAL_QUIZ[i].answer]);
    assert.equal(s.icons[s.answer], FINAL_QUIZ[i].icons[FINAL_QUIZ[i].answer]);
  });
  const pos = new Set(FINAL_QUIZ_SHOWN.map((s) => s.answer));
  assert.equal(pos.size, 3);
});

test("grown-up note stays short even with every question missed, and has no name", () => {
  const all = grownupNote({
    finished: "I finished Section 2 of How AI Works for Kids: all 8 lessons and the final quiz!",
    quiz: { score: 0, missed: FINAL_QUIZ.map((q) => q.concept) },
  });
  assert.ok(all.length < 1500, `length ${all.length}`);
  console.log("worst-case note length:", all.length, "encoded:", encodeURIComponent(all).length);
  const some = grownupNote({ finished: "Done!", quiz: { score: 8, missed: ["clear-prompts", "fairness"] } });
  assert.match(some, /Final quiz: 8\/10\./);
  assert.match(some, /Ideas to talk about: Clear instructions \(Lesson 10\), Fairness \(Lesson 13\)\./);
});

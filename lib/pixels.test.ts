import assert from "node:assert/strict";
import { test } from "node:test";
import { DRAW_IDS, GRID, PIC_IDS, STARTER_EXAMPLES, exampleToDrawing, guessDrawing, peekScores, revealOrder, rowsToDrawing } from "./pixels";

test("reveal order is a full, deterministic shuffle", () => {
  const a = revealOrder(7);
  assert.equal(a.length, GRID * GRID);
  assert.equal(new Set(a).size, GRID * GRID);
  assert.deepEqual(a, revealOrder(7));
});

test("peek scores add up to 100 and grow more sure with more pixels", () => {
  for (const pic of PIC_IDS) {
    const order = revealOrder(3);
    const few = peekScores(pic, order.slice(0, 4));
    const many = peekScores(pic, order.slice(0, 60));
    for (const s of [few, many]) assert.ok(Math.abs(PIC_IDS.reduce((t, id) => t + s[id], 0) - 100) <= 2);
    assert.ok(many[pic] >= few[pic], `${pic}: ${few[pic]} -> ${many[pic]}`);
    assert.ok(many[pic] > 80, `${pic} should be clear with 60 pixels`);
  }
});

test("drawing guesser gets most starter drawings right (leave one out)", () => {
  let right = 0;
  STARTER_EXAMPLES.forEach((ex, i) => {
    const rest = STARTER_EXAMPLES.filter((_, j) => j !== i);
    if (guessDrawing(exampleToDrawing(ex), rest)?.label === ex.label) right++;
  });
  assert.ok(right >= 6, `only ${right}/9`);
});

test("a kid-style fish drawing is guessed as a fish", () => {
  const fish = rowsToDrawing(["........", "..####..", ".######.", "#######.", ".######.", "..####..", "........", "........"]);
  assert.equal(guessDrawing(fish)?.label, "fish");
  assert.ok(DRAW_IDS.includes(guessDrawing(fish)!.label as (typeof DRAW_IDS)[number]));
});

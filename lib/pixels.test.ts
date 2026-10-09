import assert from "node:assert/strict";
import { test } from "node:test";
import { DRAW, GRID, PIC_IDS, STARTER_EXAMPLES, drawingExample, exampleToDrawing, guessDrawing, peekScores, revealOrder, rowsToDrawing, type DrawId } from "./pixels";

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

test("drawings are 6x6 so every square is a big tap target", () => {
  assert.equal(DRAW, 6);
  for (const ex of STARTER_EXAMPLES) assert.equal(exampleToDrawing(ex).length, DRAW * DRAW);
});

test("drawing guesser gets most starter drawings right (leave one out)", () => {
  let right = 0;
  STARTER_EXAMPLES.forEach((ex, i) => {
    const rest = STARTER_EXAMPLES.filter((_, j) => j !== i);
    if (guessDrawing(exampleToDrawing(ex), rest)?.label === ex.label) right++;
  });
  assert.ok(right >= 7, `only ${right}/9`);
});

test("kid-style drawings are guessed right", () => {
  // prettier-ignore
  const kid: [DrawId, string[]][] = [
    ["fish", ["......", ".###..", "#####.", "######", "#####.", ".###.."]],
    ["fish", ["......", "#.###.", "#####.", "#.###.", "......", "......"]],
    ["fish", ["......", "......", "#.####", "######", "#.####", "......"]],
    ["cat", ["#..#..", "####..", "#..#..", "####..", "......", "......"]],
    ["cat", ["#....#", "######", "#.##.#", "######", ".####.", "......"]],
    ["house", ["..#...", ".###..", "#####.", "#...#.", "#.#.#.", "#####."]],
    ["house", ["..##..", ".####.", "######", "#....#", "#.##.#", "######"]],
  ];
  for (const [label, rows] of kid) assert.equal(guessDrawing(rowsToDrawing(rows))?.label, label, rows.join("/"));
});

test("teaching Pip a new example changes its guess right away", () => {
  const odd = rowsToDrawing(["######", "######", "......", "......", "......", "......"]);
  const before = guessDrawing(odd)!.label;
  const target: DrawId = before === "fish" ? "cat" : "fish";
  const taught = [...STARTER_EXAMPLES, drawingExample(odd, target)];
  assert.equal(guessDrawing(odd, taught)?.label, target);
});

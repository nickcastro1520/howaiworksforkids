import assert from "node:assert/strict";
import { test } from "node:test";
import { isNewBest, NEXT_WORD, nextWordRound, SORT_PER_SET, SORT_SETS, shuffle, sortQueue } from "./bonus";

test("every sort item belongs to one of its set's bins", () => {
  for (const s of SORT_SETS) for (const it of s.items) assert.ok(s.bins.some((b) => b.id === it.bin), it.name);
});

test("sort queue cycles bin sets in blocks", () => {
  const q = sortQueue(42, 3);
  assert.equal(q.length, SORT_PER_SET * 3);
  assert.deepEqual([...new Set(q.map((x) => x.set))], [0, 1, 2]);
  assert.equal(new Set(q.slice(0, SORT_PER_SET).map((x) => x.item.name)).size, SORT_PER_SET);
});

test("shuffle is a permutation and repeatable", () => {
  const a = [1, 2, 3, 4, 5, 6];
  assert.deepEqual([...shuffle(a, 9)].sort(), a);
  assert.deepEqual(shuffle(a, 9), shuffle(a, 9));
});

test("next-word round keeps answers and explanations lined up", () => {
  for (const seed of [1, 2, 3, 50]) {
    for (const q of nextWordRound(seed)) {
      const src = NEXT_WORD.find((x) => x.sentence === q.sentence)!;
      assert.equal(q.options[q.answer], src.options[src.answer]);
      for (let i = 0; i < 3; i++) assert.equal(q.why[i], src.why[src.options.indexOf(q.options[i])]);
    }
  }
});

test("new best only for a real improvement", () => {
  assert.equal(isNewBest(0, null), false);
  assert.equal(isNewBest(3, null), true);
  assert.equal(isNewBest(3, 3), false);
  assert.equal(isNewBest(4, 3), true);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { START_BOX, TRAY, TRYOUTS, fairMeter, isFair, pipPicks } from "./fair";

const byId = (id: string) => TRAY.find((t) => t.id === id)!;

test("with only round examples, Pip leaves out every square and spiky Glorb", () => {
  for (const t of TRYOUTS) assert.equal(pipPicks(START_BOX, t), t.shape === "round", t.id);
  assert.equal(isFair(START_BOX), false);
});

test("adding more round examples does not help", () => {
  assert.deepEqual(fairMeter([...START_BOX, byId("x3")]), fairMeter(START_BOX));
});

test("one square example is not enough; two different ones are", () => {
  const one = fairMeter([...START_BOX, byId("x1")]).find((m) => m.shape === "square")!;
  assert.equal(one.picked, 1);
  const two = fairMeter([...START_BOX, byId("x1"), byId("x4")]).find((m) => m.shape === "square")!;
  assert.equal(two.picked, 2);
});

test("examples of every kind make the team fair", () => {
  assert.equal(isFair([...START_BOX, ...TRAY]), true);
  assert.equal(isFair([...START_BOX, byId("x1"), byId("x2"), byId("x4"), byId("x5")]), true);
});

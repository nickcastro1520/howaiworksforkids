import { test } from "node:test";
import assert from "node:assert/strict";
import { knnGuess, featureWeights, trainStump, buildBigrams, nextWords, STORY_CORPUS, type Example, type Critter } from "./ml.ts";

type F = "color" | "eyes" | "spots";
const keys: F[] = ["color", "eyes", "spots"];
const all: Record<F, string>[] = [];
for (const color of ["orange", "teal"]) for (const eyes of ["one", "two", "three"]) for (const spots of ["yes", "no"]) all.push({ color, eyes, spots });

test("nearest-neighbor learns a color rule from a few examples", () => {
  const rule = (g: Record<F, string>) => (g.color === "orange" ? "star" : "cloud");
  const data: Example<F>[] = [all[0], all[7], all[3], all[10]].map((f) => ({ features: f, label: rule(f) }));
  const w = featureWeights(data, keys);
  assert.ok(w.color > w.eyes && w.color > w.spots);
  for (const g of all) assert.equal(knnGuess(data, keys, g)?.label, rule(g));
});

test("knnGuess returns null with no examples", () => {
  assert.equal(knnGuess([], keys, all[0]), null);
});

test("decision stump picks color from lopsided examples, then shape after better ones", () => {
  const lopsided: Critter[] = [
    { shape: "fish", color: "blue" }, { shape: "fish", color: "blue" },
    { shape: "bird", color: "red" }, { shape: "bird", color: "red" },
  ];
  const a = trainStump(lopsided);
  assert.equal(a.clue, "color");
  assert.equal(a.predict({ shape: "fish", color: "red" }), "bird");
  const b = trainStump([...lopsided, { shape: "fish", color: "red" }, { shape: "bird", color: "blue" }]);
  assert.equal(b.clue, "shape");
  assert.equal(b.predict({ shape: "fish", color: "red" }), "fish");
});

test("next-word model uses the last two words when it has seen them", () => {
  const counts = buildBigrams(STORY_CORPUS);
  assert.equal(nextWords(counts, ["once", "upon"])[0].word, "a");
  const guesses = nextWords(counts, ["loved", "to"]);
  assert.ok(guesses.length > 0);
  assert.ok(guesses.every((g) => g.chance > 0 && g.chance <= 100));
});

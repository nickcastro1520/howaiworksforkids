/**
 * Tiny, real machine-learning pieces that run in the browser.
 * No network, no data leaves the page.
 */

/* ---------- 1. Weighted nearest-neighbor classifier (Sort the Glorbs) ---------- */

export type Example<F extends string> = { features: Record<F, string>; label: string };

/**
 * How useful is each feature for telling the labels apart?
 * 0 = no help at all, 1 = splits the teams perfectly.
 */
export function featureWeights<F extends string>(data: Example<F>[], keys: F[]): Record<F, number> {
  const out = {} as Record<F, number>;
  const labels = [...new Set(data.map((d) => d.label))];
  const majority = (rows: Example<F>[]) =>
    rows.length === 0 ? 0 : Math.max(...labels.map((l) => rows.filter((r) => r.label === l).length)) / rows.length;
  const base = majority(data);
  for (const k of keys) {
    if (data.length === 0 || base === 1) {
      out[k] = 0;
      continue;
    }
    const values = [...new Set(data.map((d) => d.features[k]))];
    let purity = 0;
    for (const v of values) {
      const rows = data.filter((d) => d.features[k] === v);
      purity += (rows.length / data.length) * majority(rows);
    }
    out[k] = Math.max(0, Math.min(1, (purity - base) / (1 - base)));
  }
  return out;
}

export type Guess<F extends string> = {
  label: string;
  confidence: number;
  neighbors: Example<F>[];
  weights: Record<F, number>;
};

export function knnGuess<F extends string>(data: Example<F>[], keys: F[], item: Record<F, string>, k = 3): Guess<F> | null {
  if (data.length === 0) return null;
  const weights = featureWeights(data, keys);
  const total = keys.reduce((s, key) => s + weights[key], 0);
  const w = (key: F) => (total < 0.05 ? 1 : weights[key] + 0.02);
  const scored = data
    .map((d, i) => ({
      d,
      i,
      dist: keys.reduce((s, key) => s + (d.features[key] === item[key] ? 0 : w(key)), 0),
    }))
    .sort((a, b) => a.dist - b.dist || b.i - a.i);
  const near = scored.slice(0, Math.min(k, scored.length));
  const votes: Record<string, number> = {};
  near.forEach((n, rank) => {
    votes[n.d.label] = (votes[n.d.label] ?? 0) + 1 + (near.length - rank) * 0.01;
  });
  const [label, v] = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  return { label, confidence: Math.floor(v) / near.length, neighbors: near.map((n) => n.d), weights };
}

/* ---------- 2. Decision stump: pick the ONE clue that best fits the examples (Fix Pip's Mix-up) ---------- */

export type Clue = "color" | "shape";
export type Critter = { shape: "fish" | "bird"; color: "red" | "blue" | "yellow" };

export function trainStump(data: Critter[]) {
  const clues: Clue[] = ["color", "shape"]; // color first: it's the easiest thing to see
  const label = (c: Critter) => c.shape;
  const overall = data.filter((d) => d.shape === "fish").length >= data.length / 2 ? "fish" : "bird";
  const results = clues.map((clue) => {
    const map: Record<string, "fish" | "bird"> = {};
    const values = [...new Set(data.map((d) => d[clue]))];
    for (const v of values) {
      const rows = data.filter((d) => d[clue] === v);
      const fish = rows.filter((r) => label(r) === "fish").length;
      map[v] = fish >= rows.length - fish ? "fish" : "bird";
    }
    const correct = data.filter((d) => map[d[clue]] === label(d)).length;
    return { clue, map, accuracy: data.length ? correct / data.length : 0 };
  });
  const best = results.reduce((a, b) => (b.accuracy > a.accuracy ? b : a));
  return {
    clue: best.clue,
    scores: results,
    predict: (c: Critter): "fish" | "bird" => best.map[c[best.clue]] ?? overall,
  };
}

/* ---------- 3. Next-word model: count which word follows which (Story Builder) ---------- */

export const STORY_CORPUS = `
once upon a time there was a little dragon .
once upon a time a tiny robot lived in a big red box .
once upon a time the cat found a magic hat .
the little dragon loved to eat pancakes .
the tiny robot loved to dance in the rain .
the cat loved to sleep in the sun .
one day the dragon met a tiny robot .
one day the robot found a magic pancake .
the robot and the dragon went to the park .
the cat and the dragon went to the moon .
at the park they ate pancakes and played tag .
on the moon they found a big blue cat .
then they went home and went to sleep .
the magic hat made the cat fly .
the dragon was so happy .
the robot was so silly .
`;

/** Count which word follows the last ONE word, and the last TWO words. */
export function buildBigrams(corpus: string) {
  const counts: Record<string, Record<string, number>> = {};
  const bump = (key: string, next: string) => {
    counts[key] ??= {};
    counts[key][next] = (counts[key][next] ?? 0) + 1;
  };
  for (const line of corpus.trim().split("\n")) {
    const words = line.trim().split(/\s+/);
    for (let i = 0; i < words.length - 1; i++) {
      bump(words[i], words[i + 1]);
      if (i > 0) bump(`${words[i - 1]} ${words[i]}`, words[i + 1]);
    }
  }
  return counts;
}

/** Look at the last two words if we've seen them together; otherwise just the last word. */
export function nextWords(counts: Record<string, Record<string, number>>, words: string[], n = 3) {
  const last = words[words.length - 1];
  const pair = words.length > 1 ? `${words[words.length - 2]} ${last}` : "";
  const row = (pair && counts[pair]) || counts[last] || counts["the"];
  const total = Object.values(row).reduce((a, b) => a + b, 0);
  return Object.entries(row)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([w, c]) => ({ word: w, chance: Math.round((c / total) * 100) }));
}

/**
 * Pixel art + tiny "vision" helpers for Lesson 8 (Pixel Peek). Everything runs in the page.
 */
import { knnGuess, type Example } from "./ml";

/* ---------- Part 1: 12x12 hidden pictures ---------- */

export const PALETTE: Record<string, string> = {
  ".": "#fdf6e8",
  r: "#e2483d",
  g: "#3faa4f",
  n: "#8a5a2b",
  b: "#3f86e0",
  k: "#231d4f",
  w: "#ffffff",
  y: "#ffd34d",
  o: "#f28c28",
  s: "#9fd8f5",
};

export type PicId = "apple" | "fish" | "house" | "cat";

export const PIC_LABEL: Record<PicId, { name: string; emoji: string }> = {
  apple: { name: "Apple", emoji: "🍎" },
  fish: { name: "Fish", emoji: "🐟" },
  house: { name: "House", emoji: "🏠" },
  cat: { name: "Cat", emoji: "🐱" },
};

export const PIC_IDS: PicId[] = ["apple", "fish", "house", "cat"];

// prettier-ignore
export const PICTURES: Record<PicId, string[]> = {
  apple: [
    "............",
    "......n.....",
    ".....ngg....",
    "...rrnrrr...",
    "..rrrrrrrr..",
    ".rrrrrrrwrr.",
    ".rrrrrrrrwr.",
    ".rrrrrrrrrr.",
    ".rrrrrrrrrr.",
    "..rrrrrrrr..",
    "...rrrrrr...",
    "....rr.rr...",
  ],
  fish: [
    "............",
    "............",
    "......bb....",
    "....bbbbb...",
    ".b.bbbbbbb..",
    ".bbbbbbbwkb.",
    ".bbbbbbbbbb.",
    ".b.bbbbbbb..",
    "....bbbbb...",
    "......bb....",
    "............",
    "............",
  ],
  house: [
    "............",
    ".....rr.....",
    "....rrrr....",
    "...rrrrrr...",
    "..rrrrrrrr..",
    ".rrrrrrrrrr.",
    "..yyyyyyyy..",
    "..ynnyykky..",
    "..ynnyykky..",
    "..ynnyyyyy..",
    "..ynnyyyyy..",
    "gggggggggggg",
  ],
  cat: [
    "............",
    "..o......o..",
    "..oo....oo..",
    "..oooooooo..",
    ".oooooooooo.",
    ".ookoooookoo".slice(0, 12),
    ".oooooooooo.",
    ".ooookkoooo.",
    ".oooowwoooo.",
    "..oooooooo..",
    "...oooooo...",
    "............",
  ],
};

export const GRID = 12;

/** A fixed, shuffled reveal order (same on server and client), different for each picture. */
export function revealOrder(seed: number): number[] {
  const order = Array.from({ length: GRID * GRID }, (_, i) => i);
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function pixelAt(pic: PicId, i: number): string {
  return PICTURES[pic][Math.floor(i / GRID)][i % GRID];
}

/**
 * Pip's guess bars. Pip "remembers" one example of each picture and checks how many of the
 * pixels it can see match each one. Few pixels = unsure; more pixels = sure.
 * Returns percentages that add up to 100.
 */
export function peekScores(target: PicId, shown: number[]): Record<PicId, number> {
  const raw = {} as Record<PicId, number>;
  for (const id of PIC_IDS) {
    if (shown.length === 0) {
      raw[id] = 1;
      continue;
    }
    // Every pixel that doesn't fit this picture makes Pip a bit less sure of it.
    const misses = shown.filter((i) => pixelAt(id, i) !== pixelAt(target, i)).length;
    raw[id] = Math.pow(0.82, misses);
  }
  const total = PIC_IDS.reduce((s, id) => s + raw[id], 0);
  const out = {} as Record<PicId, number>;
  let left = 100;
  PIC_IDS.forEach((id, k) => {
    const v = k === PIC_IDS.length - 1 ? left : Math.round((raw[id] / total) * 100);
    out[id] = Math.max(0, v);
    left -= v;
  });
  return out;
}

/* ---------- Part 2: 6x6 drawings Pip learned from (nearest neighbor, lib/ml.ts) ---------- */
/* 6x6 so every square is a big, easy tap target (about 55px on a 375px phone). */

export type DrawId = "cat" | "fish" | "house";
export const DRAW_IDS: DrawId[] = ["cat", "fish", "house"];
export const DRAW = 6;

// prettier-ignore
const DRAWINGS: { label: DrawId; rows: string[] }[] = [
  { label: "cat", rows: ["#....#", "##..##", "######", "#.##.#", "######", ".####."] },
  { label: "cat", rows: [".#..#.", ".####.", ".#..#.", ".####.", "..##..", "......"] },
  { label: "cat", rows: ["#...#.", "##.##.", "#####.", "#.#.#.", "#####.", ".###.."] },
  { label: "fish", rows: ["......", "..###.", "#.####", "######", "#.####", "..###."] },
  { label: "fish", rows: ["......", "#.###.", "######", "#.###.", "......", "......"] },
  { label: "fish", rows: ["..##..", "#.###.", "######", "#.###.", "..##..", "......"] },
  { label: "house", rows: ["..##..", ".####.", "######", ".#..#.", ".#..#.", ".####."] },
  { label: "house", rows: ["..#...", ".###..", "#####.", ".#.#..", ".#.#..", ".###.."] },
  { label: "house", rows: ["...##.", "..####", ".#####", "..#..#", "..#..#", "..####"] },
];

export type Drawing = boolean[];

export function rowsToDrawing(rows: string[]): Drawing {
  return rows.join("").split("").map((c) => c === "#");
}

/** Every example keeps its original pixels so Pip can show "the drawing it looked at". */
const PIXELS = new WeakMap<Example<string>, Drawing>();

/**
 * Turn a drawing into clues Pip can compare, no matter where on the grid it was drawn.
 * Pip crops to the drawing, then checks simple shape clues a kid would notice:
 * is it wide or tall, is there a gap on top or ink in both top corners (two cat ears), a gap down the left side (a fish tail),
 * is the top thin (a roof), is the bottom thin or full, and is there a hole in the middle (eyes, a door)?
 */
export const FEATURE_KEYS = ["shape", "topGap", "topCorners", "leftGap", "topThin", "bottomThin", "middleHole", "rightGap"];

function toFeatures(d: Drawing): Record<string, string> {
  const on: [number, number][] = [];
  d.forEach((v, i) => v && on.push([i % DRAW, Math.floor(i / DRAW)]));
  const f: Record<string, string> = {};
  if (on.length === 0) {
    FEATURE_KEYS.forEach((k) => (f[k] = "0"));
    return f;
  }
  const xs = on.map((p) => p[0]);
  const ys = on.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX + 1, h = maxY - minY + 1;
  const at = (x: number, y: number) => d[(minY + y) * DRAW + minX + x];
  const row = (y: number) => Array.from({ length: w }, (_, x) => at(x, y));
  const col = (x: number) => Array.from({ length: h }, (_, y) => at(x, y));
  const count = (line: boolean[]) => line.filter(Boolean).length;
  const gapIn = (line: boolean[]) => {
    const idx = line.map((v, i) => (v ? i : -1)).filter((i) => i >= 0);
    return idx.length >= 2 && idx[idx.length - 1] - idx[0] + 1 > idx.length ? "yes" : "no";
  };
  f.shape = w > h ? "wide" : h > w ? "tall" : "square";
  f.topGap = gapIn(row(0));
  f.topCorners = at(0, 0) && at(w - 1, 0) ? "yes" : "no";
  f.leftGap = gapIn(col(0));
  f.rightGap = gapIn(col(w - 1));
  f.topThin = count(row(0)) * 2 <= w ? "yes" : "no";
  f.bottomThin = count(row(h - 1)) * 2 <= w ? "yes" : "no";
  f.middleHole = Array.from({ length: Math.max(0, h - 2) }, (_, y) => gapIn(row(y + 1))).includes("yes") ? "yes" : "no";
  return f;
}

export function drawingExample(d: Drawing, label: DrawId): Example<string> {
  const e = { features: toFeatures(d), label };
  PIXELS.set(e, [...d]);
  return e;
}

export const STARTER_EXAMPLES: Example<string>[] = DRAWINGS.map((x) => drawingExample(rowsToDrawing(x.rows), x.label));

export function exampleToDrawing(e: Example<string>): Drawing {
  return PIXELS.get(e) ?? Array(DRAW * DRAW).fill(false);
}

/**
 * Pip's guess for a kid's drawing: the single closest example drawing (k = 1), which is exactly what
 * Pip tells the kid ("your drawing looked most like my fish drawings"). On a tie the newest example
 * wins, so an example the kid just taught is used right away.
 */
export function guessDrawing(d: Drawing, examples: Example<string>[] = STARTER_EXAMPLES) {
  const g = knnGuess(examples, FEATURE_KEYS, toFeatures(d), 1);
  if (!g) return null;
  return { label: g.label as DrawId, closest: exampleToDrawing(g.neighbors[0]), closestLabel: g.neighbors[0].label as DrawId };
}

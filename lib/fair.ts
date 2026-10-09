/**
 * Lesson 13 "Pick the Team": a tiny, real look-alike model.
 * Pip picks a Glorb for the team only if it looks enough like an example in Pip's
 * example box. Shape is the biggest clue Pip notices (it counts double), so when the
 * box only has round Glorbs, square and spiky Glorbs get left out. Adding examples of
 * every kind fixes it. Made-up creatures only. Runs in the browser, no data leaves the page.
 */
import type { GlorbData } from "@/components/art/Bits";

export type Shape = "round" | "square" | "spiky";
export type TeamGlorb = GlorbData & { shape: Shape; id: string };

export const SHAPES: Shape[] = ["round", "square", "spiky"];
export const SHAPE_NAME: Record<Shape, string> = { round: "Round", square: "Square", spiky: "Spiky" };

const g = (id: string, shape: Shape, color: GlorbData["color"], eyes: GlorbData["eyes"], top: GlorbData["top"]): TeamGlorb => ({
  id,
  shape,
  color,
  eyes,
  top,
  spots: false,
});

/** What Pip learned from at the start: only round Glorbs. */
export const START_BOX: TeamGlorb[] = [
  g("r1", "round", "teal", 2, "horns"),
  g("r2", "round", "orange", 1, "antenna"),
  g("r3", "round", "teal", 3, "antenna"),
  g("r4", "round", "orange", 2, "horns"),
];

/** Glorbs trying out for the team. Every one of them is a great player. */
export const TRYOUTS: TeamGlorb[] = [
  g("t1", "round", "teal", 1, "horns"),
  g("t2", "square", "teal", 2, "horns"),
  g("t3", "spiky", "teal", 3, "antenna"),
  g("t4", "round", "orange", 3, "antenna"),
  g("t5", "square", "orange", 1, "antenna"),
  g("t6", "spiky", "orange", 2, "horns"),
];

/** Extra examples the kid can add to Pip's box. */
export const TRAY: TeamGlorb[] = [
  g("x1", "square", "teal", 2, "antenna"),
  g("x2", "spiky", "teal", 3, "horns"),
  g("x3", "round", "teal", 1, "antenna"),
  g("x4", "square", "orange", 1, "horns"),
  g("x5", "spiky", "orange", 2, "antenna"),
];

export function lookAlike(a: TeamGlorb, b: TeamGlorb) {
  return (a.shape === b.shape ? 0 : 2) + (a.color === b.color ? 0 : 1) + (a.eyes === b.eyes ? 0 : 1) + (a.top === b.top ? 0 : 1);
}

/** Pip picks a Glorb when it is at most one small difference away from some example. */
export function pipPicks(box: TeamGlorb[], who: TeamGlorb) {
  return box.some((e) => lookAlike(e, who) <= 1);
}

export function fairMeter(box: TeamGlorb[], tryouts: TeamGlorb[] = TRYOUTS) {
  return SHAPES.map((shape) => {
    const these = tryouts.filter((t) => t.shape === shape);
    return { shape, picked: these.filter((t) => pipPicks(box, t)).length, total: these.length };
  });
}

export function isFair(box: TeamGlorb[]) {
  return fairMeter(box).every((m) => m.picked === m.total);
}

export function boxCounts(box: TeamGlorb[]) {
  return SHAPES.map((shape) => ({ shape, n: box.filter((b) => b.shape === shape).length }));
}

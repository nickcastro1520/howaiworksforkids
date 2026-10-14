"use client";

import { useSyncExternalStore } from "react";

/** Best scores for the bonus games. Saved in this browser only; nothing is sent anywhere. */
export const BONUS_KEY = "hawfk.bonus.v1";
const EVENT = "hawfk-bonus";
type Scores = Record<string, number>;
const EMPTY: Scores = {};
let cachedRaw: string | null = null;
let cached: Scores = EMPTY;

function read(): Scores {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(BONUS_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const p = raw ? JSON.parse(raw) : {};
    cached = {};
    for (const [k, v] of Object.entries(p ?? {})) if (typeof v === "number" && Number.isFinite(v)) cached[k] = v;
  } catch {
    cached = EMPTY;
  }
  return cached;
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function useBest(game: string): number | null {
  const s = useSyncExternalStore(subscribe, read, () => EMPTY);
  return s[game] ?? null;
}

/** Saves the score if it beats the best. Returns true when it is a new best. */
export function saveScore(game: string, score: number): boolean {
  const s = read();
  if (score <= 0 || (s[game] !== undefined && score <= s[game])) return false;
  try {
    window.localStorage.setItem(BONUS_KEY, JSON.stringify({ ...s, [game]: score }));
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(EVENT));
  return true;
}

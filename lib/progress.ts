"use client";

import { useSyncExternalStore } from "react";
import { PROGRESS_KEY } from "@/lib/site";

/**
 * Progress lives ONLY in this browser's localStorage.
 * It is a list of finished lesson slugs. Nothing is ever sent anywhere.
 */
type Progress = { done: string[] };

const EVENT = "hawfk-progress";
const EMPTY: Progress = { done: [] };
let cachedRaw: string | null = null;
let cached: Progress = EMPTY;

function read(): Progress {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PROGRESS_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Progress) : EMPTY;
    cached = Array.isArray(parsed?.done)
      ? { done: parsed.done.filter((s) => typeof s === "string") }
      : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
}

function write(next: Progress) {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: progress just won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    done: progress.done,
    isDone: (slug: string) => progress.done.includes(slug),
    markDone: (slug: string) => {
      const current = read();
      if (current.done.includes(slug)) return;
      write({ done: [...current.done, slug] });
    },
    reset: () => {
      clearQuiz();
      write(EMPTY);
    },
  };
}

/* ---------------- Final quiz (used in release 2) ----------------
 * Saved ONLY in this browser, as { score, missed: conceptId[] }. No answers are
 * sent anywhere and nothing about the quiz goes to analytics.
 */
export const QUIZ_KEY = "hawfk-quiz";

export type QuizResult = { score: number; total: number; missed: string[] };

export function readQuiz(): QuizResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(QUIZ_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<QuizResult>;
    if (typeof p.score !== "number" || typeof p.total !== "number" || !Array.isArray(p.missed)) return null;
    return { score: p.score, total: p.total, missed: p.missed.filter((m): m is string => typeof m === "string") };
  } catch {
    return null;
  }
}

export function saveQuiz(result: QuizResult) {
  try {
    window.localStorage.setItem(QUIZ_KEY, JSON.stringify(result));
  } catch {
    /* storage blocked: the result just won't be remembered */
  }
}

export function clearQuiz() {
  try {
    window.localStorage.removeItem(QUIZ_KEY);
  } catch {
    /* ignore */
  }
}

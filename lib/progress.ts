"use client";

import { useSyncExternalStore } from "react";
import { PROGRESS_KEY, QUIZ_KEY } from "@/lib/site";

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

/* ---------------- Final quiz ----------------
 * Saved ONLY in this browser, as { score, missed: conceptId[] }. No answers, no name.
 * Nothing about the quiz is sent anywhere, and nothing about it goes to analytics.
 */
const QUIZ_EVENT = "hawfk-quiz";

export type QuizResult = { score: number; missed: string[] };

let quizRaw: string | null = null;
let quizCached: QuizResult | null = null;

export function readQuiz(): QuizResult | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(QUIZ_KEY);
  } catch {
    return null;
  }
  if (raw === quizRaw) return quizCached;
  quizRaw = raw;
  quizCached = null;
  try {
    const p = raw ? (JSON.parse(raw) as Partial<QuizResult>) : null;
    if (p && typeof p.score === "number" && Array.isArray(p.missed)) {
      quizCached = { score: p.score, missed: p.missed.filter((m): m is string => typeof m === "string") };
    }
  } catch {
    quizCached = null;
  }
  return quizCached;
}

export function saveQuiz(result: QuizResult) {
  try {
    // Only these two fields, on purpose.
    window.localStorage.setItem(QUIZ_KEY, JSON.stringify({ score: result.score, missed: result.missed }));
  } catch {
    /* storage blocked: the result just won't be remembered */
  }
  window.dispatchEvent(new Event(QUIZ_EVENT));
}

export function clearQuiz() {
  try {
    window.localStorage.removeItem(QUIZ_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(QUIZ_EVENT));
}

function subscribeQuiz(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(QUIZ_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(QUIZ_EVENT, cb);
  };
}

/** The saved quiz result on this device, or null if the quiz hasn't been taken here. */
export function useQuizResult(): QuizResult | null {
  return useSyncExternalStore(subscribeQuiz, readQuiz, () => null);
}

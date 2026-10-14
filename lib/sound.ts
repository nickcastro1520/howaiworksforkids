"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny sound effects made on the fly with WebAudio. No audio files, nothing sent anywhere.
 * The on/off choice is saved in this browser only. No sound can play before the first tap or
 * key press, because the AudioContext is only created inside a user gesture.
 * Default: on with a mouse (desktop), off on touch screens.
 */
export const SOUND_KEY = "hawfk.sound.v1";
const EVENT = "hawfk-sound";

export type Sfx = "tap" | "correct" | "oops" | "badge";

function defaultOn(): boolean {
  return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
}

function read(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const v = window.localStorage.getItem(SOUND_KEY);
    if (v === "on") return true;
    if (v === "off") return false;
  } catch {
    /* storage blocked */
  }
  return defaultOn();
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function useSoundOn(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}

export function setSoundOn(on: boolean) {
  try {
    window.localStorage.setItem(SOUND_KEY, on ? "on" : "off");
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
  window.dispatchEvent(new Event(EVENT));
  if (on) play("tap", true);
}

let ctx: AudioContext | null = null;
let gestured = false;
let pendingTap: ReturnType<typeof setTimeout> | null = null;

if (typeof window !== "undefined") {
  const mark = () => {
    gestured = true;
  };
  window.addEventListener("pointerdown", mark, { once: true, capture: true });
  window.addEventListener("keydown", mark, { once: true, capture: true });
}

type Note = { f: number; t: number; d: number; type?: OscillatorType; v?: number; to?: number };

const SOUNDS: Record<Sfx, Note[]> = {
  tap: [{ f: 660, t: 0, d: 0.05, type: "triangle", v: 0.12 }],
  correct: [
    { f: 660, t: 0, d: 0.09, type: "triangle" },
    { f: 990, t: 0.08, d: 0.14, type: "triangle" },
  ],
  oops: [{ f: 330, t: 0, d: 0.22, type: "sine", to: 220 }],
  badge: [
    { f: 523, t: 0, d: 0.12, type: "triangle" },
    { f: 659, t: 0.1, d: 0.12, type: "triangle" },
    { f: 784, t: 0.2, d: 0.12, type: "triangle" },
    { f: 1047, t: 0.3, d: 0.3, type: "triangle" },
  ],
};

function audio(): AudioContext | null {
  if (!gestured) return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function render(name: Sfx) {
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime + 0.01;
  for (const n of SOUNDS[name]) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.setValueAtTime(n.f, now + n.t);
    if (n.to) osc.frequency.exponentialRampToValueAtTime(n.to, now + n.t + n.d);
    const v = n.v ?? 0.18;
    gain.gain.setValueAtTime(0.0001, now + n.t);
    gain.gain.exponentialRampToValueAtTime(v, now + n.t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
    osc.connect(gain).connect(ac.destination);
    osc.start(now + n.t);
    osc.stop(now + n.t + n.d + 0.02);
  }
}

/** Play a sound effect if sound is on. A result sound in the same tap replaces the tap blip. */
export function play(name: Sfx, force = false) {
  if (typeof window === "undefined") return;
  if (!force && !read()) return;
  if (name === "tap") {
    if (pendingTap) clearTimeout(pendingTap);
    pendingTap = setTimeout(() => {
      pendingTap = null;
      render("tap");
    }, 0);
    return;
  }
  if (pendingTap) {
    clearTimeout(pendingTap);
    pendingTap = null;
  }
  render(name);
}

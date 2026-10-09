"use client";

import { useSyncExternalStore } from "react";

/**
 * One shared read-aloud engine for the whole site (Web Speech API, runs on the device).
 * Nothing is recorded or sent anywhere. If the browser has no speech voices, every
 * "Hear it" button simply doesn't render, and the games still work by reading.
 */

type State = { speakingId: string | null; talkMode: boolean };
let state: State = { speakingId: null, talkMode: false };
const listeners = new Set<() => void>();
const emit = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

/** Make text sound right: drop emoji and decorative symbols, read blanks as "blank". */
export function cleanForSpeech(text: string) {
  return text
    .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, " ")
    .replace(/_{2,}/g, " blank ")
    .replace(/[\u201c\u201d"]/g, "")
    .replace(/[\u2713\u2717\u2192\u2190]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let voice: SpeechSynthesisVoice | null | undefined;
function pickVoice() {
  if (voice !== undefined) return voice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null; // not loaded yet; let the browser choose this time
  voice =
    voices.find((v) => /en[-_]US/i.test(v.lang) && /samantha|google us english|aria|jenny|zira/i.test(v.name)) ??
    voices.find((v) => /en[-_]US/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null;
  return voice;
}

function utter(text: string, id: string) {
  const u = new SpeechSynthesisUtterance(cleanForSpeech(text));
  const v = pickVoice();
  if (v) u.voice = v;
  u.lang = v?.lang ?? "en-US";
  u.rate = 0.9;
  u.pitch = 1.1;
  u.onstart = () => emit({ speakingId: id });
  u.onend = () => {
    if (state.speakingId === id && !window.speechSynthesis.pending) emit({ speakingId: null });
  };
  u.onerror = () => {
    if (state.speakingId === id) emit({ speakingId: null });
  };
  return u;
}

/** Speak now (stops anything already talking). Called from a tap, so browsers allow it. */
export function speak(text: string, id = "say") {
  if (!canSpeak() || !cleanForSpeech(text)) return;
  window.speechSynthesis.cancel();
  emit({ speakingId: id });
  window.speechSynthesis.speak(utter(text, id));
}

/** Queue after whatever is talking (used for auto-read in talk mode). */
export function speakQueued(text: string, id = "auto") {
  if (!canSpeak() || !cleanForSpeech(text)) return;
  window.speechSynthesis.speak(utter(text, id));
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
  emit({ speakingId: null });
}

/** Talk mode: once a child asks to hear things, new prompts are read out automatically. */
export function setTalkMode(on: boolean) {
  if (!on) stopSpeaking();
  emit({ talkMode: on });
}

const getSnapshot = () => state;
const serverState: State = { speakingId: null, talkMode: false };

export function useSpeech() {
  const s = useSyncExternalStore(subscribe, getSnapshot, () => serverState);
  const supported = useSyncExternalStore(
    subscribe,
    canSpeak,
    () => false,
  );
  return { ...s, supported };
}

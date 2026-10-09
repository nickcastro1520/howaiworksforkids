"use client";

import { useEffect, useId, useRef } from "react";
import { cleanForSpeech, setTalkMode, speak, speakQueued, stopSpeaking, useSpeech } from "@/lib/speech";

function SpeakerIcon({ on, size = 22 }: { on: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="say-icon">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      {on ? (
        <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      ) : (
        <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

type SayProps = {
  /** What to say. Use getText to read live text from the page instead. */
  text?: string;
  getText?: () => string;
  /** Short name for screen readers, e.g. "the question" -> "Hear the question". */
  label: string;
  size?: "sm" | "md" | "lg";
  /** Visible words next to the speaker (md/lg). */
  children?: React.ReactNode;
  className?: string;
  onSpeak?: () => void;
};

/** A "Hear it" button. Renders nothing if this device can't speak, so the page still works by reading. */
export function SayButton({ text, getText, label, size = "sm", children, className = "", onSpeak }: SayProps) {
  const id = useId();
  const { supported, speakingId } = useSpeech();
  if (!supported) return null;
  const on = speakingId === id;
  return (
    <button
      type="button"
      className={`say say-${size} ${on ? "is-on" : ""} ${className}`}
      aria-label={on ? `Stop reading ${label}` : `Hear ${label}`}
      aria-pressed={on}
      title={on ? "Stop" : "Hear it"}
      onClick={(e) => {
        e.stopPropagation();
        if (on) return stopSpeaking();
        onSpeak?.();
        speak(text ?? getText?.() ?? "", id);
      }}
    >
      <SpeakerIcon on={on} size={size === "lg" ? 26 : size === "md" ? 24 : 22} />
      {children ? <span className="say-text">{on ? "Stop" : children}</span> : null}
    </button>
  );
}

/** In talk mode, read `text` out loud each time it changes (queued politely after anything already talking). */
export function useAutoSay(text: string | (() => string), enabled = true) {
  const { talkMode } = useSpeech();
  const last = useRef<string>("");
  useEffect(() => {
    if (!enabled) return;
    const t = cleanForSpeech(typeof text === "function" ? text() : text);
    if (!talkMode) {
      last.current = t; // don't blurt out old prompts when talk mode is switched on later
      return;
    }
    if (t && t !== last.current) {
      last.current = t;
      speakQueued(t);
    }
  });
}

/** Speaker button for a prompt, which also auto-reads in talk mode. */
export function SayLine({ text, label, size = "sm" }: { text: string; label: string; size?: "sm" | "md" }) {
  useAutoSay(text);
  return <SayButton text={text} label={label} size={size} />;
}

/**
 * Shown at the start of every game: a big "Hear how to play" button for kids who can't read yet.
 * Tapping it turns on talk mode, so Pip's lines and new questions are read out automatically.
 */
export function HearHowToPlay({ text }: { text: string }) {
  const { supported, talkMode } = useSpeech();
  const mounted = useRef(false);
  useEffect(() => {
    // Already in talk mode (e.g. they used "Read it to me" in the story)? Read the instructions right away.
    if (!mounted.current && talkMode) speakQueued(text, "how");
    mounted.current = true;
  }, [talkMode, text]);
  if (!supported) return null;
  return (
    <div className="hear-offer">
      <SayButton text={text} label="how to play" size="lg" className="hear-big" onSpeak={() => setTalkMode(true)}>
        Hear how to play
      </SayButton>
      <button
        type="button"
        className={`talk-toggle ${talkMode ? "is-on" : ""}`}
        aria-pressed={talkMode}
        onClick={() => setTalkMode(!talkMode)}
      >
        <span aria-hidden="true">{talkMode ? "\u{1F442}" : "\u{1F507}"}</span> Read everything to me: <b>{talkMode ? "On" : "Off"}</b>
      </button>
    </div>
  );
}

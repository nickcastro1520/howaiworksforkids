"use client";

import { useRef } from "react";
import type { Mood } from "@/lib/lessons";
import { HearHowToPlay, SayButton, useAutoSay } from "../Speak";
import { Pip } from "../Pip";

export type GameProps = { onDone: () => void; color: string };

/** Pip's speech bubble. Always has a "Hear it" button, and reads itself in talk mode. */
export function PipSays({ mood = "happy", children, size = 84 }: { mood?: Mood; children: React.ReactNode; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const read = () => ref.current?.innerText ?? "";
  useAutoSay(read);
  return (
    <div className="pip-says">
      <Pip mood={mood} size={size} bob={false} />
      <div className="pip-says-bubble has-say">
        <div ref={ref} aria-live="polite">
          {children}
        </div>
        <SayButton getText={read} label="what Pip says" className="say-corner" />
      </div>
    </div>
  );
}

/** Game title + instructions, with a big "Hear how to play" offer for pre-readers. */
export function GameHead({
  title,
  children,
  right,
  say,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  /** Spoken instructions. Defaults to the instruction text when it's a plain string. */
  say?: string;
}) {
  const spoken = say ?? (typeof children === "string" ? children : "");
  return (
    <div className="game-head">
      <div>
        <h2 className="game-title">{title}</h2>
        <p className="game-how">{children}</p>
        {spoken && <HearHowToPlay key={spoken} text={`${title}. ${spoken}`} />}
      </div>
      {right ? <div className="game-score">{right}</div> : null}
    </div>
  );
}

/** Wraps a text choice so it gets its own little speaker button in the corner. */
export function Sayable({ text, children, className = "" }: { text: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`sayable ${className}`}>
      {children}
      <SayButton text={text} label={`\u201c${text}\u201d`} className="say-corner" />
    </div>
  );
}

/** A big emoji for choices, hidden from screen readers (the words are still there). */
export function Emo({ e, big = false }: { e: string; big?: boolean }) {
  return (
    <span className={`emo ${big ? "emo-big" : ""}`} aria-hidden="true">
      {e}
    </span>
  );
}

export function Dots({ total, results }: { total: number; results: (boolean | null)[] }) {
  return (
    <div className="dots" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`dot ${results[i] === true ? "dot-yes" : results[i] === false ? "dot-no" : ""}`} />
      ))}
    </div>
  );
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

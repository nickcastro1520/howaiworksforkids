"use client";

import type { Mood } from "@/lib/lessons";
import { Pip } from "../Pip";

export type GameProps = { onDone: () => void; color: string };

export function PipSays({ mood = "happy", children, size = 84 }: { mood?: Mood; children: React.ReactNode; size?: number }) {
  return (
    <div className="pip-says">
      <Pip mood={mood} size={size} bob={false} />
      <div className="pip-says-bubble" aria-live="polite">
        {children}
      </div>
    </div>
  );
}

export function GameHead({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="game-head">
      <div>
        <h2 className="game-title">{title}</h2>
        <p className="game-how">{children}</p>
      </div>
      {right ? <div className="game-score">{right}</div> : null}
    </div>
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

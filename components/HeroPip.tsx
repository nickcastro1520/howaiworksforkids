"use client";

import { useEffect, useRef, useState } from "react";
import type { Mood } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { Pip } from "./Pip";

const LINES: { text: string; mood: Mood }[] = [
  { text: "Hi! I'm Pip. I'm a tiny AI. Tap me!", mood: "happy" },
  { text: "Right now I know almost nothing. You'll be my teacher!", mood: "wow" },
  { text: "I learn from examples. Show me lots, and I get better.", mood: "think" },
  { text: "I make mistakes, too. Can you catch them?", mood: "oops" },
  { text: "Every lesson you finish turns on a light in my brain!", mood: "proud" },
];

export function HeroPip() {
  const [i, setI] = useState(0);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);
  const { done } = useProgress();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function onMove(e: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 3);
      setLook({ x: (dx / window.innerWidth) * 14, y: (dy / window.innerHeight) * 10 });
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const line = LINES[i];
  return (
    <div className="hero-pip">
      <div className="hero-bubble" aria-live="polite" key={i}>
        {line.text}
      </div>
      <button
        ref={ref}
        type="button"
        className="hero-pip-btn"
        onClick={() => setI((x) => (x + 1) % LINES.length)}
        aria-label="Tap Pip to hear what Pip says next"
      >
        <Pip mood={line.mood} size={280} lights={done.length} look={look} wave={i === 0} />
      </button>
      <div className="orbit" aria-hidden="true">
        <span className="orb orb-1">pattern</span>
        <span className="orb orb-2">guess</span>
        <span className="orb orb-3">examples</span>
      </div>
    </div>
  );
}

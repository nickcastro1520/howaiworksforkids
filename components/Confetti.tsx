"use client";

import { useMemo } from "react";

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const COLORS = ["#ffd34d", "#ff6b5b", "#33c4b0", "#4b9dff", "#8f7bff", "#ff8fc7"];

export function Confetti({ count = 70 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: rand(i * 7 + 1) * 100,
        delay: rand(i * 7 + 2) * 0.6,
        dur: 1.8 + rand(i * 7 + 3) * 1.6,
        rot: rand(i * 7 + 4) * 360,
        drift: (rand(i * 7 + 5) - 0.5) * 160,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
        size: 8 + rand(i * 7 + 6) * 8,
      })),
    [count],
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          style={
            {
              left: `${b.left}%`,
              background: b.color,
              width: b.size,
              height: b.round ? b.size : b.size * 0.45,
              borderRadius: b.round ? "50%" : 2,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
              "--rot": `${b.rot}deg`,
              "--drift": `${b.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

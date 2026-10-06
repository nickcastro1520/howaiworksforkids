"use client";

import { useState } from "react";
import { OUT } from "../art/Bits";
import { Hand6, MeltyClock, Person } from "../art/Props";
import { GameHead, PipSays, type GameProps } from "./ui";

type Glitch = { id: string; name: string; tip: string; box: [number, number, number, number] };

const GLITCHES: Glitch[] = [
  { id: "sign", name: "Jumbled letters", tip: "AI often messes up letters and words in pictures.", box: [196, 104, 308, 70] },
  { id: "clock", name: "Melty clock", tip: "That clock has a 17 on it, and it's melting!", box: [472, 226, 84, 90] },
  { id: "hand", name: "Six fingers", tip: "Count them: 1, 2, 3, 4, 5, 6! AI often gets hands wrong.", box: [672, 306, 66, 70] },
  { id: "cat", name: "Two tails", tip: "Real cats have one tail. This one has two!", box: [236, 430, 150, 96] },
  { id: "cup", name: "Floating cup", tip: "The cup is floating in the air! Real cups sit on the table.", box: [74, 300, 66, 64] },
  { id: "bike", name: "Square wheels", tip: "Square wheels can't roll! AI didn't understand how bikes work.", box: [420, 420, 170, 110] },
];

function GlitchArt({ id }: { id: string }) {
  switch (id) {
    case "sign":
      return (
        <svg viewBox="0 0 308 70" aria-hidden="true">
          {["B", "A", "K", "E", "R", "R", "Y"].map((ch, i) => (
            <text
              key={i}
              x={48 + i * 36}
              y="44"
              textAnchor="middle"
              fontSize="40"
              fontWeight="700"
              fill="#c83d89"
              fontFamily="var(--font-display), system-ui, sans-serif"
              transform={i === 3 ? `translate(${2 * (48 + i * 36)} 0) scale(-1 1)` : i === 5 ? `rotate(20 ${48 + i * 36} 30)` : undefined}
            >
              {ch}
            </text>
          ))}
          <text x="154" y="63" textAnchor="middle" fontSize="14" fontWeight="800" fill="#4a4470" letterSpacing="3" fontFamily="system-ui, sans-serif">
            FRSEH BRDEA
          </text>
        </svg>
      );
    case "clock":
      return <MeltyClock size={84} />;
    case "hand":
      return <Hand6 size={74} className="wave-hand" />;
    case "cat":
      return (
        <svg viewBox="0 0 150 96" aria-hidden="true">
          <path d="M28 52 q-26 -10 -20 -40" stroke={OUT} strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d="M28 52 q-26 -10 -20 -40" stroke="#888" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M30 58 q-30 4 -28 -18" stroke={OUT} strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d="M30 58 q-30 4 -28 -18" stroke="#888" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="68" cy="62" rx="44" ry="22" fill="#9a9a9a" stroke={OUT} strokeWidth="4" />
          <path d="M40 80 v12 M56 82 v12 M84 82 v12 M100 80 v12" stroke={OUT} strokeWidth="6" strokeLinecap="round" />
          <circle cx="112" cy="40" r="22" fill="#9a9a9a" stroke={OUT} strokeWidth="4" />
          <path d="M96 26 l-2 -18 l14 10 z M126 24 l4 -18 l-16 8z" fill="#9a9a9a" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="105" cy="38" r="3" fill={OUT} />
          <circle cx="120" cy="38" r="3" fill={OUT} />
          <path d="M110 46 q3 3 6 0" stroke={OUT} strokeWidth="2.5" fill="none" />
        </svg>
      );
    case "cup":
      return (
        <svg viewBox="0 0 66 64" aria-hidden="true">
          <path d="M22 8 q-4 -6 2 -8 M34 10 q-4 -6 2 -8" stroke="#b9b2dd" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M10 16 H50 L46 50 H14 Z" fill="#fff" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 22 q14 2 8 16 q-4 6 -10 4" fill="none" stroke={OUT} strokeWidth="4" />
          <rect x="16" y="26" width="28" height="6" fill="#ff8fc7" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 170 110" aria-hidden="true">
          <rect x="6" y="50" width="54" height="54" rx="4" fill="none" stroke={OUT} strokeWidth="6" />
          <rect x="110" y="50" width="54" height="54" rx="4" fill="none" stroke={OUT} strokeWidth="6" />
          <path d="M33 77 L70 40 H120 L137 77 M70 40 L88 77 L120 40 M60 26 h22 M120 40 l-6 -18 h16" stroke="#e0336f" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="88" cy="77" r="6" fill={OUT} />
        </svg>
      );
  }
}

function Scene() {
  return (
    <svg viewBox="0 0 800 560" className="room-bg" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3ff" />
          <stop offset="1" stopColor="#d9f1ff" />
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#skyG)" />
      <circle cx="720" cy="70" r="38" fill="#ffd34d" stroke={OUT} strokeWidth="4" />
      <path d="M60 80 q16 -22 40 -8 q16 -14 34 4 q18 0 16 14 H60z" fill="#fff" />
      <rect y="400" width="800" height="160" fill="#e9dcc6" />
      {[160, 320, 480, 640].map((x) => (
        <path key={x} d={`M${x} 400 L${x - 40} 560`} stroke="#d6c5a8" strokeWidth="4" />
      ))}
      <rect x="140" y="88" width="430" height="316" fill="#ffe3c2" stroke={OUT} strokeWidth="5" />
      <rect x="196" y="104" width="308" height="70" rx="10" fill="#fff8ec" stroke={OUT} strokeWidth="4" />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${140 + i * 48} 190 h48 v34 q-24 16 -48 0z`} fill={i % 2 ? "#fff" : "#ff8fc7"} stroke={OUT} strokeWidth="3.5" />
      ))}
      <rect x="176" y="246" width="170" height="120" rx="8" fill="#bfe6ff" stroke={OUT} strokeWidth="5" />
      <ellipse cx="220" cy="346" rx="26" ry="12" fill="#ffcc33" stroke={OUT} strokeWidth="3" />
      <path d="M200 340 q20 -30 40 0" fill="#ff8fc7" stroke={OUT} strokeWidth="3" />
      <circle cx="296" cy="336" r="18" fill="#c98b5a" stroke={OUT} strokeWidth="3" />
      <rect x="372" y="262" width="88" height="142" rx="6" fill="#6b4cf0" stroke={OUT} strokeWidth="5" />
      <circle cx="446" cy="338" r="5" fill="#ffd34d" />
      <path d="M640 420 V250" stroke="#8b5a32" strokeWidth="26" strokeLinecap="round" />
      <circle cx="640" cy="200" r="70" fill="#3fb866" stroke={OUT} strokeWidth="5" />
      <circle cx="600" cy="230" r="44" fill="#57c97a" stroke={OUT} strokeWidth="5" />
      <circle cx="690" cy="236" r="40" fill="#57c97a" stroke={OUT} strokeWidth="5" />
      <path d="M666 428 Q706 414 704 372" stroke={OUT} strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M666 428 Q706 414 704 372" stroke="#2774d1" strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="40" y="396" width="130" height="14" rx="6" fill="#ff6b5b" stroke={OUT} strokeWidth="4" />
      <path d="M105 410 V500 M80 500 h50" stroke={OUT} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="107" cy="400" rx="18" ry="4" fill={OUT} opacity="0.25" />
      <g>
        <circle cx="770" cy="470" r="12" fill="#ff6b5b" stroke={OUT} strokeWidth="3" />
        <circle cx="746" cy="486" r="10" fill="#ffd34d" stroke={OUT} strokeWidth="3" />
      </g>
    </svg>
  );
}

export function SpotGlitches({ onDone }: GameProps) {
  const [found, setFound] = useState<string[]>([]);
  const [last, setLast] = useState<Glitch | null>(null);
  const [miss, setMiss] = useState<{ x: number; y: number; n: number } | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const done = found.length === GLITCHES.length;

  function hit(g: Glitch) {
    if (found.includes(g.id)) return;
    const next = [...found, g.id];
    setFound(next);
    setLast(g);
    setHint(null);
    if (next.length === GLITCHES.length) onDone();
  }

  return (
    <div className="game">
      <GameHead
        title="Spot the Glitches"
        right={
          <>
            <b>{found.length}</b>/6 found
          </>
        }
      >
        Pretend AI made this picture. Find 6 goofs that couldn&rsquo;t happen in real life. Tap them!
      </GameHead>

      <div
        className="room scene"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          const r = e.currentTarget.getBoundingClientRect();
          setMiss({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, n: Date.now() });
        }}
      >
        <Scene />
        <div className="scene-person" aria-hidden="true">
          <Person grown size={92} shirt="#2774d1" hair="#2b1d14" skin="#c98b62" />
        </div>
        {GLITCHES.map((g) => {
          const [x, y, w, h] = g.box;
          const isFound = found.includes(g.id);
          return (
            <button
              key={g.id}
              type="button"
              className={`glitch ${isFound ? "is-found" : ""} ${hint === g.id ? "is-hint" : ""}`}
              style={{ left: `${x / 8}%`, top: `${y / 5.6}%`, width: `${w / 8}%`, height: `${h / 5.6}%` }}
              onClick={() => hit(g)}
              aria-label={isFound ? `Found: ${g.name}` : "Something in the picture"}
            >
              <GlitchArt id={g.id} />
              {isFound && <span className="glitch-tag">{g.name}</span>}
            </button>
          );
        })}
        {miss && (
          <span key={miss.n} className="miss" style={{ left: `${miss.x}%`, top: `${miss.y}%` }} aria-hidden="true">
            looks normal!
          </span>
        )}
      </div>

      <div className="game-panel" aria-live="polite">
        {done ? (
          <PipSays mood="proud">
            You found all 6! Real AI pictures can look much more real than this. So if something looks too wild, ask a grown-up.
          </PipSays>
        ) : last ? (
          <PipSays mood="wow">
            <b>{last.name}!</b> {last.tip}
          </PipSays>
        ) : (
          <PipSays mood="think">Look closely at hands, words, clocks, animals, and how things sit. Tap anything weird.</PipSays>
        )}
        {!done && (
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              const left = GLITCHES.filter((g) => !found.includes(g.id));
              setHint(left[Math.floor(Math.random() * left.length)].id);
            }}
          >
            I need a hint
          </button>
        )}
      </div>
    </div>
  );
}

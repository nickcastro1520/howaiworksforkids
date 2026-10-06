"use client";

import { useState } from "react";
import { OUT } from "../art/Bits";
import { GameHead, PipSays, type GameProps } from "./ui";

type Item = {
  id: string;
  name: string;
  ai: boolean;
  why: string;
  box: [number, number, number, number]; // x, y, w, h in the 800x500 room
};

const ITEMS: Item[] = [
  { id: "speaker", name: "Smart speaker", ai: true, box: [596, 200, 76, 104], why: "It learned what words sound like, so it can guess what you asked for." },
  { id: "tablet", name: "Video app", ai: true, box: [418, 222, 112, 88], why: "It looks at what you watched and guesses what you'll like next." },
  { id: "phone", name: "Face-unlock phone", ai: true, box: [676, 232, 64, 74], why: "It learned what your face looks like from examples, so it can tell it's you." },
  { id: "vacuum", name: "Robot vacuum", ai: true, box: [318, 404, 148, 76], why: "It learns a map of the room so it can go around the couch." },
  { id: "lamp", name: "Lamp", ai: false, box: [36, 160, 116, 280], why: "No AI. You flip the switch and it turns on. It never learns or guesses." },
  { id: "teddy", name: "Teddy bear", ai: false, box: [262, 196, 112, 120], why: "No AI. A teddy bear doesn't learn anything. It's great for hugs, though!" },
  { id: "books", name: "Books", ai: false, box: [526, 44, 120, 82], why: "No AI. A book says the same words every time. People wrote them." },
  { id: "clock", name: "Wind-up clock", ai: false, box: [668, 34, 84, 92], why: "No AI. Gears turn the same way every second. No examples, no guessing." },
];

function Icon({ id }: { id: string }) {
  switch (id) {
    case "speaker":
      return (
        <svg viewBox="0 0 76 104" aria-hidden="true">
          <rect x="8" y="10" width="60" height="88" rx="22" fill="#3a3466" stroke={OUT} strokeWidth="4" />
          <rect x="16" y="20" width="44" height="10" rx="5" fill="#79f2da" className="node-pulse" />
          <g fill="#5a5390">
            {[44, 56, 68, 80].map((y) => [24, 38, 52].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" />))}
          </g>
        </svg>
      );
    case "tablet":
      return (
        <svg viewBox="0 0 112 88" aria-hidden="true">
          <rect x="4" y="4" width="104" height="76" rx="10" fill="#2b2566" stroke={OUT} strokeWidth="4" />
          <rect x="12" y="12" width="56" height="38" rx="5" fill="#ff6b5b" />
          <path d="M34 22 l14 9 l-14 9z" fill="#fff" />
          <rect x="74" y="12" width="26" height="17" rx="3" fill="#4b9dff" />
          <rect x="74" y="33" width="26" height="17" rx="3" fill="#ffcc33" />
          <rect x="12" y="56" width="40" height="6" rx="3" fill="#8f86c9" />
          <rect x="12" y="66" width="26" height="6" rx="3" fill="#8f86c9" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 64 74" aria-hidden="true">
          <rect x="14" y="2" width="38" height="70" rx="8" fill="#231d4f" stroke={OUT} strokeWidth="3" />
          <rect x="18" y="8" width="30" height="58" rx="5" fill="#bfe6ff" />
          <circle cx="33" cy="30" r="10" fill="none" stroke="#2774d1" strokeWidth="3" strokeDasharray="5 4" />
          <circle cx="29.5" cy="28" r="1.8" fill={OUT} />
          <circle cx="36.5" cy="28" r="1.8" fill={OUT} />
          <path d="M29 34 q4 3 8 0" stroke={OUT} strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="24" y="48" width="18" height="5" rx="2.5" fill="#2774d1" />
        </svg>
      );
    case "vacuum":
      return (
        <svg viewBox="0 0 148 76" aria-hidden="true">
          <ellipse cx="74" cy="48" rx="68" ry="24" fill="#d8d3f2" stroke={OUT} strokeWidth="4" />
          <ellipse cx="74" cy="40" rx="60" ry="18" fill="#f6f4ff" stroke={OUT} strokeWidth="3" />
          <circle cx="74" cy="36" r="8" fill="#79f2da" stroke={OUT} strokeWidth="3" className="node-pulse" />
          <rect x="102" y="32" width="18" height="6" rx="3" fill="#6b4cf0" />
        </svg>
      );
    case "lamp":
      return (
        <svg viewBox="0 0 116 280" aria-hidden="true">
          <path d="M28 10 H88 L108 78 H8 Z" fill="#ffd96b" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
          <path d="M58 78 V262" stroke={OUT} strokeWidth="8" />
          <path d="M58 78 V262" stroke="#b78a5e" strokeWidth="3" />
          <ellipse cx="58" cy="266" rx="34" ry="9" fill="#b78a5e" stroke={OUT} strokeWidth="4" />
          <path d="M70 120 v26" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="150" r="5" fill="#ff6b5b" stroke={OUT} strokeWidth="2.5" />
        </svg>
      );
    case "teddy":
      return (
        <svg viewBox="0 0 112 120" aria-hidden="true">
          <circle cx="30" cy="22" r="14" fill="#c98b5a" stroke={OUT} strokeWidth="4" />
          <circle cx="82" cy="22" r="14" fill="#c98b5a" stroke={OUT} strokeWidth="4" />
          <ellipse cx="56" cy="92" rx="34" ry="26" fill="#c98b5a" stroke={OUT} strokeWidth="4" />
          <circle cx="56" cy="44" r="30" fill="#d9a06c" stroke={OUT} strokeWidth="4" />
          <ellipse cx="56" cy="54" rx="13" ry="10" fill="#f3d2b0" />
          <circle cx="45" cy="40" r="3.5" fill={OUT} />
          <circle cx="67" cy="40" r="3.5" fill={OUT} />
          <circle cx="56" cy="50" r="4" fill={OUT} />
          <path d="M50 58 q6 5 12 0" stroke={OUT} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M42 70 l14 7 l14 -7 v14 l-14 -7 l-14 7z" fill="#ff7a9c" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "books":
      return (
        <svg viewBox="0 0 120 82" aria-hidden="true">
          {[
            ["#ff6b5b", 6, 14],
            ["#4b9dff", 26, 4],
            ["#33c4b0", 46, 18],
            ["#ffcc33", 66, 8],
          ].map(([c, x, y]) => (
            <rect key={c as string} x={x as number} y={y as number} width="18" height={78 - (y as number)} rx="3" fill={c as string} stroke={OUT} strokeWidth="3.5" />
          ))}
          <rect x="86" y="30" width="18" height="48" rx="3" fill="#8f7bff" stroke={OUT} strokeWidth="3.5" transform="rotate(14 95 54)" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 84 92" aria-hidden="true">
          <circle cx="20" cy="16" r="10" fill="#ffcc33" stroke={OUT} strokeWidth="3.5" />
          <circle cx="64" cy="16" r="10" fill="#ffcc33" stroke={OUT} strokeWidth="3.5" />
          <circle cx="42" cy="50" r="32" fill="#ff6b5b" stroke={OUT} strokeWidth="4" />
          <circle cx="42" cy="50" r="24" fill="#fff8e6" stroke={OUT} strokeWidth="3" />
          <path d="M42 50 V34 M42 50 L54 56" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
          <path d="M22 80 l-6 8 M62 80 l6 8" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
}

function Room() {
  return (
    <svg viewBox="0 0 800 500" className="room-bg" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id="wallDots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="3" fill="#f3dfbf" />
          <circle cx="30" cy="30" r="3" fill="#f3dfbf" />
        </pattern>
      </defs>
      <rect width="800" height="350" fill="#fdf1dc" />
      <rect width="800" height="350" fill="url(#wallDots)" />
      <rect y="340" width="800" height="160" fill="#e7c595" />
      {[380, 420, 460].map((y) => (
        <path key={y} d={`M0 ${y} H800`} stroke="#d4ad78" strokeWidth="3" />
      ))}
      <rect y="334" width="800" height="12" fill="#c99a63" />
      <rect x="170" y="56" width="200" height="160" rx="10" fill="#9fd8ff" stroke={OUT} strokeWidth="6" />
      <circle cx="320" cy="96" r="20" fill="#ffd34d" />
      <path d="M200 160 q20 -26 46 -10 q18 -18 40 2 q22 0 20 18 H200z" fill="#fff" />
      <path d="M270 56 V216 M170 136 H370" stroke={OUT} strokeWidth="5" />
      <rect x="510" y="126" width="260" height="14" rx="4" fill="#b78a5e" stroke={OUT} strokeWidth="4" />
      <ellipse cx="400" cy="452" rx="250" ry="34" fill="#ff8fc7" opacity="0.5" />
      <rect x="236" y="250" width="330" height="110" rx="34" fill="#7b5cff" stroke={OUT} strokeWidth="5" />
      <rect x="252" y="214" width="298" height="70" rx="30" fill="#8f7bff" stroke={OUT} strokeWidth="5" />
      <rect x="220" y="270" width="40" height="100" rx="18" fill="#6b4cf0" stroke={OUT} strokeWidth="5" />
      <rect x="542" y="270" width="40" height="100" rx="18" fill="#6b4cf0" stroke={OUT} strokeWidth="5" />
      <rect x="596" y="300" width="160" height="16" rx="5" fill="#c99a63" stroke={OUT} strokeWidth="4" />
      <path d="M612 316 V410 M740 316 V410" stroke={OUT} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function AIDetective({ onDone }: GameProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);
  const [last, setLast] = useState<{ id: string; right: boolean } | null>(null);

  const checked = Object.keys(answers).length;
  const foundAI = ITEMS.filter((i) => i.ai && answers[i.id] !== undefined).length;
  const item = ITEMS.find((i) => i.id === active) ?? null;
  const finished = checked === ITEMS.length;

  function answer(saysAI: boolean) {
    if (!item) return;
    const right = saysAI === item.ai;
    const next = { ...answers, [item.id]: right };
    setAnswers(next);
    setLast({ id: item.id, right });
    setActive(null);
    if (Object.keys(next).length === ITEMS.length) onDone();
  }

  const lastItem = last ? ITEMS.find((i) => i.id === last.id) : null;

  return (
    <div className="game">
      <GameHead
        title="AI Detective"
        right={
          <>
            <b>{checked}</b>/8 checked
          </>
        }
      >
        Tap things in the room. Decide: does it use AI, or not?
      </GameHead>

      <div className="room">
        <Room />
        {ITEMS.map((it) => {
          const [x, y, w, h] = it.box;
          const done = answers[it.id] !== undefined;
          return (
            <button
              key={it.id}
              type="button"
              className={`room-item ${active === it.id ? "is-active" : ""} ${done ? "is-done" : ""}`}
              style={{ left: `${x / 8}%`, top: `${y / 5}%`, width: `${w / 8}%`, height: `${h / 5}%` }}
              onClick={() => {
                setActive(it.id);
                setLast(null);
              }}
              aria-label={`${it.name}${done ? (it.ai ? ", uses AI" : ", no AI") : ""}`}
              aria-pressed={active === it.id}
            >
              <Icon id={it.id} />
              {done && <span className={`room-tag ${it.ai ? "tag-ai" : "tag-no"}`}>{it.ai ? "AI" : "no AI"}</span>}
            </button>
          );
        })}
      </div>

      <div className="room-list" role="group" aria-label="Things to check">
        {ITEMS.map((it) => (
          <button
            key={it.id}
            type="button"
            className={`pill ${answers[it.id] !== undefined ? "pill-done" : ""} ${active === it.id ? "pill-on" : ""}`}
            onClick={() => {
              setActive(it.id);
              setLast(null);
            }}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div className="game-panel" aria-live="polite">
        {item ? (
          <div className="ask">
            <p className="ask-q">
              Does the <b>{item.name.toLowerCase()}</b> use AI?
            </p>
            <div className="ask-btns">
              <button type="button" className="btn btn-big btn-ai" onClick={() => answer(true)}>
                Yes, it learns!
              </button>
              <button type="button" className="btn btn-big btn-plain" onClick={() => answer(false)}>
                No AI
              </button>
            </div>
          </div>
        ) : lastItem && last ? (
          <PipSays mood={last.right ? "proud" : "oops"}>
            <b>{last.right ? "You got it!" : "Not quite!"}</b> {lastItem.why}
            {!finished && <span className="muted"> Tap something else.</span>}
          </PipSays>
        ) : finished ? null : (
          <PipSays mood="think">
            Some things learn from examples. Some just do the same thing every time. Tap something to check it!
          </PipSays>
        )}
        {finished && (
          <p className="win-line">
            Case closed! You found all {foundAI} AI things. AI is the stuff that learns and guesses.
          </p>
        )}
      </div>
    </div>
  );
}

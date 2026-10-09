"use client";

import { useState } from "react";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

type Color = "red" | "blue" | "green" | "purple";
type Eyes = 1 | 2 | 3;
type Size = "small" | "big";
type Place = "hill" | "water" | "sky";
export type Monster = { color: Color; eyes: Eyes; size: Size; place: Place };
type Group = keyof Monster;

const FILL: Record<Color, string> = { red: "#e2483d", blue: "#3f86e0", green: "#3faa4f", purple: "#8a45d0" };

type Tile = { group: Group; value: Monster[Group]; emoji: string; words: string };
const TILES: Tile[] = [
  { group: "color", value: "red", emoji: "🔴", words: "red" },
  { group: "color", value: "blue", emoji: "🔵", words: "blue" },
  { group: "color", value: "green", emoji: "🟢", words: "green" },
  { group: "color", value: "purple", emoji: "🟣", words: "purple" },
  { group: "eyes", value: 1, emoji: "👁️", words: "1 eye" },
  { group: "eyes", value: 2, emoji: "👀", words: "2 eyes" },
  { group: "eyes", value: 3, emoji: "👁️👀", words: "3 eyes" },
  { group: "size", value: "small", emoji: "🐭", words: "small" },
  { group: "size", value: "big", emoji: "🐘", words: "big" },
  { group: "place", value: "hill", emoji: "⛰️", words: "on a hill" },
  { group: "place", value: "water", emoji: "🌊", words: "in the water" },
  { group: "place", value: "sky", emoji: "☁️", words: "in the sky" },
];
const GROUP_NAME: Record<Group, string> = { color: "Color", eyes: "Eyes", size: "Size", place: "Where" };
const GROUPS: Group[] = ["color", "eyes", "size", "place"];

const TARGETS: Monster[] = [
  { color: "green", eyes: 3, size: "small", place: "hill" },
  { color: "purple", eyes: 1, size: "big", place: "water" },
];

const pickRandom = <T,>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)];
const OPTIONS: { [G in Group]: Monster[G][] } = {
  color: ["red", "blue", "green", "purple"],
  eyes: [1, 2, 3],
  size: ["small", "big"],
  place: ["hill", "water", "sky"],
};

function describe(m: Partial<Monster>): string {
  const parts = ["Draw a"];
  if (m.size) parts.push(m.size);
  if (m.color) parts.push(m.color);
  parts.push("monster");
  if (m.eyes) parts.push(`with ${m.eyes} ${m.eyes === 1 ? "eye" : "eyes"}`);
  if (m.place) parts.push(m.place === "hill" ? "on a hill" : m.place === "water" ? "in the water" : "in the sky");
  return parts.join(" ") + ".";
}

export function MonsterArt({ m, label, size = 220 }: { m: Monster; label: string; size?: number }) {
  const scale = m.size === "big" ? 1 : 0.6;
  const cy = m.place === "sky" ? 92 : m.place === "water" ? 132 : 118;
  const eyeXs = m.eyes === 1 ? [0] : m.eyes === 2 ? [-14, 14] : [-20, 0, 20];
  return (
    <svg viewBox="0 0 220 200" width={size} height={(size * 200) / 220} role="img" aria-label={label} className="monster-art">
      <rect width="220" height="200" rx="18" fill={m.place === "water" ? "#cfeefb" : "#e8f6ff"} />
      {m.place === "sky" && (
        <g fill="#fff" stroke="#231d4f" strokeWidth="3">
          <ellipse cx="50" cy="40" rx="26" ry="13" />
          <ellipse cx="170" cy="55" rx="22" ry="11" />
          <ellipse cx="110" cy="168" rx="70" ry="16" />
        </g>
      )}
      {m.place === "hill" && <path d="M-10 200 Q110 110 230 200 Z" fill="#7fd08a" stroke="#231d4f" strokeWidth="3" />}
      <g transform={`translate(110 ${cy}) scale(${scale})`}>
        <path d="M-30 -48 L-22 -74 L-12 -50 M30 -48 L22 -74 L12 -50" fill={FILL[m.color]} stroke="#231d4f" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="0" cy="0" rx="52" ry="56" fill={FILL[m.color]} stroke="#231d4f" strokeWidth="4" />
        {eyeXs.map((x) => (
          <g key={x}>
            <circle cx={x} cy="-14" r="10" fill="#fff" stroke="#231d4f" strokeWidth="3" />
            <circle cx={x + 2} cy="-12" r="4.5" fill="#231d4f" />
          </g>
        ))}
        <path d="M-18 18 Q0 34 18 18" fill="none" stroke="#231d4f" strokeWidth="4" strokeLinecap="round" />
        <path d="M-10 21 v6 M8 21 v6" stroke="#fff" strokeWidth="4" />
        <path d="M-24 52 v12 M24 52 v12" stroke="#231d4f" strokeWidth="6" strokeLinecap="round" />
      </g>
      {m.place === "water" && (
        <path
          d="M0 150 q14 -10 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 V200 H0 Z"
          fill="#3f86e0"
          opacity="0.85"
          stroke="#231d4f"
          strokeWidth="3"
        />
      )}
    </svg>
  );
}

export function MonsterMaker({ onDone }: GameProps) {
  const [round, setRound] = useState(0);
  const [prompt, setPrompt] = useState<Partial<Monster>>({});
  const [used, setUsed] = useState(1); // "Draw a monster" is the first tile
  const [drawn, setDrawn] = useState<Monster | null>(null);
  const [tries, setTries] = useState(0);
  const [stars, setStars] = useState<number[]>([]);
  const target = TARGETS[round];
  const matched = drawn !== null && GROUPS.every((g) => drawn[g] === target[g]);
  const finished = stars.length === TARGETS.length;

  function addTile(t: Tile) {
    if (matched) return;
    setPrompt((p) => ({ ...p, [t.group]: t.value }));
    setUsed((u) => u + 1);
  }

  function draw() {
    const m: Monster = {
      color: prompt.color ?? pickRandom(OPTIONS.color),
      eyes: prompt.eyes ?? pickRandom(OPTIONS.eyes),
      size: prompt.size ?? pickRandom(OPTIONS.size),
      place: prompt.place ?? pickRandom(OPTIONS.place),
    };
    setDrawn(m);
    setTries((t) => t + 1);
    if (GROUPS.every((g) => m[g] === target[g])) {
      const s = used <= 6 ? 3 : used <= 8 ? 2 : 1;
      const nextStars = [...stars, s];
      setStars(nextStars);
      if (nextStars.length === TARGETS.length) onDone();
    }
  }

  function nextRound() {
    setRound(round + 1);
    setPrompt({});
    setUsed(1);
    setDrawn(null);
    setTries(0);
  }

  const sentence = describe(prompt);
  const guessed = drawn ? GROUPS.filter((g) => prompt[g] === undefined) : [];
  const wrong = drawn ? GROUPS.filter((g) => drawn[g] !== target[g]) : [];
  const lastStars = stars[round];

  return (
    <div className="game mm">
      <GameHead
        title="Monster Maker"
        right={<Dots total={TARGETS.length} results={TARGETS.map((_, i) => (stars[i] !== undefined ? true : null))} />}
        say="Make Pip draw the target monster. Tap picture-word tiles to add details to your prompt. Then tap: Pip, draw it! Get 3 stars by matching with 6 tiles or fewer."
      >
        Make Pip draw the <b>target monster</b>. Tap tiles to add details to your prompt, then tap &ldquo;Pip, draw it!&rdquo; Match it with 6
        tiles or fewer for 3 stars.
      </GameHead>

      <div className="game-panel">
        <div className="mm-boards">
          <figure className="mm-board">
            <figcaption>
              <Emo e="🎯" /> Target
            </figcaption>
            <MonsterArt m={target} label="The target monster. Look at its color, eyes, size, and where it is." />
          </figure>
          <figure className="mm-board">
            <figcaption>
              <Emo e="🖍️" /> Pip&rsquo;s drawing
            </figcaption>
            {drawn ? (
              <MonsterArt m={drawn} label={`Pip drew: ${describe(drawn).replace("Draw a", "a")}`} />
            ) : (
              <div className="mm-empty" aria-label="Pip hasn't drawn yet">
                ?
              </div>
            )}
          </figure>
        </div>

        <div className="mm-prompt" aria-label="Your prompt">
          <span className="mm-chip mm-chip-base">
            <Emo e="🖍️" /> Draw a monster
          </span>
          {GROUPS.filter((g) => prompt[g] !== undefined).map((g) => {
            const t = TILES.find((x) => x.group === g && x.value === prompt[g])!;
            return (
              <button
                key={g}
                type="button"
                className="mm-chip"
                onClick={() => setPrompt((p) => ({ ...p, [g]: undefined }))}
                aria-label={`Remove ${t.words}`}
                disabled={matched}
              >
                <Emo e={t.emoji} /> {t.words} <span aria-hidden="true">✕</span>
              </button>
            );
          })}
        </div>
        <div className="say-row">
          <p className="mm-sentence">&ldquo;{sentence}&rdquo;</p>
          <SayLine text={`Your prompt: ${sentence}`} label="your prompt" size="md" />
          <span className="mm-used">Tiles used: {used}</span>
        </div>

        {!matched && (
          <div className="mm-tiles">
            {GROUPS.map((g) => (
              <div key={g} className="mm-group" role="group" aria-label={GROUP_NAME[g]}>
                <span className="mm-group-name">{GROUP_NAME[g]}</span>
                <div className="mm-group-tiles">
                  {TILES.filter((t) => t.group === g).map((t) => (
                    <Sayable key={t.words} text={t.words}>
                      <button
                        type="button"
                        className={`mm-tile ${prompt[g] === t.value ? "is-on" : ""}`}
                        aria-pressed={prompt[g] === t.value}
                        onClick={() => addTile(t)}
                      >
                        <Emo e={t.emoji} /> {t.words}
                      </button>
                    </Sayable>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!matched && (
          <button type="button" className="btn btn-huge btn-go" onClick={draw}>
            <Emo e="✨" /> Pip, draw it!
          </button>
        )}

        {drawn && !matched && (
          <PipSays mood="oops">
            {guessed.length > 0
              ? `Your prompt didn't say the ${guessed.map((g) => GROUP_NAME[g].toLowerCase()).join(" or the ")}, so I guessed. `
              : ""}
            {wrong.length > 0 ? `Not a match yet: check the ${wrong.map((g) => GROUP_NAME[g].toLowerCase()).join(" and the ")}.` : ""}
          </PipSays>
        )}

        {matched && (
          <>
            <p className="mm-stars" aria-label={`${lastStars} stars`}>
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={i < lastStars ? "on" : ""} aria-hidden="true">
                  ★
                </span>
              ))}
            </p>
            <PipSays mood="proud">
              {lastStars === 3
                ? `A perfect match with ${used} tiles! Clear details told me exactly what to draw.`
                : `It matches! You used ${used} tiles${tries > 1 ? ` and ${tries} tries` : ""}. Fewer, clearer details get 3 stars.`}
            </PipSays>
            {!finished ? (
              <button type="button" className="btn btn-big btn-go" onClick={nextRound}>
                Next monster &rarr;
              </button>
            ) : (
              <p className="win-line">Monster master! Clear prompts get better results.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

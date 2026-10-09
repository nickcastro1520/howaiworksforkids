"use client";

import { useRef, useState } from "react";
import type { Example } from "@/lib/ml";
import {
  DRAW,
  DRAW_IDS,
  GRID,
  PALETTE,
  PIC_IDS,
  PIC_LABEL,
  STARTER_EXAMPLES,
  drawingExample,
  guessDrawing,
  peekScores,
  pixelAt,
  revealOrder,
  type DrawId,
  type Drawing,
  type PicId,
} from "@/lib/pixels";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

const ROUNDS: { pic: PicId; seed: number }[] = [
  { pic: "fish", seed: 7 },
  { pic: "house", seed: 3 },
];
const START = 4;
const STEP = 6;

const DRAW_LABEL: Record<DrawId, { name: string; emoji: string }> = {
  cat: { name: "Cat", emoji: "🐱" },
  fish: { name: "Fish", emoji: "🐟" },
  house: { name: "House", emoji: "🏠" },
};

function top(scores: Record<PicId, number>): PicId {
  return PIC_IDS.reduce((a, b) => (scores[a] >= scores[b] ? a : b));
}

function MiniDrawing({ d, label }: { d: Drawing; label: string }) {
  return (
    <div className="mini-draw" role="img" aria-label={label}>
      {d.map((on, i) => (
        <span key={i} className={on ? "on" : ""} />
      ))}
    </div>
  );
}

function Peek({ onFinished }: { onFinished: () => void }) {
  const [round, setRound] = useState(0);
  const [count, setCount] = useState(START);
  const [kid, setKid] = useState<{ pick: PicId; at: number; pip: PicId; pipPct: number } | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const r = ROUNDS[round];
  const order = revealOrder(r.seed);
  const showAll = kid !== null;
  const shown = new Set(showAll ? order : order.slice(0, count));
  const scores = peekScores(r.pic, order.slice(0, showAll ? kid.at : count));
  const pipTop = top(scores);

  function guess(pick: PicId) {
    if (kid) return;
    setKid({ pick, at: count, pip: pipTop, pipPct: scores[pipTop] });
    setResults((x) => [...x, pick === r.pic]);
    if (round === ROUNDS.length - 1) onFinished();
  }

  const pipLine = `Pip thinks it's ${PIC_LABEL[pipTop].name === "Apple" ? "an apple" : `a ${PIC_LABEL[pipTop].name.toLowerCase()}`}. ${scores[pipTop]} percent sure.`;

  return (
    <div className="game-panel">
      <div className="peek-row">
        <div
          className="peek-grid"
          role="img"
          aria-label={showAll ? `The whole picture: a ${PIC_LABEL[r.pic].name.toLowerCase()}` : `Hidden picture. ${shown.size} of ${GRID * GRID} pixels showing.`}
        >
          {Array.from({ length: GRID * GRID }, (_, i) => (
            <span key={i} className={shown.has(i) ? "px on" : "px"} style={shown.has(i) ? { background: PALETTE[pixelAt(r.pic, i)] } : undefined} />
          ))}
        </div>
        <div className="peek-side">
          <p className="peek-count">
            <b>{shown.size}</b> of {GRID * GRID} pixels
          </p>
          <div className="pip-bars" aria-label="Pip's guesses">
            <p className="small-cap">Pip&rsquo;s guess</p>
            <ul>
              {PIC_IDS.map((id) => (
                <li key={id} className={id === pipTop ? "is-top" : ""}>
                  <span className="pb-label">
                    <Emo e={PIC_LABEL[id].emoji} /> {PIC_LABEL[id].name}
                  </span>
                  <span className="pb-track" aria-hidden="true">
                    <span style={{ width: `${scores[id]}%` }} />
                  </span>
                  <span className="pb-pct">{scores[id]}%</span>
                </li>
              ))}
            </ul>
            <SayLine key={`${round}-${count}-${showAll}`} text={pipLine} label="Pip's guess" />
          </div>
        </div>
      </div>

      {!kid ? (
        <>
          <button type="button" className="btn btn-big btn-sun" onClick={() => setCount((c) => Math.min(GRID * GRID, c + STEP))} disabled={count >= GRID * GRID}>
            <Emo e="👀" /> Peek at more pixels
          </button>
          <div className="ask-q-row">
            <p className="ask-q">What do YOU think it is?</p>
            <SayLine key={round} text="What do you think it is? Apple, fish, house, or cat? Peek at more pixels if you're not sure." label="the question" size="md" />
          </div>
          <div className="peek-guesses">
            {PIC_IDS.map((id) => (
              <Sayable key={id} text={PIC_LABEL[id].name}>
                <button type="button" className="btn btn-big btn-plain" onClick={() => guess(id)}>
                  <Emo e={PIC_LABEL[id].emoji} big /> {PIC_LABEL[id].name}
                </button>
              </Sayable>
            ))}
          </div>
        </>
      ) : (
        <>
          <PipSays mood={kid.pick === r.pic ? "wow" : "think"}>
            {kid.pick === r.pic ? "You got it!" : `It was a ${PIC_LABEL[r.pic].name.toLowerCase()}!`} You guessed after seeing {kid.at} pixels. I was{" "}
            {kid.pipPct}% sure it was {kid.pip === "apple" ? "an apple" : `a ${PIC_LABEL[kid.pip].name.toLowerCase()}`}. More pixels give us both more clues.
          </PipSays>
          {round < ROUNDS.length - 1 ? (
            <button
              type="button"
              className="btn btn-big btn-go"
              onClick={() => {
                setRound(round + 1);
                setCount(START);
                setKid(null);
              }}
            >
              Next picture &rarr;
            </button>
          ) : null}
        </>
      )}
      <Dots total={ROUNDS.length} results={results} />
    </div>
  );
}

function Paint({ color }: { color: string }) {
  const [target, setTarget] = useState<DrawId | null>(null);
  const [cells, setCells] = useState<Drawing>(() => Array(DRAW * DRAW).fill(false));
  const [examples, setExamples] = useState<Example<string>[]>(STARTER_EXAMPLES);
  const [result, setResult] = useState<ReturnType<typeof guessDrawing>>(null);
  const [taught, setTaught] = useState(false);
  const paint = useRef<{ on: boolean; active: boolean }>({ on: true, active: false });
  const filled = cells.filter(Boolean).length;

  const setCell = (i: number, on: boolean) =>
    setCells((c) => {
      if (c[i] === on) return c;
      const n = [...c];
      n[i] = on;
      return n;
    });

  const cellFromPoint = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const v = el?.dataset?.cell;
    return v === undefined ? null : Number(v);
  };

  if (!target) {
    return (
      <div className="game-panel">
        <div className="ask-q-row">
          <p className="ask-q">Your turn! What will you draw for Pip?</p>
          <SayLine text="Your turn! What will you draw for Pip? A cat, a fish, or a house?" label="the question" size="md" />
        </div>
        <div className="ask-btns three">
          {DRAW_IDS.map((id) => (
            <Sayable key={id} text={DRAW_LABEL[id].name}>
              <button type="button" className="btn btn-big btn-plain" onClick={() => setTarget(id)}>
                <Emo e={DRAW_LABEL[id].emoji} big /> {DRAW_LABEL[id].name}
              </button>
            </Sayable>
          ))}
        </div>
      </div>
    );
  }

  const name = DRAW_LABEL[target].name.toLowerCase();
  return (
    <div className="game-panel">
      <div className="ask-q-row">
        <p className="ask-q">
          Draw a {name} <Emo e={DRAW_LABEL[target].emoji} />. Tap or drag on the squares.
        </p>
        <SayLine text={`Draw a ${name}. Tap or drag on the squares. Then ask Pip to guess.`} label="what to do" size="md" />
      </div>
      <div
        className="paint-grid"
        style={{ "--ink-c": color } as React.CSSProperties}
        onPointerDown={(e) => {
          const i = cellFromPoint(e.clientX, e.clientY);
          if (i === null) return;
          e.preventDefault();
          paint.current = { on: !cells[i], active: true };
          setCell(i, paint.current.on);
          setResult(null);
        }}
        onPointerMove={(e) => {
          if (!paint.current.active) return;
          const i = cellFromPoint(e.clientX, e.clientY);
          if (i !== null) setCell(i, paint.current.on);
        }}
        onPointerUp={() => (paint.current.active = false)}
        onPointerLeave={() => (paint.current.active = false)}
        onPointerCancel={() => (paint.current.active = false)}
        role="group"
        aria-label={`Drawing grid, 8 by 8. ${filled} squares filled.`}
      >
        {cells.map((on, i) => (
          <button
            key={i}
            type="button"
            data-cell={i}
            className={on ? "pc on" : "pc"}
            aria-label={`Row ${Math.floor(i / DRAW) + 1}, square ${(i % DRAW) + 1}`}
            aria-pressed={on}
            onClick={(e) => {
              // Mouse and touch paint on pointer down. This handles the keyboard (Enter / Space).
              if (e.detail === 0) {
                setCell(i, !on);
                setResult(null);
              }
            }}
          />
        ))}
      </div>
      <div className="ask-btns">
        <button type="button" className="btn btn-plain" onClick={() => (setCells(Array(DRAW * DRAW).fill(false)), setResult(null), setTaught(false))}>
          <Emo e="🧽" /> Clear
        </button>
        <button type="button" className="btn btn-big btn-go" disabled={filled < 4} onClick={() => setResult(guessDrawing(cells, examples))}>
          <Emo e="🤖" /> Pip, guess!
        </button>
      </div>
      {filled < 4 && <p className="muted center">Fill in at least 4 squares.</p>}
      {result && (
        <div className="paint-result pop">
          <div className="paint-closest">
            <MiniDrawing d={result.closest} label={`The example drawing that looked most like yours: a ${result.closestLabel}`} />
            <small>Closest example Pip learned</small>
          </div>
          <PipSays mood={result.label === target ? "wow" : "oops"}>
            {result.label === target
              ? `It's a ${result.label}! Your drawing looked most like the ${result.closestLabel} drawings I learned from.`
              : `Is it a ${result.label}? Your drawing looked like my ${result.closestLabel} examples. I only learned from ${examples.length} tiny drawings!`}
          </PipSays>
          {result.label !== target && !taught && (
            <button
              type="button"
              className="btn btn-big btn-sun"
              onClick={() => {
                const next = [...examples, drawingExample(cells, target)];
                setExamples(next);
                setTaught(true);
                setResult(guessDrawing(cells, next));
              }}
            >
              <Emo e="➕" /> Teach Pip: this is a {name}
            </button>
          )}
          {taught && <p className="tm-yes center">You added an example. More examples = better guesses!</p>}
          <button
            type="button"
            className="btn btn-plain"
            onClick={() => {
              setTarget(null);
              setCells(Array(DRAW * DRAW).fill(false));
              setResult(null);
              setTaught(false);
            }}
          >
            <Emo e="🎨" /> Draw something else
          </button>
        </div>
      )}
    </div>
  );
}

export function PixelPeek({ onDone, color }: GameProps) {
  const [part, setPart] = useState<1 | 2>(1);
  const [peekDone, setPeekDone] = useState(false);
  return (
    <div className="game pp">
      <GameHead
        title="Pixel Peek"
        say="A picture is hiding! Peek at a few pixels at a time. Guess what it is before Pip does. Then draw a picture for Pip to guess."
      >
        A picture is hiding! Peek at a few pixels at a time and guess what it is. Pip guesses too. Then draw a picture for Pip.
      </GameHead>
      {part === 1 ? (
        <>
          <Peek
            onFinished={() => {
              setPeekDone(true);
              onDone();
            }}
          />
          {peekDone && (
            <p className="center">
              <button type="button" className="btn btn-big btn-go pop" onClick={() => setPart(2)}>
                <Emo e="🎨" /> Now draw for Pip!
              </button>
            </p>
          )}
        </>
      ) : (
        <Paint color={color} />
      )}
    </div>
  );
}

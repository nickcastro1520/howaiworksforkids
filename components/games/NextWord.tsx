"use client";

import { useMemo, useRef, useState } from "react";
import { buildBigrams, nextWords, STORY_CORPUS } from "@/lib/ml";
import { Pip } from "../Pip";
import { Dots, GameHead, PipSays, shuffle, type GameProps } from "./ui";

const ROUNDS: { start: string; options: [string, number][] }[] = [
  { start: "Once upon a", options: [["time", 86], ["hill", 6], ["dragon", 5], ["sock", 3]] },
  { start: "Brush your", options: [["teeth", 81], ["hair", 16], ["dog", 3]] },
  { start: "Twinkle, twinkle, little", options: [["star", 94], ["car", 4], ["bat", 2]] },
  { start: "Peanut butter and", options: [["jelly", 78], ["jam", 14], ["bananas", 8]] },
  { start: "The cow says", options: [["moo", 90], ["hello", 7], ["quack", 3]] },
];

const MAX_WORDS = 14;

function Bars({ options, pick }: { options: [string, number][]; pick: string }) {
  return (
    <div className="guess-bars live">
      {options.map(([w, p], i) => (
        <div key={w} className={`guess-bar-row ${w === pick ? "is-pick" : ""}`}>
          <span>{w}</span>
          <span className="guess-bar">
            <span className="grow-x" style={{ width: `${Math.max(p, 3)}%`, animationDelay: `${i * 0.12}s` }} />
          </span>
          <b>{p}%</b>
        </div>
      ))}
    </div>
  );
}

function StoryBuilder({ onFinish }: { onFinish: () => void }) {
  const counts = useMemo(() => buildBigrams(STORY_CORPUS), []);
  const [words, setWords] = useState<string[]>(["once", "upon", "a", "time"]);
  const ended = words[words.length - 1] === "." || words.length >= MAX_WORDS + 4;
  const choices = ended ? [] : nextWords(counts, words, 4).filter((c) => words.length >= 10 || c.word !== ".").slice(0, 3);
  const finishedOnce = useRef(false);

  function add(w: string) {
    const next = [...words, w];
    setWords(next);
    if ((w === "." || next.length >= MAX_WORDS + 4) && !finishedOnce.current) {
      finishedOnce.current = true;
      onFinish();
    }
  }

  const text = words
    .join(" ")
    .replace(/ \./g, ".")
    .replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="story-builder">
      <div className="story-page">
        <p className="story-text">
          {text}
          {!ended && <span className="caret" aria-hidden="true" />}
          {ended && words[words.length - 1] !== "." && "\u2026"}
        </p>
        {ended && <p className="the-end">The End!</p>}
      </div>
      {!ended ? (
        <>
          <p className="builder-q">Pip&rsquo;s best guesses for the next word:</p>
          <div className="word-choices">
            {choices.map((c, i) => (
              <button key={c.word} type="button" className="word-choice" onClick={() => add(c.word)}>
                <span className="wc-word">{c.word === "." ? "(end)" : c.word}</span>
                <span className="wc-bar">
                  <span style={{ width: `${c.chance}%` }} />
                </span>
                <span className="wc-pct">
                  {i === 0 ? "Pip's top pick \u00b7 " : ""}
                  {c.chance}%
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="ask-btns">
          <button type="button" className="btn btn-plain" onClick={() => setWords(["once", "upon", "a", "time"])}>
            Make another story
          </button>
        </div>
      )}
    </div>
  );
}

export function NextWord({ onDone }: GameProps) {
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [phase, setPhase] = useState<"guess" | "build" | "done">("guess");
  const shuffled = useMemo(() => ROUNDS.map((r) => shuffle(r.options.map(([w]) => w))), []);
  const r = ROUNDS[round];
  const top = r?.options[0][0];

  function choose(w: string) {
    if (pick) return;
    setPick(w);
    setResults((x) => [...x, w === top]);
  }

  function next() {
    if (round + 1 >= ROUNDS.length) {
      setPhase("build");
    } else {
      setRound(round + 1);
      setPick(null);
    }
  }

  return (
    <div className="game">
      <GameHead
        title={phase === "guess" ? "Next Word!" : "Story Builder"}
        right={phase === "guess" ? <Dots total={ROUNDS.length} results={results} /> : <span>Part 2</span>}
      >
        {phase === "guess"
          ? "What word comes next? Pick one. Then see what Pip guessed."
          : "Build a story with Pip, one word at a time. Tap a word to add it. Pip counted which words come next in a pile of little stories."}
      </GameHead>

      {phase === "guess" && r && (
        <div className="nw-stage">
          <p className="nw-sentence" key={round}>
            {r.start} <span className={`nw-blank ${pick ? "is-filled" : ""}`}>{pick ?? "____"}</span>
          </p>
          <div className="word-grid">
            {shuffled[round].map((w) => (
              <button
                key={w}
                type="button"
                className={`word-btn ${pick === w ? (w === top ? "is-right" : "is-picked") : ""} ${pick && w === top ? "is-top" : ""}`}
                onClick={() => choose(w)}
                disabled={Boolean(pick)}
              >
                {w}
              </button>
            ))}
          </div>
          {pick && (
            <div className="nw-reveal">
              <div className="nw-pip">
                <Pip mood={pick === top ? "proud" : "wow"} size={80} bob={false} />
                <p>
                  {pick === top ? (
                    <>
                      <b>Same as me!</b> We both learned that pattern.
                    </>
                  ) : (
                    <>
                      <b>Fun pick!</b> I guessed &ldquo;{top}&rdquo; because it came next most often in what I read.
                    </>
                  )}
                </p>
              </div>
              <Bars options={r.options} pick={pick} />
              <button type="button" className="btn btn-big btn-go" onClick={next}>
                {round + 1 >= ROUNDS.length ? "Now build a story!" : "Next one"}
              </button>
            </div>
          )}
        </div>
      )}

      {phase !== "guess" && (
        <>
          <StoryBuilder
            onFinish={() => {
              setPhase("done");
              onDone();
            }}
          />
          {phase === "done" && (
            <div className="game-panel">
              <PipSays mood="proud">
                You just did what a chatbot does: pick the next word, again and again. Real chatbots read billions of words, so their guesses
                sound smarter. But it&rsquo;s still guessing!
              </PipSays>
            </div>
          )}
        </>
      )}
    </div>
  );
}

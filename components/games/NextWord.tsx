"use client";

import { useMemo, useRef, useState } from "react";
import { buildBigrams, nextWords, STORY_CORPUS } from "@/lib/ml";
import { SayButton, SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, shuffle, type GameProps } from "./ui";

/** Picture clues for words, so kids who can't read yet can still pick. */
const WORD_EMOJI: Record<string, string> = {
  time: "\u23F0", hill: "\u26F0\uFE0F", dragon: "\u{1F409}", sock: "\u{1F9E6}",
  teeth: "\u{1F9B7}", hair: "\u{1F487}", dog: "\u{1F436}",
  star: "\u2B50", car: "\u{1F697}", bat: "\u{1F987}",
  jelly: "\u{1F347}", jam: "\u{1F353}", bananas: "\u{1F34C}",
  moo: "\u{1F42E}", hello: "\u{1F44B}", quack: "\u{1F986}",
  robot: "\u{1F916}", cat: "\u{1F431}", box: "\u{1F4E6}", hat: "\u{1F3A9}", magic: "\u2728",
  pancakes: "\u{1F95E}", pancake: "\u{1F95E}", dance: "\u{1F483}", rain: "\u{1F327}\uFE0F", sleep: "\u{1F634}",
  sun: "\u2600\uFE0F", park: "\u{1F333}", moon: "\u{1F319}", tag: "\u{1F3C3}", home: "\u{1F3E0}", fly: "\u{1F54A}\uFE0F",
  happy: "\u{1F60A}", silly: "\u{1F92A}", red: "\u{1F534}", blue: "\u{1F535}", eat: "\u{1F37D}\uFE0F", ate: "\u{1F37D}\uFE0F",
  little: "\u{1F90F}", tiny: "\u{1F90F}", big: "\u{1F418}", played: "\u{1F3B2}", ".": "\u{1F3C1}",
};

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
        <SayButton text={text} label="the story so far" className="say-corner" />
      </div>
      {!ended ? (
        <>
          <div className="say-row">
            <p className="builder-q">Pip&rsquo;s best guesses for the next word:</p>
            <SayLine
              text={`Pip's best guesses for the next word: ${choices.map((c) => (c.word === "." ? "the end" : c.word)).join(", or ")}.`}
              label="Pip's guesses"
            />
          </div>
          <div className="word-choices">
            {choices.map((c, i) => (
              <Sayable key={c.word} text={c.word === "." ? "The end" : c.word}>
              <button type="button" className="word-choice" onClick={() => add(c.word)}>
                <span className="wc-word">
                  {WORD_EMOJI[c.word] && <Emo e={WORD_EMOJI[c.word]} />} {c.word === "." ? "(the end)" : c.word}
                </span>
                <span className="wc-bar">
                  <span style={{ width: `${c.chance}%` }} />
                </span>
                <span className="wc-pct">
                  {i === 0 ? "Pip's top pick \u00b7 " : ""}
                  {c.chance}%
                </span>
              </button>
              </Sayable>
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
          <div className="say-row">
            <p className="nw-sentence" key={round}>
              {r.start} <span className={`nw-blank ${pick ? "is-filled" : ""}`}>{pick ?? "____"}</span>
            </p>
            <SayLine
              key={round}
              text={`${r.start}, blank. What comes next? ${shuffled[round].join(", or ")}?`}
              label="the sentence and choices"
              size="md"
            />
          </div>
          <div className="word-grid">
            {shuffled[round].map((w) => (
              <Sayable key={w} text={w}>
                <button
                  type="button"
                  className={`word-btn ${pick === w ? (w === top ? "is-right" : "is-picked") : ""} ${pick && w === top ? "is-top" : ""}`}
                  onClick={() => choose(w)}
                  disabled={Boolean(pick)}
                >
                  {WORD_EMOJI[w] && <Emo e={WORD_EMOJI[w]} big />}
                  {w}
                </button>
              </Sayable>
            ))}
          </div>
          {pick && (
            <div className="nw-reveal">
              <PipSays mood={pick === top ? "proud" : "wow"} size={80}>
                {pick === top ? (
                  <>
                    <b>Same as me!</b> We both learned that pattern.
                  </>
                ) : (
                  <>
                    <b>Fun pick!</b> I guessed &ldquo;{top}&rdquo; because it came next most often in what I read.
                  </>
                )}
              </PipSays>
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

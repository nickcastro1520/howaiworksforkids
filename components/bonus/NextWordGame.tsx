"use client";

import { useState } from "react";
import { BONUS, freshSeed, NEXT_WORD_ROUND, nextWordRound } from "@/lib/bonus";
import { saveScore, useBest } from "@/lib/bonusScores";
import { play } from "@/lib/sound";
import { Pip } from "../Pip";

const GAME = BONUS.nextWord.slug;

export function NextWordGame() {
  const best = useBest(GAME);
  const [round, setRound] = useState(() => nextWordRound(1));
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const item = round[q];

  function start() {
    setRound(nextWordRound(freshSeed()));
    setQ(0);
    setPicked(null);
    setScore(0);
    setNewBest(false);
    setPhase("play");
  }

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === item.answer) {
      setScore((s) => s + 1);
      play("correct");
    } else play("oops");
  }

  function next() {
    if (q + 1 >= round.length) {
      setPhase("done");
      setNewBest(saveScore(GAME, score));
      play("badge");
    } else {
      setQ(q + 1);
      setPicked(null);
    }
  }

  if (phase !== "play") {
    return (
      <div className="bonus-card bonus-start">
        <Pip mood={phase === "done" ? "proud" : "think"} size={110} bob={false} />
        {phase === "done" ? (
          <div aria-live="polite">
            <p className="bonus-big">
              You guessed <b>{score} of {round.length}</b> like a chatbot!
            </p>
            {newBest ? <p className="bonus-best is-new">🏆 New best score!</p> : best !== null && <p className="bonus-best">Your best: {best} of {NEXT_WORD_ROUND}</p>}
            <p>A chatbot does this over and over: it picks a likely next word, then the next, then the next. That&rsquo;s how it writes a whole answer!</p>
          </div>
        ) : (
          <div>
            <p className="bonus-big">Pip reads the start of a sentence. Which word most likely comes next?</p>
            <p>{NEXT_WORD_ROUND} sentences. No timer. Pick from 3 words and find out why.</p>
            {best !== null && (
              <p className="bonus-best">
                Your best: {best} of {NEXT_WORD_ROUND}
              </p>
            )}
          </div>
        )}
        <button type="button" className="btn btn-huge btn-go" onClick={start}>
          {phase === "done" ? "Play again" : "Start"} <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    );
  }

  const right = picked !== null && picked === item.answer;
  return (
    <div className="bonus-card nw-game">
      <div className="bonus-hud">
        <span className="bonus-chip">
          {q + 1} of {round.length}
        </span>
        <span className="bonus-chip">
          <span aria-hidden="true">⭐</span> Score {score}
        </span>
      </div>
      <div className="nw-sentence">
        <Pip mood={picked === null ? "think" : right ? "proud" : "oops"} size={72} bob={false} />
        <p key={q}>{item.sentence}</p>
      </div>
      <div className="nw-opts" role="group" aria-label="Pick the next word">
        {item.options.map((o, i) => (
          <button
            key={o}
            type="button"
            data-no-tap
            className={`nw-opt ${picked !== null && i === item.answer ? "is-right" : ""} ${picked === i && i !== item.answer ? "is-wrong" : ""}`}
            onClick={() => choose(i)}
            aria-pressed={picked === i}
            disabled={picked !== null && picked !== i && i !== item.answer}
          >
            {o}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="nw-why">
        {picked !== null && (
          <>
            <p className={right ? "is-ok" : "is-no"}>{item.why[picked]}</p>
            {!right && <p>{item.why[item.answer]}</p>}
            <button type="button" className="btn btn-big btn-go" onClick={next}>
              {q + 1 >= round.length ? "See my score" : "Next sentence"} <span aria-hidden="true">&rarr;</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

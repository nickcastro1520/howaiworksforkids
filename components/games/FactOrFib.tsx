"use client";

import { useState } from "react";
import { Book } from "../art/Props";
import { Pip } from "../Pip";
import { Dots, GameHead, PipSays, type GameProps } from "./ui";

const CLAIMS = [
  { say: "Spiders have 6 legs.", fact: false, truth: "Spiders have 8 legs. Insects, like ants, have 6." },
  { say: "The sun is a star.", fact: true, truth: "Yes! The sun is a star. It's the closest star to Earth." },
  { say: "Penguins fly high in the sky.", fact: false, truth: "Penguins can't fly. Their wings work like flippers for swimming." },
  { say: "An octopus has three hearts.", fact: true, truth: "True! An octopus has three hearts." },
  { say: "The moon is made of cheese.", fact: false, truth: "The moon is made of rock and dust. No cheese!" },
  { say: "A baby kangaroo is called a joey.", fact: true, truth: "Yes! A baby kangaroo is a joey. It rides in its mom's pouch." },
];

export function FactOrFib({ onDone }: GameProps) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<boolean | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [done, setDone] = useState(false);
  const c = CLAIMS[i];

  function choose(saysFact: boolean) {
    if (pick !== null) return;
    setPick(saysFact);
    setResults((r) => [...r, saysFact === c.fact]);
  }

  function next() {
    if (i + 1 >= CLAIMS.length) {
      setDone(true);
      onDone();
    } else {
      setI(i + 1);
      setPick(null);
    }
  }

  const score = results.filter(Boolean).length;

  return (
    <div className="game">
      <GameHead title="Fact or Fib?" right={<Dots total={CLAIMS.length} results={results} />}>
        Pip will say something. Is it a fact (true) or a fib (not true)? Then check the Fact Book.
      </GameHead>

      {!done ? (
        <div className="fof">
          <div className="fof-pip" key={i}>
            <Pip mood="proud" size={110} bob={false} />
            <div className="fof-bubble pop">
              <span className="sure-badge">Sure-o-meter: 100%</span>
              <p>&ldquo;{c.say}&rdquo;</p>
            </div>
          </div>

          {pick === null ? (
            <div className="ask-btns">
              <button type="button" className="btn btn-big btn-yes" onClick={() => choose(true)}>
                Fact
              </button>
              <button type="button" className="btn btn-big btn-no" onClick={() => choose(false)}>
                Fib
              </button>
            </div>
          ) : (
            <div className="factbook pop">
              <div className="factbook-head">
                <Book size={54} color="#c97a00" />
                <span>The Fact Book says&hellip;</span>
              </div>
              <p className={`factbook-verdict ${c.fact ? "is-fact" : "is-fib"}`}>{c.fact ? "FACT" : "FIB"}</p>
              <p className="factbook-truth">{c.truth}</p>
              <p className="factbook-you">{pick === c.fact ? "You got it!" : "Tricky one! Pip fooled you."}</p>
              <button type="button" className="btn btn-big btn-go" onClick={next}>
                {i + 1 >= CLAIMS.length ? "See my score" : "Next one"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="game-panel">
          <p className="big-score">
            {score}/{CLAIMS.length}
          </p>
          <PipSays mood="think">
            Did you notice? My Sure-o-meter said <b>100% every single time</b>, even when I was totally wrong. That&rsquo;s why smart people check.
          </PipSays>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Book } from "../art/Props";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

type Page = {
  ask: string;
  emoji: string;
  lines: string[];
  wrong: number;
  fact: string;
  fixed: string;
  fixes: { text: string; emoji: string; good: boolean; reply: string }[];
};

const PAGES: Page[] = [
  {
    ask: "Tell me about spiders.",
    emoji: "🕷️",
    lines: ["Spiders can spin silk.", "Spiders have 6 legs.", "Many spiders eat bugs."],
    wrong: 1,
    fact: "Spiders have 8 legs.",
    fixed: "Spiders have 8 legs.",
    fixes: [
      { text: "WRONG!", emoji: "❌", good: false, reply: "Oops! But which part is wrong? I don't know what to fix." },
      { text: "Spiders have 8 legs. Please fix line 2.", emoji: "🛠️", good: true, reply: "" },
      { text: "Try again.", emoji: "🔁", good: false, reply: "Okay! Spiders have 10 legs. Hmm, that's still wrong. I needed to know what to fix." },
    ],
  },
  {
    ask: "Tell me about the moon.",
    emoji: "🌙",
    lines: ["The moon is made of cheese.", "The moon goes around Earth.", "You can often see the moon at night."],
    wrong: 0,
    fact: "The moon is made of rock and dust.",
    fixed: "The moon is made of rock and dust.",
    fixes: [
      { text: "Try again.", emoji: "🔁", good: false, reply: "Okay! The moon is made of ice cream. Hmm, still wrong. Tell me what to fix!" },
      { text: "Bad Pip!", emoji: "😠", good: false, reply: "Sorry! But what should I change? I can't tell." },
      { text: "The moon is made of rock and dust. Please fix line 1.", emoji: "🛠️", good: true, reply: "" },
    ],
  },
  {
    ask: "Tell me about bees.",
    emoji: "🐝",
    lines: ["Bees can fly.", "Bees make honey.", "Bees have 2 legs."],
    wrong: 2,
    fact: "Bees have 6 legs. All insects do.",
    fixed: "Bees have 6 legs.",
    fixes: [
      { text: "Bees have 6 legs. Please fix line 3.", emoji: "🛠️", good: true, reply: "" },
      { text: "Try again.", emoji: "🔁", good: false, reply: "Okay! Bees have 4 legs. Still wrong! What's the right number?" },
      { text: "Say nothing.", emoji: "🤐", good: false, reply: "Then I'll never know my homework has a mistake!" },
    ],
  },
];

type Step = "find" | "check" | "fix" | "fixed";

export function PipsHomework({ onDone }: GameProps) {
  const [i, setI] = useState(0);
  const [step, setStep] = useState<Step>("find");
  const [miss, setMiss] = useState<number | null>(null);
  const [badFix, setBadFix] = useState<number | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [firstTry, setFirstTry] = useState(true);
  const p = PAGES[i];
  const done = results.length === PAGES.length;

  function tapLine(n: number) {
    if (step !== "find") return;
    if (n === p.wrong) {
      setMiss(null);
      setStep("check");
    } else {
      setMiss(n);
      setFirstTry(false);
    }
  }

  function pickFix(n: number) {
    if (p.fixes[n].good) {
      setBadFix(null);
      setStep("fixed");
      const r = [...results, firstTry];
      setResults(r);
      if (r.length === PAGES.length) onDone();
    } else {
      setBadFix(n);
      setFirstTry(false);
    }
  }

  function next() {
    setI(i + 1);
    setStep("find");
    setMiss(null);
    setBadFix(null);
    setFirstTry(true);
  }

  const stepText: Record<Step, string> = {
    find: "Find it! Tap the line that is wrong.",
    check: "Check it! Open the Fact Book.",
    fix: "Fix it! What's the best way to ask Pip to fix it?",
    fixed: "Fixed!",
  };

  return (
    <div className="game hw">
      <GameHead
        title="Pip's Homework"
        right={<Dots total={PAGES.length} results={results} />}
        say="Each of Pip's answers has one mistake. Find it: tap the wrong line. Check it in the Fact Book. Then fix it: pick the best way to ask Pip."
      >
        Each of Pip&rsquo;s answers has <b>one</b> mistake. <b>Find it</b> (tap the wrong line), <b>check it</b> in the Fact Book, then{" "}
        <b>fix it</b> by asking Pip the right way.
      </GameHead>

      <div className="game-panel">
        <ol className="hw-steps" aria-label="Steps">
          {(["find", "check", "fix"] as const).map((s, k) => (
            <li key={s} className={step === s || (step === "fixed" && k === 2) ? "is-on" : ""}>
              <Emo e={["🔎", "📖", "🛠️"][k]} /> {["Find it", "Check it", "Fix it"][k]}
            </li>
          ))}
        </ol>

        <div className="hw-sheet" key={i}>
          <p className="hw-ask">
            <Emo e={p.emoji} big /> &ldquo;{p.ask}&rdquo;
          </p>
          <ol className="hw-lines">
            {p.lines.map((line, n) => {
              const isWrong = n === p.wrong;
              const show = step === "fixed" && isWrong ? p.fixed : line;
              const cls = [
                "hw-line",
                step !== "find" && isWrong ? (step === "fixed" ? "is-fixed" : "is-found") : "",
                miss === n ? "is-miss" : "",
              ].join(" ");
              return (
                <li key={n}>
                  <Sayable text={`Line ${n + 1}: ${show}`}>
                    <button type="button" className={cls} onClick={() => tapLine(n)} aria-disabled={step !== "find"}>
                      <span className="hw-n" aria-hidden="true">
                        {n + 1}
                      </span>
                      <span>{show}</span>
                      {step === "fixed" && isWrong && <Emo e="✅" />}
                    </button>
                  </Sayable>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="say-row">
          <p className="ask-q">{done ? "All fixed!" : stepText[step]}</p>
          {!done && <SayLine key={`${i}-${step}`} text={stepText[step]} label="what to do" size="md" />}
        </div>

        {miss !== null && step === "find" && (
          <div className="hint-row">
            <p className="hint">That one&rsquo;s true! Look for the line that sounds wrong.</p>
            <SayLine text="That one's true! Look for the line that sounds wrong." label="the hint" />
          </div>
        )}

        {step === "check" && (
          <button type="button" className="btn btn-big btn-sun" onClick={() => setStep("fix")}>
            <Emo e="📖" /> Check the Fact Book
          </button>
        )}

        {(step === "fix" || step === "fixed") && (
          <div className="factbook pop">
            <div className="factbook-head">
              <Book size={54} color="#a66500" />
              <span>The Fact Book says&hellip;</span>
            </div>
            <p className="factbook-truth">{p.fact}</p>
            <SayLine text={`The Fact Book says: ${p.fact}`} label="the Fact Book" />
          </div>
        )}

        {step === "fix" && (
          <>
            <div className="hw-fixes">
              {p.fixes.map((f, n) => (
                <Sayable key={f.text} text={f.text}>
                  <button type="button" className={`hw-fix ${badFix === n ? "is-wrong" : ""}`} onClick={() => pickFix(n)}>
                    <Emo e={f.emoji} big />
                    <span>&ldquo;{f.text}&rdquo;</span>
                  </button>
                </Sayable>
              ))}
            </div>
            {badFix !== null && <PipSays mood="oops">{p.fixes[badFix].reply}</PipSays>}
          </>
        )}

        {step === "fixed" && (
          <>
            <PipSays mood="proud">Thanks! You told me exactly what was wrong and what&rsquo;s right, so I could fix it.</PipSays>
            {i + 1 < PAGES.length ? (
              <button type="button" className="btn btn-big btn-go" onClick={next}>
                Next page &rarr;
              </button>
            ) : (
              <p className="win-line">Homework checked! Find it, check it, fix it.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

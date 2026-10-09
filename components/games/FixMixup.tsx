"use client";

import { useState } from "react";
import { trainStump, type Critter } from "@/lib/ml";
import { Bird, Fish } from "../art/Bits";
import { Pip } from "../Pip";
import { SayButton, SayLine } from "../Speak";
import { Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

const START: Critter[] = [
  { shape: "fish", color: "blue" },
  { shape: "fish", color: "blue" },
  { shape: "fish", color: "blue" },
  { shape: "bird", color: "red" },
  { shape: "bird", color: "red" },
  { shape: "bird", color: "red" },
];

const TRAY: Critter[] = [
  { shape: "fish", color: "red" },
  { shape: "bird", color: "blue" },
  { shape: "fish", color: "yellow" },
  { shape: "bird", color: "yellow" },
  { shape: "fish", color: "blue" },
  { shape: "bird", color: "red" },
];

const FINAL_TEST: Critter[] = [
  { shape: "fish", color: "red" },
  { shape: "bird", color: "blue" },
  { shape: "fish", color: "yellow" },
];

function Animal({ c, size = 72 }: { c: Critter; size?: number }) {
  return c.shape === "fish" ? <Fish color={c.color} size={size} /> : <Bird color={c.color} size={size} />;
}

const label = (c: Critter) => `${c.color} ${c.shape}`;

export function FixMixup({ onDone }: GameProps) {
  const [data, setData] = useState<Critter[]>(START);
  const [added, setAdded] = useState<number[]>([]);
  const [step, setStep] = useState<"intro" | "oops" | "why" | "fix" | "retest" | "done">("intro");
  const [whyWrong, setWhyWrong] = useState<string | null>(null);
  const [tested, setTested] = useState(0);

  const model = trainStump(data);
  const firstGuess = trainStump(START).predict({ shape: "fish", color: "red" });

  function add(i: number) {
    if (added.includes(i)) return;
    setAdded([...added, i]);
    setData([...data, TRAY[i]]);
  }

  function retest() {
    setStep("retest");
    setTested(0);
    FINAL_TEST.forEach((_, i) => window.setTimeout(() => setTested(i + 1), 550 * (i + 1)));
  }

  const allRight = FINAL_TEST.every((c) => model.predict(c) === c.shape);
  const colorScore = Math.round((model.scores.find((s) => s.clue === "color")?.accuracy ?? 0) * 100);
  const shapeScore = Math.round((model.scores.find((s) => s.clue === "shape")?.accuracy ?? 0) * 100);

  return (
    <div className="game">
      <GameHead title="Fix Pip's Mix-up" right={<span>Pip&rsquo;s clue: <b>{model.clue === "color" ? "COLOR" : "SHAPE"}</b></span>}>
        Pip learned fish and birds from these pictures. Let&rsquo;s test Pip and fix any mix-ups.
      </GameHead>

      <div className="mix-training">
        <p className="small-cap">Pip&rsquo;s examples ({data.length})</p>
        <div className="mix-cards">
          {data.map((c, i) => (
            <span key={i} className={`mix-card ${i >= START.length ? "drop-in is-new" : ""}`} title={label(c)}>
              <Animal c={c} size={54} />
              <span className="mix-tag">{c.shape}</span>
            </span>
          ))}
        </div>
      </div>

      {step === "intro" && (
        <div className="game-panel">
          <PipSays mood="happy">I studied hard! Show me a new picture and I&rsquo;ll tell you if it&rsquo;s a fish or a bird.</PipSays>
          <Sayable text="Test Pip with a new picture">
            <button type="button" className="btn btn-big btn-go" onClick={() => setStep("oops")}>
              <Emo e={"\u{1F50D}"} /> Test Pip with a new picture
            </button>
          </Sayable>
        </div>
      )}

      {(step === "oops" || step === "why") && (
        <div className="game-panel">
          <div className="test-row">
            <span className="mix-card big pop">
              <Animal c={{ shape: "fish", color: "red" }} size={120} />
            </span>
            <div className="pip-guess">
              <Pip mood="proud" size={90} bob={false} />
              <div className="pip-says-bubble big-bubble wrong-glow">
                <span className="small-cap">I&rsquo;m sure! It&rsquo;s a&hellip;</span>
                <span className="guess-team">{firstGuess === "bird" ? "Bird!" : "Fish!"}</span>
                <SayLine text={`I'm sure! It's a ${firstGuess === "bird" ? "bird" : "fish"}!`} label="Pip's guess" />
              </div>
            </div>
          </div>
          {step === "oops" ? (
            <div className="ask">
              <div className="ask-q-row">
                <p className="ask-q">Is Pip right?</p>
                <SayLine text="Is Pip right? No, that's a fish! Or: yes." label="the question" size="md" />
              </div>
              <div className="ask-btns">
                <Sayable text="No! That's a fish!">
                  <button type="button" className="btn btn-big btn-no" onClick={() => setStep("why")}>
                    <Emo e={"\u{1F41F}"} /> No! That&rsquo;s a fish!
                  </button>
                </Sayable>
                <Sayable text="Yes">
                  <button type="button" className="btn btn-big btn-plain" onClick={() => setWhyWrong("Look again! It has fins and a tail. It's a fish.")}>
                    <Emo e={"\u{1F44D}"} /> Yes
                  </button>
                </Sayable>
              </div>
              {whyWrong && (
                <div className="hint-row">
                  <p className="hint">{whyWrong}</p>
                  <SayLine text={whyWrong} label="the hint" />
                </div>
              )}
            </div>
          ) : (
            <div className="ask">
              <div className="ask-q-row">
                <p className="ask-q">Why did Pip think it was a bird? What clue did Pip use?</p>
                <SayLine
                  text="Why did Pip think it was a bird? What clue did Pip use? Its color? Its size? Or, Pip was sleepy?"
                  label="the question and answers"
                  size="md"
                />
              </div>
              <div className="ask-btns three">
                {(
                  [
                    ["Its color", true, "\u{1F3A8}"],
                    ["Its size", false, "\u{1F4CF}"],
                    ["Pip was sleepy", false, "\u{1F634}"],
                  ] as const
                ).map(([t, ok, e]) => (
                  <Sayable key={t} text={t}>
                    <button
                      type="button"
                      className="btn btn-plain"
                      onClick={() =>
                        ok ? (setWhyWrong(null), setStep("fix")) : setWhyWrong("Hint: look at Pip's examples. What's the same about every bird?")
                      }
                    >
                      <Emo e={e} /> {t}
                    </button>
                  </Sayable>
                ))}
              </div>
              {whyWrong && (
                <div className="hint-row">
                  <p className="hint">{whyWrong}</p>
                  <SayLine text={whyWrong} label="the hint" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {(step === "fix" || step === "retest" || step === "done") && (
        <div className="game-panel">
          {step === "fix" && (
            <PipSays mood="oops">
              You found my sneaky shortcut! Every bird I saw was red, so I thought <b>red means bird</b>. Add new examples so color stops working as a clue.
            </PipSays>
          )}

          <div className="clue-meter" aria-label={`Color clue fits ${colorScore}% of examples. Shape clue fits ${shapeScore}%.`}>
            <p className="small-cap">How well each clue fits Pip&rsquo;s examples</p>
            <div className="guess-bar-row">
              <span>Color</span>
              <span className="guess-bar">
                <span style={{ width: `${colorScore}%`, background: "#cb4834" }} />
              </span>
              <b>{colorScore}%</b>
            </div>
            <div className="guess-bar-row">
              <span>Shape</span>
              <span className="guess-bar">
                <span style={{ width: `${shapeScore}%`, background: "#2774d1" }} />
              </span>
              <b>{shapeScore}%</b>
            </div>
            <p className="muted">Pip uses the clue that fits best. When there&rsquo;s a tie, Pip picks color, because it&rsquo;s easiest to see.</p>
            <SayButton
              text={`Color fits ${colorScore} percent of Pip's examples. Shape fits ${shapeScore} percent. Pip uses the clue that fits best. When there's a tie, Pip picks color, because it's easiest to see.`}
              label="the clue meter"
              className="say-corner"
            />
          </div>

          {step !== "done" && (
            <>
              <div className="ask-q-row">
                <p className="ask-q">Tap pictures to add them to Pip&rsquo;s examples:</p>
                <SayLine text="Tap pictures to add them to Pip's examples. Then tap Test Pip again." label="what to do" size="md" />
              </div>
              <div className="tray">
                {TRAY.map((c, i) => (
                  <button key={i} type="button" className={`tray-card ${added.includes(i) ? "is-added" : ""}`} onClick={() => add(i)} disabled={added.includes(i)}>
                    <Animal c={c} size={70} />
                    <span>
                      {c.color} {c.shape}
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-big btn-go" onClick={retest} disabled={added.length === 0}>
                <Emo e={"\u{1F9EA}"} /> Test Pip again
              </button>
            </>
          )}

          {(step === "retest" || step === "done") && (
            <div className="retest">
              {FINAL_TEST.map((c, i) => {
                const g = model.predict(c);
                const show = tested > i;
                return (
                  <div key={i} className={`retest-card ${show ? (g === c.shape ? "ok" : "bad") : ""}`}>
                    <Animal c={c} size={72} />
                    <span>{show ? `Pip: ${g}${g === c.shape ? " \u2713" : " \u2717"}` : "\u2026"}</span>
                  </div>
                );
              })}
            </div>
          )}

          {step === "retest" && tested >= FINAL_TEST.length && (
            allRight ? (
              <>
                <PipSays mood="proud">
                  All right! Now I use <b>shape</b>: fins mean fish, wings mean bird. Better examples fixed me!
                </PipSays>
                <button
                  type="button"
                  className="btn btn-big btn-go"
                  onClick={() => {
                    setStep("done");
                    onDone();
                  }}
                >
                  <Emo e={"\u{1F389}"} /> Yay! Finish the game
                </button>
              </>
            ) : (
              <>
                <PipSays mood="oops">
                  Still mixed up! Color still works as a shortcut in my examples. Try adding a fish or bird that breaks the color rule.
                </PipSays>
                <button type="button" className="btn btn-plain" onClick={() => setStep("fix")}>
                  <Emo e={"\u2795"} /> Add more examples
                </button>
              </>
            )
          )}
          {step === "done" && (
            <div className="win-row">
              <p className="win-line">Mix-up fixed! You taught Pip with fair, mixed-up examples.</p>
              <SayLine text="Mix-up fixed! You taught Pip with fair, mixed-up examples." label="the result" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

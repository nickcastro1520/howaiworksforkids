"use client";

import { useMemo, useRef, useState } from "react";
import { knnGuess, type Example } from "@/lib/ml";
import { Glorb, type GlorbData } from "../art/Bits";
import { Pip } from "../Pip";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, shuffle, type GameProps } from "./ui";

type F = "color" | "eyes" | "top" | "spots" | "shape";
const KEYS: F[] = ["color", "eyes", "top", "spots", "shape"];
const CLUE_NAME: Record<F, string> = { color: "Color", eyes: "Eyes", top: "Horns or antennas", spots: "Spots", shape: "Shape" };

const TEACH: GlorbData[] = [
  { color: "teal", eyes: 1, top: "horns", spots: true, shape: "round" },
  { color: "orange", eyes: 2, top: "antenna", spots: false, shape: "tall" },
  { color: "teal", eyes: 3, top: "antenna", spots: false, shape: "round" },
  { color: "orange", eyes: 1, top: "horns", spots: true, shape: "round" },
  { color: "teal", eyes: 2, top: "horns", spots: false, shape: "tall" },
  { color: "orange", eyes: 3, top: "antenna", spots: true, shape: "tall" },
  { color: "teal", eyes: 1, top: "antenna", spots: true, shape: "tall" },
  { color: "orange", eyes: 2, top: "horns", spots: false, shape: "round" },
];

const ALL: GlorbData[] = [];
for (const color of ["teal", "orange"] as const)
  for (const eyes of [1, 2, 3] as const)
    for (const top of ["horns", "antenna"] as const)
      for (const spots of [true, false])
        for (const shape of ["round", "tall"] as const) ALL.push({ color, eyes, top, spots, shape });

const key = (g: GlorbData) => `${g.color}-${g.eyes}-${g.top}-${g.spots}-${g.shape}`;
const feats = (g: GlorbData): Record<F, string> => ({
  color: g.color,
  eyes: String(g.eyes),
  top: g.top,
  spots: String(g.spots),
  shape: g.shape,
});

const TEAMS = { star: "Team Star", cloud: "Team Cloud" } as const;
type Team = keyof typeof TEAMS;
const ROUNDS = 8;

function TeamIcon({ team }: { team: Team }) {
  return team === "star" ? (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="#ffd34d" stroke="#231d4f" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="24" height="22" aria-hidden="true">
      <path d="M7 19h10a5 5 0 0 0 .6-10A6.5 6.5 0 0 0 5.2 10.4 4.4 4.4 0 0 0 7 19z" fill="#d6ecff" stroke="#231d4f" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function SortGlorbs({ onDone }: GameProps) {
  const [examples, setExamples] = useState<{ g: GlorbData; team: Team }[]>([]);
  const [phase, setPhase] = useState<"teach" | "test" | "done">("teach");
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [thinking, setThinking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const testPool = useMemo(() => shuffle(ALL.filter((g) => !TEACH.some((t) => key(t) === key(g)))), []);
  const [testIndex, setTestIndex] = useState(0);
  const doneOnce = useRef(false);

  const teachIndex = examples.length;
  const current = phase === "teach" ? TEACH[teachIndex] : testPool[testIndex % testPool.length];

  const data: Example<F>[] = examples.map((e) => ({ features: feats(e.g), label: e.team }));
  const guess = phase === "test" && current ? knnGuess(data, KEYS, feats(current), 3) : null;
  const guessTeam = (guess?.label ?? "star") as Team;

  const stars = examples.filter((e) => e.team === "star");
  const clouds = examples.filter((e) => e.team === "cloud");
  const canTest = stars.length > 0 && clouds.length > 0 && examples.length >= 6;

  const weights = guess?.weights;
  const topClue = weights ? (KEYS.slice().sort((a, b) => weights[b] - weights[a])[0] as F) : null;

  function teach(team: Team) {
    if (!current) return;
    const next = [...examples, { g: current, team }];
    setExamples(next);
    if (next.length === TEACH.length) startTest();
  }

  function startTest() {
    setPhase("test");
    setThinking(true);
    window.setTimeout(() => setThinking(false), 700);
  }

  function judge(right: boolean) {
    if (!current) return;
    const correctTeam: Team = right ? guessTeam : guessTeam === "star" ? "cloud" : "star";
    setExamples((ex) => [...ex, { g: current, team: correctTeam }]);
    const nextResults = [...results, right];
    setResults(nextResults);
    setFeedback(right ? "Yay! Saving that as another example." : `Oops! Thanks for fixing me. That one goes in ${TEAMS[correctTeam]}. Now I know more.`);
    if (nextResults.length >= ROUNDS) {
      setPhase("done");
      if (!doneOnce.current) {
        doneOnce.current = true;
        onDone();
      }
      return;
    }
    setTestIndex((i) => i + 1);
    setThinking(true);
    window.setTimeout(() => setThinking(false), 700);
  }

  const score = results.filter(Boolean).length;
  const firstHalf = results.slice(0, 4).filter(Boolean).length;
  const secondHalf = results.slice(4).filter(Boolean).length;

  return (
    <div className="game">
      <GameHead
        title="Sort the Glorbs"
        right={
          phase === "teach" ? (
            <>
              <b>{examples.length}</b>/8 sorted
            </>
          ) : (
            <Dots total={ROUNDS} results={results} />
          )
        }
      >
        {phase === "teach"
          ? "Make up a secret rule (like \u201corange ones go to Team Star\u201d). Sort each Glorb. Don't tell Pip the rule!"
          : phase === "test"
            ? "Pip guesses the team. Was Pip right? Use YOUR secret rule to decide."
            : "Pip finished the test!"}
      </GameHead>

      {phase === "teach" && current && (
        <div className="sort-stage">
          <div className="sort-card" key={teachIndex}>
            <Glorb g={current} size={150} className="hop-once" />
          </div>
          <div className="sort-btns">
            {(Object.keys(TEAMS) as Team[]).map((t) => (
              <Sayable key={t} text={TEAMS[t]}>
                <button type="button" className={`btn btn-big team-btn team-${t}`} onClick={() => teach(t)}>
                  <TeamIcon team={t} /> {TEAMS[t]}
                </button>
              </Sayable>
            ))}
          </div>
          {canTest && (
            <div className="say-row">
              <button type="button" className="btn btn-plain" onClick={startTest}>
                <Emo e={"\u{1F9EA}"} /> I&rsquo;m done teaching. Test Pip now!
              </button>
              <SayLine text="I'm done teaching. Test Pip now!" label="the test button" />
            </div>
          )}
        </div>
      )}

      {phase === "test" && current && (
        <div className="test-stage">
          <div className="test-row">
            <div className="sort-card" key={testIndex}>
              <Glorb g={current} size={140} className="hop-once" />
            </div>
            <div className="pip-guess">
              <Pip mood={thinking ? "think" : guess && guess.confidence === 1 ? "proud" : "happy"} size={96} bob={false} />
              <div className="pip-says-bubble big-bubble" aria-live="polite">
                {thinking ? (
                  <span className="thinking-dots">Hmm, let me think<i>.</i><i>.</i><i>.</i></span>
                ) : (
                  <>
                    <span className="small-cap">{guess && guess.confidence === 1 ? "I'm pretty sure:" : "My guess:"}</span>
                    <span className={`guess-team team-${guessTeam}`}>
                      <TeamIcon team={guessTeam} /> {TEAMS[guessTeam]}
                    </span>
                    <SayLine
                      key={testIndex}
                      text={`${guess && guess.confidence === 1 ? "I'm pretty sure" : "My guess"}: ${TEAMS[guessTeam]}. Was I right, or wrong?`}
                      label="Pip's guess"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {!thinking && guess && (
            <>
              <div className="ask-btns">
                <Sayable text="Right!">
                  <button type="button" className="btn btn-big btn-yes" onClick={() => judge(true)}>
                    <Emo e={"\u2705"} /> Right!
                  </button>
                </Sayable>
                <Sayable text="Wrong">
                  <button type="button" className="btn btn-big btn-no" onClick={() => judge(false)}>
                    <Emo e={"\u274C"} /> Wrong
                  </button>
                </Sayable>
              </div>
              <div className="why-box">
                <p className="why-title">Why did Pip guess that? It looks most like these examples:</p>
                <div className="why-row">
                  {guess.neighbors.map((n, i) => {
                    const t = n.label as Team;
                    const g = ALL.find((a) => key(a) === `${n.features.color}-${n.features.eyes}-${n.features.top}-${n.features.spots}-${n.features.shape}`)!;
                    return (
                      <span key={i} className={`why-ex team-${t}`}>
                        <Glorb g={g} size={52} />
                        <TeamIcon team={t} />
                      </span>
                    );
                  })}
                </div>
                {topClue && weights && weights[topClue] > 0.2 && (
                  <p className="why-clue">
                    Pip&rsquo;s best clue so far: <b>{CLUE_NAME[topClue]}</b>
                  </p>
                )}
              </div>
            </>
          )}
          {feedback && !thinking && (
            <div className="say-row">
              <p className="muted center">{feedback}</p>
              <SayLine text={feedback} label="Pip's answer" />
            </div>
          )}
        </div>
      )}

      {phase === "done" && (
        <div className="game-panel">
          <PipSays mood="proud">
            I got <b>{score} of {ROUNDS}</b> right!{" "}
            {secondHalf > firstHalf
              ? "I got better as you gave me more examples. That's how AI learns!"
              : secondHalf === 4
                ? "I figured out your secret rule!"
                : "Some rules are tricky. More examples would help me even more."}
            {topClue && weights && weights[topClue] > 0.2 && (
              <>
                {" "}
                I think your rule was about <b>{CLUE_NAME[topClue].toLowerCase()}</b>. Was I right?
              </>
            )}
          </PipSays>
        </div>
      )}

      {examples.length > 0 && (
        <div className="baskets">
          {(["star", "cloud"] as Team[]).map((t) => (
            <div key={t} className={`basket team-${t}`}>
              <p className="basket-label">
                <TeamIcon team={t} /> {TEAMS[t]} <span className="muted">({(t === "star" ? stars : clouds).length})</span>
              </p>
              <div className="basket-items">
                {(t === "star" ? stars : clouds).map((e, i) => (
                  <Glorb key={i} g={e.g} size={44} className="drop-in" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

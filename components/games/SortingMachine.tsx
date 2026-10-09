"use client";

import { useState } from "react";
import { JOBS, SAFETY_RULES, guess, kindCheck, type Card, type Job, type Taught } from "@/lib/sorter";
import { Pip } from "../Pip";
import { SayLine } from "../Speak";
import { Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

type Phase = "job" | "teach" | "test" | "fair" | "rule" | "card";
const MIN_EXAMPLES = 6;

function printCard() {
  const html = document.documentElement;
  html.classList.add("print-ai-card");
  const done = () => {
    html.classList.remove("print-ai-card");
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
  window.setTimeout(done, 1500);
}

function Steps({ phase }: { phase: Phase }) {
  const list: [Phase, string, string][] = [
    ["teach", "🍎", "Teach"],
    ["test", "🧪", "Test"],
    ["fair", "⚖️", "Every kind"],
    ["rule", "🛡️", "Safety rule"],
  ];
  const order: Phase[] = ["job", "teach", "test", "fair", "rule", "card"];
  return (
    <ol className="hw-steps" aria-label="Steps">
      {list.map(([p, e, label]) => (
        <li key={p} className={phase === p ? "is-on" : order.indexOf(phase) > order.indexOf(p) ? "is-done" : ""}>
          <Emo e={e} /> {label}
        </li>
      ))}
    </ol>
  );
}

function LabelName({ job, label }: { job: Job; label: 0 | 1 }) {
  const l = job.labels[label];
  return (
    <>
      <Emo e={l.emoji} /> {l.name}
    </>
  );
}

export function SortingMachine({ onDone }: GameProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [phase, setPhase] = useState<Phase>("job");
  const [examples, setExamples] = useState<Taught[]>([]);
  const [t, setT] = useState(0);
  const [judged, setJudged] = useState<"right" | "wrong" | "fixed" | null>(null);
  const [testRight, setTestRight] = useState(0);
  const [kindFixes, setKindFixes] = useState(0);
  const [rule, setRule] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  function pickJob(j: Job) {
    setJob(j);
    setPhase("teach");
    setExamples([]);
    setT(0);
    setJudged(null);
    setTestRight(0);
    setKindFixes(0);
    setRule(null);
  }

  function teach(card: Card, label: 0 | 1) {
    const next = [...examples, { card, label }];
    setExamples(next);
    if (job && next.length >= job.teach.length) setPhase("test");
  }

  if (!job || phase === "job") {
    return (
      <div className="game sorter">
        <GameHead
          title="My Sorting Machine"
          say="Build your very own AI! First, pick a job for your sorting machine. Then teach it with examples, test it, make sure it works for every kind, and give it a safety rule."
        >
          Build your very own AI! Pick a job for your sorting machine, <b>teach</b> it with examples, <b>test</b> it, make sure it works for{" "}
          <b>every kind</b>, and give it a <b>safety rule</b>.
        </GameHead>
        <div className="game-panel">
          <div className="say-row">
            <p className="ask-q">What should your machine sort?</p>
            <SayLine
              text={`What should your machine sort? ${JOBS.map((j) => `${j.title}: ${j.labels[0].name} or ${j.labels[1].name}`).join(". ")}.`}
              label="the question"
              size="md"
            />
          </div>
          <div className="sorter-jobs">
            {JOBS.map((j) => (
              <button key={j.id} type="button" className="sorter-job" onClick={() => pickJob(j)}>
                <Emo e={j.emoji} big />
                <b>{j.title}</b>
                <span>
                  {j.labels[0].emoji} {j.labels[0].name} or {j.labels[1].emoji} {j.labels[1].name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const teachCard = job.teach[examples.length];
  const labelsTaught = new Set(examples.map((e) => e.label)).size;
  const canStopTeaching = examples.length >= MIN_EXAMPLES && labelsTaught === 2;
  const testCard = job.test[t];
  const g = phase === "test" && testCard ? guess(job, examples, testCard) : null;
  const kinds = phase === "fair" ? kindCheck(job, examples) : [];
  const allKindsOk = kinds.every((k) => k.ok);
  const firstBad = kinds.find((k) => !k.ok);
  const badCard = firstBad?.cards.find((x) => !x.right)?.card;

  function judge(ok: boolean) {
    if (ok) {
      setJudged("right");
      setTestRight((n) => n + 1);
    } else setJudged("wrong");
  }

  function fixTest() {
    if (!g) return;
    setExamples([...examples, { card: testCard, label: (1 - g.label) as 0 | 1 }]);
    setJudged("fixed");
  }

  function nextTest() {
    setJudged(null);
    if (t + 1 >= job!.test.length) setPhase("fair");
    else setT(t + 1);
  }

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const ruleText = SAFETY_RULES.find((r) => r.id === rule)?.text ?? "";

  return (
    <div className="game sorter">
      <GameHead
        title="My Sorting Machine"
        right={
          <span className="sorter-count">
            <Emo e={job.emoji} /> {examples.length} examples
          </span>
        }
        say={`Your machine sorts ${job.sorts}. Teach it, test it, check every kind, then pick a safety rule.`}
      >
        Your machine sorts <b>{job.sorts}</b>. Teach it, test it, check every kind, then pick a safety rule.
      </GameHead>

      <div className="game-panel">
        <Steps phase={phase} />

        {phase === "teach" && teachCard && (
          <>
            <div className="say-row">
              <p className="ask-q">
                Teach it! Is this {job.labels[0].name.toLowerCase()} or {job.labels[1].name.toLowerCase()}?
              </p>
              <SayLine
                key={teachCard.id}
                text={`Teach it! A ${teachCard.name}. Is it ${job.labels[0].name} or ${job.labels[1].name}?`}
                label="the question"
                size="md"
              />
            </div>
            <div className="sorter-card pop" key={teachCard.id}>
              <span className="sorter-emoji" aria-hidden="true">
                {teachCard.emoji}
              </span>
              <span>{teachCard.name}</span>
            </div>
            <div className="sort-btns">
              {([0, 1] as const).map((l) => (
                <button key={l} type="button" className={`btn btn-big ${l === 0 ? "btn-yes" : "btn-ai"}`} onClick={() => teach(teachCard, l)}>
                  <LabelName job={job} label={l} />
                </button>
              ))}
            </div>
            <p className="muted center">
              {examples.length < MIN_EXAMPLES
                ? `Give at least ${MIN_EXAMPLES} examples (${examples.length} so far).`
                : "That's enough to test. You can keep teaching, too!"}
            </p>
            {canStopTeaching && (
              <button type="button" className="btn btn-plain" onClick={() => setPhase("test")}>
                <Emo e="🧪" /> Done teaching. Test it!
              </button>
            )}
          </>
        )}

        {examples.length > 0 && (phase === "teach" || phase === "test") && (
          <div className="baskets sorter-baskets">
            {([0, 1] as const).map((l) => {
              const these = examples.filter((e) => e.label === l);
              return (
                <div key={l} className="basket">
                  <p className="basket-label">
                    <LabelName job={job} label={l} /> <span className="muted">({these.length})</span>
                  </p>
                  <div className="basket-items" aria-label={`${job.labels[l].name} examples: ${these.map((e) => e.card.name).join(", ")}`}>
                    {these.map((e) => (
                      <span key={e.card.id} className="drop-in sorter-mini" aria-hidden="true">
                        {e.card.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {phase === "test" && testCard && g && (
          <>
            <div className="say-row">
              <p className="ask-q">
                Test it! New card {t + 1} of {job.test.length}
              </p>
            </div>
            <div className="test-row">
              <div className="sorter-card pop" key={testCard.id}>
                <span className="sorter-emoji" aria-hidden="true">
                  {testCard.emoji}
                </span>
                <span>{testCard.name}</span>
              </div>
              <PipSays mood={judged === "wrong" ? "oops" : judged === "fixed" ? "proud" : "think"}>
                {judged === "fixed" ? (
                  <>
                    Thanks! Now I know a {testCard.name} is <b>{job.labels[1 - g.label].name.toLowerCase()}</b>.
                  </>
                ) : (
                  <>
                    My guess: <b>{job.labels[g.label].name}</b> {job.labels[g.label].emoji}. It looks most like the {g.near.name} {g.near.emoji} you
                    showed me.
                  </>
                )}
              </PipSays>
            </div>
            {judged === null && (
              <div className="ask-btns">
                <button type="button" className="btn btn-big btn-yes" onClick={() => judge(true)}>
                  <Emo e="✅" /> Right
                </button>
                <button type="button" className="btn btn-big btn-no" onClick={() => judge(false)}>
                  <Emo e="❌" /> Wrong
                </button>
              </div>
            )}
            {judged === "wrong" && (
              <button type="button" className="btn btn-big btn-sun" onClick={fixTest}>
                <Emo e="➕" /> Fix it: add the {testCard.name} as a {job.labels[1 - g.label].name.toLowerCase()} example
              </button>
            )}
            {(judged === "right" || judged === "fixed") && (
              <button type="button" className="btn btn-big btn-go" onClick={nextTest}>
                {t + 1 >= job.test.length ? "Check every kind" : "Next card"} &rarr;
              </button>
            )}
          </>
        )}

        {phase === "fair" && (
          <>
            <div className="say-row">
              <p className="ask-q">{allKindsOk ? "Every kind is sorted right!" : "Does it work for every kind?"}</p>
              <SayLine
                text={
                  allKindsOk
                    ? "Every kind is sorted right! Your machine is fair for every kind of card."
                    : `Does it work for every kind? Pip tried more new cards. Some ${firstBad?.kind} cards got sorted wrong. Add an example to fix it.`
                }
                label="the check"
                size="md"
              />
            </div>
            <p className="muted center">
              Pip tried new cards. Next to each card is Pip&rsquo;s guess ({job.labels[0].emoji} or {job.labels[1].emoji}). A red circle means it
              guessed wrong.
            </p>
            <ul className="sorter-kinds">
              {kinds.map((k) => (
                <li key={k.kind} className={k.ok ? "is-ok" : "is-bad"}>
                  <span className="sorter-kind-name">
                    <Emo e={k.ok ? "✅" : "⚠️"} /> {k.kind}
                  </span>
                  <span className="sorter-kind-cards">
                    {k.cards.map((x) => (
                      <span key={x.card.id} className={`sorter-chip ${x.right ? "" : "is-wrong"}`}>
                        <span aria-hidden="true">{x.card.emoji}</span>
                        <span className="sr-only">{x.card.name}:</span> {job.labels[x.guess].emoji}
                        <span className="sr-only">{x.right ? "right" : "wrong"}</span>
                      </span>
                    ))}
                    {k.cards.length === 0 && <span className="muted">All taught already</span>}
                  </span>
                </li>
              ))}
            </ul>
            {!allKindsOk && badCard ? (
              <button
                type="button"
                className="btn btn-big btn-sun"
                onClick={() => {
                  setExamples([...examples, { card: badCard, label: badCard.label }]);
                  setKindFixes((n) => n + 1);
                }}
              >
                <Emo e="➕" /> Teach it: a {badCard.name} is {job.labels[badCard.label].name.toLowerCase()}
              </button>
            ) : (
              <>
                <PipSays mood="proud">
                  {kindFixes > 0 ? "You added the missing kinds. Now it works for every kind!" : "It works for every kind. That's a fair machine!"}
                </PipSays>
                <button type="button" className="btn btn-big btn-go" onClick={() => setPhase("rule")}>
                  Pick a safety rule &rarr;
                </button>
              </>
            )}
          </>
        )}

        {phase === "rule" && (
          <>
            <div className="say-row">
              <p className="ask-q">Every good AI needs a safety rule. Pick one!</p>
              <SayLine
                text={`Every good AI needs a safety rule. Pick one! ${SAFETY_RULES.map((r) => r.text).join(" ")}`}
                label="the safety rules"
                size="md"
              />
            </div>
            <div className="check-opts">
              {SAFETY_RULES.map((r) => (
                <Sayable key={r.id} text={r.text}>
                  <button
                    type="button"
                    className={`check-opt ${rule === r.id ? "is-right" : ""}`}
                    onClick={() => setRule(r.id)}
                    aria-pressed={rule === r.id}
                  >
                    <Emo e={r.emoji} big />
                    <span>{r.text}</span>
                  </button>
                </Sayable>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-big btn-go"
              disabled={!rule}
              onClick={() => {
                setPhase("card");
                if (!finished) {
                  setFinished(true);
                  onDone();
                }
              }}
            >
              <Emo e="🪪" /> Make my AI Card
            </button>
          </>
        )}

        {phase === "card" && (
          <>
            <div className="ai-card pop" id="my-ai-card">
              <div className="ai-card-head">
                <Pip mood="proud" size={70} bob={false} />
                <div>
                  <p className="ai-card-kicker">How AI Works for Kids</p>
                  <h3 className="ai-card-title">My AI Card</h3>
                </div>
              </div>
              <dl className="ai-card-list">
                <div>
                  <dt>My AI sorts</dt>
                  <dd>
                    {job.emoji} {job.sorts}
                  </dd>
                </div>
                <div>
                  <dt>I taught it with</dt>
                  <dd>
                    {examples.length} examples <span aria-hidden="true">{examples.map((e) => e.card.emoji).join(" ")}</span>
                  </dd>
                </div>
                <div>
                  <dt>Test on new cards</dt>
                  <dd>
                    Right the first time: {testRight} of {job.test.length}.
                    {testRight < job.test.length ? " I fixed the rest by adding examples." : ""}
                  </dd>
                </div>
                <div>
                  <dt>Works for every kind</dt>
                  <dd>✅ {job.kinds.join(", ")}</dd>
                </div>
                <div>
                  <dt>Safety rule</dt>
                  <dd>🛡️ {ruleText}</dd>
                </div>
              </dl>
              <p className="ai-card-foot">
                <span>Built {today}</span>
                <span>howaiworksforkids.com</span>
              </p>
            </div>
            <div className="finish-actions no-print">
              <button type="button" className="btn btn-big btn-go" onClick={printCard}>
                <Emo e="🖨️" /> Print my AI Card
              </button>
              <button type="button" className="btn btn-plain" onClick={() => pickJob(job)}>
                Build it again
              </button>
              <button type="button" className="btn btn-plain" onClick={() => setPhase("job")}>
                Pick a new job
              </button>
            </div>
            <p className="win-line">You built an AI! Teach, test, fix, and keep it fair and safe.</p>
          </>
        )}
      </div>
    </div>
  );
}

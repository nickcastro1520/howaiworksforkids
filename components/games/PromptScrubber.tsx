"use client";

import { useState } from "react";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, type GameProps } from "./ui";

/** A piece of a prompt. Private pieces swap to a safe stand-in ("" = leave it out). All names are made up. */
type Chunk = { text: string; secret?: { safe: string; kind: string } };

type Prompt = { chunks: Chunk[]; answer: string };

const PROMPTS: Prompt[] = [
  {
    chunks: [
      { text: "Write a funny poem for" },
      { text: "Maya Lopez", secret: { safe: "my friend", kind: "a full name" } },
      { text: "who loves dinosaurs." },
      { text: "Her birthday is May 3.", secret: { safe: "Her birthday is soon.", kind: "a birthday" } },
    ],
    answer: "Roar, stomp, hooray! Your birthday's on its way! A dino cake, a dino hat, and dino friends. How fun is that?",
  },
  {
    chunks: [
      { text: "How long does it take to walk from" },
      { text: "42 Maple Street", secret: { safe: "my house", kind: "a street address" } },
      { text: "to" },
      { text: "Lincoln Elementary", secret: { safe: "school", kind: "a school name" } },
      { text: "if it's one mile?" },
    ],
    answer: "Walking one mile takes most kids about 20 to 30 minutes. Walk with a grown-up or a buddy!",
  },
  {
    chunks: [
      { text: "Make up a treasure hunt game for me and my brother" },
      { text: "Sam Carter.", secret: { safe: "", kind: "a full name" } },
      { text: "We have a backyard and 3 buckets." },
      { text: "My mom's phone number is 555-0142.", secret: { safe: "", kind: "a phone number" } },
    ],
    answer: "Hide 3 clues in the backyard. Clue 1 is under a bucket! Each clue tells you where the next one is. The last bucket has the treasure.",
  },
];

type Phase = "scrub" | "travel" | "answer";

function spoken(chunks: Chunk[], fixed: boolean[]) {
  return chunks
    .map((c, i) => (c.secret && fixed[i] ? c.secret.safe : c.text))
    .filter(Boolean)
    .join(" ");
}

export function PromptScrubber({ onDone }: GameProps) {
  const [i, setI] = useState(0);
  const [fixed, setFixed] = useState<boolean[]>([]);
  const [okTap, setOkTap] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("scrub");
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const p = PROMPTS[i];
  const secrets = p.chunks.filter((c) => c.secret).length;
  const found = p.chunks.filter((c, n) => c.secret && fixed[n]).length;
  const allFound = found === secrets;
  const done = results.length === PROMPTS.length;

  function tap(n: number) {
    if (phase !== "scrub") return;
    const c = p.chunks[n];
    if (c.secret) {
      const f = [...fixed];
      f[n] = true;
      setFixed(f);
      setOkTap(null);
    } else {
      setOkTap(n);
    }
  }

  function send() {
    setPhase("travel");
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setPhase("answer");
        const r = [...results, true];
        setResults(r);
        if (r.length === PROMPTS.length) onDone();
      },
      reduce ? 300 : 1900,
    );
  }

  function next() {
    setI(i + 1);
    setFixed([]);
    setOkTap(null);
    setPhase("scrub");
  }

  const lastSecret = p.chunks.map((c, n) => (c.secret && fixed[n] ? c.secret.kind : "")).filter(Boolean).pop();
  const instruction = "Tap each private detail to swap it for something safe. Then send the prompt to Pip.";

  return (
    <div className="game scrub">
      <GameHead
        title="Prompt Scrubber"
        right={<Dots total={PROMPTS.length} results={results} />}
        say="These prompts have private details hiding in them, like full names, schools, streets, birthdays, and phone numbers. Tap each one to swap it for something safe. Then send the prompt and see if Pip can still help."
      >
        These prompts have <b>private details</b> hiding in them: full names, schools, streets, birthdays, phone numbers. Tap each one to swap it for
        something safe, then send it to Pip.
      </GameHead>

      <div className="game-panel">
        <div className="scrub-sheet" key={i}>
          <p className="small-cap">
            Prompt {i + 1} of {PROMPTS.length} &middot; secrets found: {found} of {secrets}
          </p>
          <div className="scrub-chunks">
            {p.chunks.map((c, n) => {
              const isFixed = !!c.secret && !!fixed[n];
              const show = isFixed ? c.secret!.safe || "(left out)" : c.text;
              return (
                <button
                  key={n}
                  type="button"
                  className={`scrub-chunk ${isFixed ? "is-safe" : ""} ${okTap === n ? "is-ok" : ""} ${isFixed && !c.secret!.safe ? "is-gone" : ""}`}
                  onClick={() => tap(n)}
                  aria-disabled={phase !== "scrub" || isFixed}
                >
                  {isFixed && <Emo e="🛡️" />} {show}
                </button>
              );
            })}
          </div>
          <SayLine text={spoken(p.chunks, fixed)} label="the prompt" />
        </div>

        {phase === "scrub" && (
          <>
            <div className="say-row">
              <p className="ask-q">{allFound ? "All safe! Send it to Pip." : "Tap the private details."}</p>
              <SayLine key={`${i}-${allFound}`} text={allFound ? "All safe! Send it to Pip." : instruction} label="what to do" size="md" />
            </div>
            {okTap !== null && (
              <div className="hint-row">
                <p className="hint">That part is fine to share. Look for names, places, birthdays, and numbers.</p>
                <SayLine text="That part is fine to share. Look for names, places, birthdays, and numbers." label="the hint" />
              </div>
            )}
            {found > 0 && !allFound && lastSecret && (
              <p className="muted center" aria-live="polite">
                Nice! You hid {lastSecret}. Keep looking.
              </p>
            )}
            <button type="button" className="btn btn-big btn-go" onClick={send} disabled={!allFound}>
              <Emo e="📨" /> Send to Pip
            </button>
          </>
        )}

        {phase !== "scrub" && (
          <div className={`scrub-travel ${phase === "travel" ? "is-moving" : ""}`} aria-live="polite">
            <span className="scrub-from">
              <Emo e="🧒" big />
              <span>You</span>
            </span>
            <span className="scrub-path" aria-hidden="true">
              <span className="scrub-words">💬</span>
            </span>
            <span className="scrub-to">
              <Emo e="🏢" big />
              <span>A computer far away</span>
            </span>
            <p className="scrub-note">
              Your words travel to a company&rsquo;s computer far away. It can save them. That&rsquo;s why secrets stay home!
            </p>
          </div>
        )}

        {phase === "answer" && (
          <>
            <PipSays mood="proud">{p.answer}</PipSays>
            <p className="muted center">No secrets needed. Pip&rsquo;s answer is just as good!</p>
            {!done ? (
              <button type="button" className="btn btn-big btn-go" onClick={next}>
                Next prompt &rarr;
              </button>
            ) : (
              <p className="win-line">Secrets safe! You&rsquo;re a Secret Keeper.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/lib/lessons";
import { LESSONS, nextLesson } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { StoryArt } from "./art/StoryArt";
import { Badge } from "./Badge";
import { Confetti } from "./Confetti";
import { Pip } from "./Pip";
import { AIDetective } from "./games/AIDetective";
import { FactOrFib } from "./games/FactOrFib";
import { FixMixup } from "./games/FixMixup";
import { GoAskStop } from "./games/GoAskStop";
import { NextWord } from "./games/NextWord";
import { SortGlorbs } from "./games/SortGlorbs";
import { SpotGlitches } from "./games/SpotGlitches";
import type { GameProps } from "./games/ui";
import { trackEvent } from "@/lib/analytics";
import { setTalkMode, stopSpeaking } from "@/lib/speech";
import { SayButton, SayLine, useAutoSay } from "./Speak";
import { Emo, Sayable } from "./games/ui";

const GAMES: Record<string, (p: GameProps) => React.ReactNode> = {
  "what-is-ai": AIDetective,
  "learning-from-examples": SortGlorbs,
  "guess-the-next-word": NextWord,
  "sneaky-clues": FixMixup,
  "ai-can-be-wrong": FactOrFib,
  "real-or-made-up": SpotGlitches,
  "smart-and-safe": GoAskStop,
};

type Step = "read" | "play" | "check" | "badge";
const STEPS: { id: Step; label: string }[] = [
  { id: "read", label: "Read" },
  { id: "play", label: "Play" },
  { id: "check", label: "Check" },
  { id: "badge", label: "Badge" },
];

function Story({ lesson, onFinish }: { lesson: Lesson; onFinish: () => void }) {
  const [page, setPage] = useState(0);
  const p = lesson.story[page];
  const last = page === lesson.story.length - 1;
  const stop = stopSpeaking;
  // In talk mode ("Read it to me" was tapped), each new page reads itself.
  useAutoSay(p.text);

  const go = useCallback(
    (d: number) => {
      stop();
      setPage((x) => Math.max(0, Math.min(lesson.story.length - 1, x + d)));
    },
    [lesson.story.length, stop],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section className="story" aria-label="Story">
      <div className="stage" style={{ background: lesson.tint }}>
        <span className="stage-page" aria-hidden="true">
          {page + 1}/{lesson.story.length}
        </span>
        <StoryArt slug={lesson.slug} page={page} />
      </div>
      <div className="story-talk">
        <div className="story-pip">
          <Pip mood={p.mood} size={104} wave={page === 0} />
        </div>
        <div className="story-bubble" aria-live="polite" key={page}>
          <p>{p.text}</p>
          <SayButton text={p.text} label="this page" size="md" className="read-aloud" onSpeak={() => setTalkMode(true)}>
            Read it to me
          </SayButton>
        </div>
      </div>
      <div className="story-nav">
        <button type="button" className="btn btn-plain" onClick={() => go(-1)} disabled={page === 0}>
          &larr; Back
        </button>
        <div className="page-dots" aria-hidden="true">
          {lesson.story.map((_, i) => (
            <span key={i} className={i === page ? "on" : i < page ? "seen" : ""} />
          ))}
        </div>
        {last ? (
          <button
            type="button"
            className="btn btn-big btn-go"
            onClick={() => {
              stop();
              onFinish();
            }}
          >
            Play the game &rarr;
          </button>
        ) : (
          <button type="button" className="btn btn-big btn-go" onClick={() => go(1)}>
            Next &rarr;
          </button>
        )}
      </div>
    </section>
  );
}

function QuickCheck({ lesson, onPass }: { lesson: Lesson; onPass: () => void }) {
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  const item = lesson.quiz[q];
  const right = picked === item.answer;

  function choose(i: number) {
    if (right) return;
    setPicked(i);
    if (i !== item.answer) setWrong((w) => [...w, i]);
  }

  return (
    <section className="check" aria-label="Quick check">
      <p className="small-cap">
        Quick check &middot; {q + 1} of {lesson.quiz.length}
      </p>
      <div className="check-q-row">
        <h2 className="check-q" key={q}>
          {item.q}
        </h2>
        <SayLine
          text={`${item.q} ${item.options.map((o, i) => `${"ABC"[i]}: ${o}.`).join(" ")}`}
          label="the question and answers"
          size="md"
        />
      </div>
      <div className="check-opts">
        {item.options.map((o, i) => (
          <Sayable key={o} text={o}>
            <button
              type="button"
              className={`check-opt ${picked === i && right ? "is-right" : ""} ${wrong.includes(i) ? "is-wrong" : ""}`}
              onClick={() => choose(i)}
              aria-pressed={picked === i}
            >
              <span className="opt-letter" aria-hidden="true">
                {"ABC"[i]}
              </span>
              <Emo e={item.icons[i]} big />
              <span>{o}</span>
            </button>
          </Sayable>
        ))}
      </div>
      <div aria-live="polite" className="check-feedback">
        {picked !== null &&
          (right ? (
            <div className="check-yes pop">
              <Pip mood="proud" size={70} bob={false} />
              <p>{item.yes}</p>
              <SayLine text={item.yes} label="Pip's answer" />
              <button
                type="button"
                className="btn btn-big btn-go"
                onClick={() => {
                  if (q + 1 >= lesson.quiz.length) onPass();
                  else {
                    setQ(q + 1);
                    setPicked(null);
                    setWrong([]);
                  }
                }}
              >
                {q + 1 >= lesson.quiz.length ? "Get my badge!" : "Next question"}
              </button>
            </div>
          ) : (
            <div className="hint-row">
              <p className="hint">Try again! Hint: {item.hint}</p>
              <SayLine text={`Try again! Hint: ${item.hint}`} label="the hint" />
            </div>
          ))}
      </div>
    </section>
  );
}

function Celebrate({ lesson }: { lesson: Lesson }) {
  const { done } = useProgress();
  const nxt = nextLesson(lesson.slug);
  const lights = Math.max(done.length, 1);
  const allDone = LESSONS.every((l) => done.includes(l.slug));
  return (
    <section className="celebrate" aria-label="You earned a badge">
      <Confetti />
      <div className="celebrate-badge pop">
        <Badge lesson={lesson} size={170} earned />
      </div>
      <h2 className="celebrate-title">
        You earned the <span style={{ color: lesson.color }}>{lesson.badge}</span> badge!
      </h2>
      <div className="celebrate-idea-row">
        <p className="celebrate-idea">{lesson.bigIdea}</p>
        <SayLine text={`You earned the ${lesson.badge} badge! ${lesson.bigIdea}`} label="your badge" size="md" />
      </div>
      <div className="celebrate-pip">
        <Pip mood="proud" size={110} lights={lights} wave />
        <p>
          Pip&rsquo;s brain has <b>{lights} of 7</b> lights on!
        </p>
      </div>
      <div className="celebrate-actions">
        {allDone ? (
          <Link className="btn btn-big btn-go" href="/finish">
            Get your certificate &rarr;
          </Link>
        ) : nxt ? (
          <Link className="btn btn-big btn-go" href={`/lessons/${nxt.slug}`}>
            Next: {nxt.short} &rarr;
          </Link>
        ) : (
          <Link className="btn btn-big btn-go" href="/lessons">
            Finish the other lessons &rarr;
          </Link>
        )}
        <Link className="btn btn-plain" href="/lessons">
          Back to the trail
        </Link>
      </div>
      <aside className="talk-card">
        <p className="small-cap">For a grown-up to ask</p>
        <p>{lesson.talk}</p>
      </aside>
    </section>
  );
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [step, setStep] = useState<Step>("read");
  const [played, setPlayed] = useState(false);
  const { isDone, markDone } = useProgress();
  const top = useRef<HTMLDivElement>(null);
  const already = isDone(lesson.slug);
  const Game = GAMES[lesson.slug];

  const moveTo = (s: Step) => {
    stopSpeaking();
    setStep(s);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const reached: Record<Step, boolean> = {
    read: true,
    play: true,
    check: played || already,
    badge: already,
  };

  return (
    <div className="player" ref={top} style={{ "--lc": lesson.color, "--lt": lesson.tint } as React.CSSProperties}>
      <nav className="stepper" aria-label="Lesson steps">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`step ${step === s.id ? "is-on" : ""} ${reached[s.id] ? "" : "is-locked"}`}
            onClick={() => reached[s.id] && moveTo(s.id)}
            disabled={!reached[s.id]}
            aria-current={step === s.id ? "step" : undefined}
          >
            <span className="step-n">{i + 1}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {step === "read" && <Story lesson={lesson} onFinish={() => moveTo("play")} />}

      {step === "play" && (
        <section aria-label="Game">
          <Game color={lesson.color} onDone={() => setPlayed(true)} />
          <div className="after-game">
            {played ? (
              <button type="button" className="btn btn-big btn-go pop" onClick={() => moveTo("check")}>
                Nice! On to the quick check &rarr;
              </button>
            ) : (
              <button type="button" className="link-btn" onClick={() => { setPlayed(true); moveTo("check"); }}>
                Skip the game for now
              </button>
            )}
          </div>
        </section>
      )}

      {step === "check" && (
        <QuickCheck
          lesson={lesson}
          onPass={() => {
            const firstTime = !isDone(lesson.slug);
            markDone(lesson.slug);
            // Anonymous GA event (no-op unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set). No personal data.
            trackEvent("lesson_complete", { lesson_number: lesson.number, lesson_slug: lesson.slug, first_time: firstTime });
            moveTo("badge");
          }}
        />
      )}

      {step === "badge" && <Celebrate lesson={lesson} />}
    </div>
  );
}

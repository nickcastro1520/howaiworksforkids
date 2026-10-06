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

function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);
  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[\u201c\u201d]/g, ""));
    u.rate = 0.92;
    u.pitch = 1.1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }, []);
  const stop = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);
  return { speaking, supported, speak, stop };
}

function Story({ lesson, onFinish }: { lesson: Lesson; onFinish: () => void }) {
  const [page, setPage] = useState(0);
  const { speaking, supported, speak, stop } = useSpeech();
  const p = lesson.story[page];
  const last = page === lesson.story.length - 1;

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
          {supported && (
            <button type="button" className="read-aloud" onClick={() => (speaking ? stop() : speak(p.text))} aria-pressed={speaking}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                {speaking ? (
                  <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                )}
              </svg>
              {speaking ? "Stop" : "Read it to me"}
            </button>
          )}
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
      <h2 className="check-q" key={q}>
        {item.q}
      </h2>
      <div className="check-opts">
        {item.options.map((o, i) => (
          <button
            key={o}
            type="button"
            className={`check-opt ${picked === i && right ? "is-right" : ""} ${wrong.includes(i) ? "is-wrong" : ""}`}
            onClick={() => choose(i)}
            aria-pressed={picked === i}
          >
            <span className="opt-letter" aria-hidden="true">
              {"ABC"[i]}
            </span>
            {o}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="check-feedback">
        {picked !== null &&
          (right ? (
            <div className="check-yes pop">
              <Pip mood="proud" size={70} bob={false} />
              <p>{item.yes}</p>
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
            <p className="hint">Try again! Hint: {item.hint}</p>
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
      <p className="celebrate-idea">{lesson.bigIdea}</p>
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
            markDone(lesson.slug);
            moveTo("badge");
          }}
        />
      )}

      {step === "badge" && <Celebrate lesson={lesson} />}
    </div>
  );
}

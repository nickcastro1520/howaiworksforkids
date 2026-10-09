"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LESSONS, SECTION_2, SECTIONS } from "@/lib/lessons";
import { saveQuiz, useProgress, useQuizResult } from "@/lib/progress";
import { FINAL_QUIZ_SHOWN as QUIZ, QUIZ_TOTAL, grownupNote } from "@/lib/quiz";
import { stopSpeaking } from "@/lib/speech";
import { Confetti } from "./Confetti";
import { Pip } from "./Pip";
import { HearHowToPlay, SayLine } from "./Speak";
import { TellGrownup } from "./TellGrownup";
import { Emo, PipSays, Sayable } from "./games/ui";

type Phase = "intro" | "ask" | "result";

const lessonLink = (n: number) => {
  const l = LESSONS.find((x) => x.number === n);
  return l ? `/lessons/${l.slug}` : "/lessons";
};

/**
 * The final quiz. No timer, no fail screen: after each answer the right one is shown.
 * Only { score, missed concept IDs } is saved, on this device. Nothing is sent anywhere,
 * and nothing about the quiz goes to analytics.
 */
export function FinalQuiz() {
  const { done } = useProgress();
  const saved = useQuizResult();
  const [phase, setPhase] = useState<Phase>("intro");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [missed, setMissed] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const s2Done = SECTION_2.filter((l) => done.includes(l.slug)).length;
  const s2All = s2Done === SECTION_2.length;
  const item = QUIZ[i];

  const scrollTop = () => requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  function start() {
    stopSpeaking();
    setI(0);
    setPicked(null);
    setMissed([]);
    setScore(0);
    setPhase("ask");
    scrollTop();
  }

  function choose(k: number) {
    if (picked !== null) return;
    setPicked(k);
    if (k === item.answer) setScore((s) => s + 1);
    else setMissed((m) => [...m, item.concept]);
  }

  function next() {
    stopSpeaking();
    if (i + 1 >= QUIZ.length) {
      saveQuiz({ score, missed });
      setPhase("result");
      scrollTop();
      return;
    }
    setI(i + 1);
    setPicked(null);
  }

  if (phase === "intro") {
    const intro = `The final quiz. ${QUIZ_TOTAL} questions about everything you taught Pip, from both sections. There's no timer. If you pick a wrong answer, that's OK: you'll see the right one every time.`;
    return (
      <div className="fq" ref={top}>
        <div className="fq-intro">
          <Pip mood="wow" size={140} wave />
          <div className="fq-intro-text">
            <p className="page-lead">
              <b>{QUIZ_TOTAL} questions</b> about everything you taught Pip, from both sections. No timer. Wrong answers are OK: you&rsquo;ll see
              the right one every time.
            </p>
            <HearHowToPlay text={intro} />
          </div>
        </div>
        {!s2All && (
          <div className="soft-lock" role="note">
            <span className="soft-lock-emoji" aria-hidden="true">
              🧭
            </span>
            <p>
              <b>We suggest finishing Section 2 first</b> ({s2Done} of {SECTION_2.length} lessons done). The quiz covers both sections. But
              it&rsquo;s not locked: you can try it now!{" "}
              <Link href={SECTIONS[2].path}>Go to Section 2</Link>
            </p>
          </div>
        )}
        {saved && (
          <p className="fq-last center">
            <Emo e="⭐" /> Last time on this device: <b>{saved.score} of {QUIZ_TOTAL}</b>. Want to try again?
          </p>
        )}
        <p className="center">
          <button type="button" className="btn btn-huge btn-go" onClick={start}>
            {saved ? "Take the quiz again" : "Start the quiz"} &rarr;
          </button>
        </p>
      </div>
    );
  }

  if (phase === "ask") {
    const right = picked === item.answer;
    const answerText = item.options[item.answer];
    const feedback = right ? `Yes! ${item.yes}` : `Good try! The answer is: ${answerText}. ${item.yes}`;
    return (
      <div className="fq" ref={top}>
        <section className="check fq-q" aria-label="Final quiz question">
          <div className="fq-progress">
            <p className="small-cap">
              Question {i + 1} of {QUIZ_TOTAL}
            </p>
            <div className="hud-bar" aria-hidden="true">
              <span style={{ width: `${((i + (picked === null ? 0 : 1)) / QUIZ_TOTAL) * 100}%` }} />
            </div>
          </div>
          <div className="check-q-row">
            <h2 className="check-q" key={i}>
              {item.q}
            </h2>
            <SayLine
              key={`say-${i}`}
              text={`${item.q} ${item.options.map((o, k) => `${"ABC"[k]}: ${o}.`).join(" ")}`}
              label="the question and answers"
              size="md"
            />
          </div>
          <div className="check-opts">
            {item.options.map((o, k) => {
              const isAnswer = picked !== null && k === item.answer;
              const isWrongPick = picked === k && !right;
              return (
                <Sayable key={o} text={o}>
                  <button
                    type="button"
                    className={`check-opt ${isAnswer ? "is-right" : ""} ${isWrongPick ? "is-wrong" : ""}`}
                    onClick={() => choose(k)}
                    aria-pressed={picked === k}
                    aria-disabled={picked !== null}
                  >
                    <span className="opt-letter" aria-hidden="true">
                      {"ABC"[k]}
                    </span>
                    <Emo e={item.icons[k]} big />
                    <span>{o}</span>
                    {isAnswer && <Emo e="✅" />}
                  </button>
                </Sayable>
              );
            })}
          </div>
          <div className="check-feedback">
            {picked !== null && (
              <div className="fq-feedback pop" key={`fb-${i}`}>
                <PipSays mood={right ? "proud" : "think"}>
                  {right ? (
                    <>
                      <b>Yes!</b> {item.yes}
                    </>
                  ) : (
                    <>
                      <b>Good try!</b> The answer is: <b>{answerText}</b>. {item.yes}
                    </>
                  )}
                </PipSays>
                <span className="sr-only" aria-live="polite">
                  {feedback}
                </span>
                <button type="button" className="btn btn-big btn-go" onClick={next}>
                  {i + 1 >= QUIZ_TOTAL ? "See how I did" : "Next question"} &rarr;
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Result: never a fail screen.
  const got = QUIZ.filter((q) => !missed.includes(q.concept));
  const toVisit = QUIZ.filter((q) => missed.includes(q.concept));
  const cheer =
    score === QUIZ_TOTAL
      ? "Every single one! You really know how AI works."
      : score >= 7
        ? "Wow! You know a lot about AI."
        : score >= 4
          ? "Nice work! You learned a lot, and now you know a few more."
          : "Great job trying! Every answer you saw today helps your brain grow.";
  const body = grownupNote({ finished: `Here's how I did on the final quiz. It covers all ${LESSONS.length} lessons, from both sections.`, quiz: { score, missed } });

  return (
    <div className="fq fq-result" ref={top}>
      {score >= 7 && <Confetti count={70} />}
      <div className="fq-score pop">
        <Pip mood="proud" size={130} wave lights={score} slots={QUIZ_TOTAL} />
        <div>
          <p className="small-cap">Your quiz</p>
          <p className="fq-score-big">
            {score} of {QUIZ_TOTAL}
          </p>
          <p className="fq-cheer">{cheer}</p>
          <SayLine text={`You got ${score} of ${QUIZ_TOTAL}. ${cheer}`} label="your score" size="md" />
        </div>
      </div>

      <div className="fq-lists">
        {got.length > 0 && (
          <section className="fq-list fq-got" aria-labelledby="fq-got">
            <h2 id="fq-got">
              <Emo e="🌟" /> You know these
            </h2>
            <ul>
              {got.map((q) => (
                <li key={q.concept}>{q.topic}</li>
              ))}
            </ul>
          </section>
        )}
        {toVisit.length > 0 && (
          <section className="fq-list fq-again" aria-labelledby="fq-again">
            <h2 id="fq-again">
              <Emo e="🔁" /> Fun to visit again
            </h2>
            <ul>
              {toVisit.map((q) => (
                <li key={q.concept}>
                  <Link href={lessonLink(q.lessons[q.lessons.length - 1])}>
                    {q.topic} <span className="muted">(Lesson {q.lessons.join(" & ")})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="finish-actions">
        {s2All ? (
          <Link href="/finish/section-2" className="btn btn-big btn-sun">
            Get your Section 2 certificate &rarr;
          </Link>
        ) : (
          <Link href={SECTIONS[2].path} className="btn btn-big btn-sun">
            Finish Section 2 for your certificate &rarr;
          </Link>
        )}
        <button type="button" className="btn btn-plain" onClick={start}>
          Take the quiz again
        </button>
      </div>
      <p className="muted center fq-privacy">Your score is saved only on this device. It isn&rsquo;t sent anywhere.</p>

      <TellGrownup
        subject="I took the final quiz on How AI Works for Kids!"
        body={body}
        intro="Send a grown-up your score and some ideas to talk about. It never includes your name."
      />
    </div>
  );
}

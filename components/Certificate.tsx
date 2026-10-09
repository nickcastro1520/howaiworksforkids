"use client";

import Link from "next/link";
import { useState } from "react";
import { SECTIONS, sectionLessons, numberWord, type SectionId } from "@/lib/lessons";
import { useProgress, useQuizResult } from "@/lib/progress";
import { QUIZ_TOTAL, grownupNote } from "@/lib/quiz";
import { Badge } from "./Badge";
import { Confetti } from "./Confetti";
import { Pip } from "./Pip";
import { TellGrownup } from "./TellGrownup";

const COPY: Record<SectionId, { did: string; subject: string; finished: (n: number) => string; lead: string }> = {
  1: {
    did: "taught Pip, a tiny AI, and learned how real AI works.",
    subject: "I finished How AI Works for Kids!",
    finished: (n) => `I finished all ${numberWord(n)} Section 1 lessons on How AI Works for Kids and taught Pip how AI works!`,
    lead: "Section 1 lights are on. You taught Pip the basics!",
  },
  2: {
    did: "grew up with Pip: learned how AI sees, asks, checks, stays fair and safe, and built an AI.",
    subject: "I finished Section 2 of How AI Works for Kids!",
    finished: (n) => `I finished Section 2 of How AI Works for Kids: all ${numberWord(n)} lessons and the final quiz!`,
    lead: "Section 2 lights are on, and you took the final quiz. You helped Pip grow up!",
  },
};

export function Certificate({ section = 1 }: { section?: SectionId }) {
  const { isDone } = useProgress();
  const quiz = useQuizResult();
  const [nick, setNick] = useState("");
  const LESSONS = sectionLessons(section);
  const info = SECTIONS[section];
  const copy = COPY[section];
  const total = LESSONS.length;
  const n = LESSONS.filter((l) => isDone(l.slug)).length;
  const lessonsDone = n === total;
  const needsQuiz = section === 2;
  const all = lessonsDone && (!needsQuiz || quiz !== null);
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (!all) {
    const next = LESSONS.find((l) => !isDone(l.slug));
    return (
      <div className="finish-locked">
        <Pip mood="think" size={150} lights={n} slots={total} />
        <h1 className="page-title">Almost there!</h1>
        <p className="page-lead">
          Pip has <b>{n} of {total}</b> {info.kicker} lights on.{" "}
          {needsQuiz
            ? `Finish all ${total} ${info.kicker} lessons and take the final quiz to unlock your certificate.`
            : `Finish all ${total} ${info.kicker} lessons to unlock your certificate.`}
        </p>
        <div className="finish-badges">
          {LESSONS.map((l) => (
            <Badge key={l.slug} lesson={l} size={74} earned={isDone(l.slug)} />
          ))}
        </div>
        {needsQuiz && (
          <p className="finish-quiz-status">
            <span aria-hidden="true">{quiz ? "✅" : "🧠"}</span> Final quiz: {quiz ? "done!" : "not taken yet"}
          </p>
        )}
        {next ? (
          <Link href={`/lessons/${next.slug}`} className="btn btn-huge btn-go">
            Next: {next.title} &rarr;
          </Link>
        ) : (
          <Link href="/quiz" className="btn btn-huge btn-go">
            Take the final quiz &rarr;
          </Link>
        )}
      </div>
    );
  }

  const body = grownupNote({ finished: copy.finished(total), quiz });

  return (
    <div className="finish">
      <Confetti count={90} />
      <h1 className="page-title center">You did it!</h1>
      <p className="page-lead center">
        All {numberWord(total)} {copy.lead}
      </p>

      <div className="cert-tools no-print">
        <label className="field">
          <span>Your first name or nickname (it stays on this screen)</span>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value.slice(0, 24))}
            placeholder="Type it here"
            autoComplete="off"
            maxLength={24}
          />
        </label>
      </div>

      <div className="cert" id="certificate">
        <div className="cert-border">
          <p className="cert-kicker">Certificate of AI Know-How</p>
          <p className="cert-this">
            {info.kicker}: {info.name}
          </p>
          <p className="cert-this">This shows that</p>
          <p className="cert-name">{nick.trim() || "A Super Teacher"}</p>
          <p className="cert-text">{copy.did}</p>
          <div className="cert-row">
            <Pip mood="proud" size={110} lights={total} slots={total} bob={false} />
            <ul className="cert-list">
              {LESSONS.map((l) => (
                <li key={l.slug}>
                  <span style={{ background: l.color }} aria-hidden="true" /> {l.badge}
                </li>
              ))}
              {needsQuiz && (
                <li>
                  <span style={{ background: "#ffd34d" }} aria-hidden="true" /> Final quiz
                </li>
              )}
            </ul>
          </div>
          <div className="cert-foot">
            <span>{today}</span>
            <span>howaiworksforkids.com</span>
          </div>
        </div>
      </div>

      <div className="finish-actions no-print">
        <button type="button" className="btn btn-big btn-go" onClick={() => window.print()}>
          Print my certificate
        </button>
        {section === 1 ? (
          <Link href={SECTIONS[2].path} className="btn btn-big btn-sun">
            Next: {SECTIONS[2].kicker}, {SECTIONS[2].name} &rarr;
          </Link>
        ) : (
          <Link href="/quiz" className="btn btn-big btn-sun">
            Take the quiz again
          </Link>
        )}
        <Link href="/glossary" className="btn btn-plain">
          Visit Pip&rsquo;s Word Book
        </Link>
      </div>

      <TellGrownup
        subject={copy.subject}
        body={body}
        intro={quiz ? `The note includes your final quiz score (${quiz.score} of ${QUIZ_TOTAL}) and ideas to talk about. It never includes your name.` : undefined}
      />
    </div>
  );
}

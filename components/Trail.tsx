"use client";

import Link from "next/link";
import { SECTIONS, SECTION_1, sectionLessons, type SectionId } from "@/lib/lessons";
import { useProgress, useQuizResult } from "@/lib/progress";
import { Badge } from "./Badge";
import { Pip } from "./Pip";

/** A wiggly dotted path that fits any number of stops. */
function trailPath(stops: number): string {
  let d = "M30 20 C 80 60, 80 90, 70 120";
  for (let k = 1; k < stops; k++) {
    const y = 120 + k * 100;
    d += k % 2 ? ` S 20 ${y - 30}, 30 ${y}` : ` S 80 ${y - 30}, 70 ${y}`;
  }
  return d + ` S 60 ${120 + stops * 100 - 40}, 50 ${120 + stops * 100 - 20}`;
}

export function Trail({ section = 1 }: { section?: SectionId }) {
  const { done, isDone, reset } = useProgress();
  const info = SECTIONS[section];
  const lessons = sectionLessons(section);
  const quiz = useQuizResult();
  const total = info.planned;
  const n = lessons.filter((l) => isDone(l.slug)).length;
  const nextUp = lessons.find((l) => !isDone(l.slug));
  const stops = lessons.length;
  const height = 120 + stops * 100;
  const s1Done = SECTION_1.every((l) => isDone(l.slug));
  const released = lessons.length;

  return (
    <>
      {section === 2 && !s1Done && (
        <div className="soft-lock" role="note">
          <span className="soft-lock-emoji" aria-hidden="true">
            🧭
          </span>
          <p>
            <b>We suggest Section 1 first.</b> Section 2 builds on what you taught Pip there. But it&rsquo;s not locked: you can start here
            if you like!{" "}
            <Link href={SECTIONS[1].path}>Go to Section 1</Link>
          </p>
        </div>
      )}
      <div className="trail-hud">
        <Pip mood={n === released ? "proud" : n > 0 ? "happy" : "wow"} size={120} lights={n} slots={total} />
        <div>
          <p className="small-cap">
            {info.kicker}: {info.name}
          </p>
          <p className="hud-big">
            {n} of {total} lights on
          </p>
          <div className="hud-bar" aria-hidden="true">
            <span style={{ width: `${(n / total) * 100}%` }} />
          </div>
          {nextUp ? (
            <Link href={`/lessons/${nextUp.slug}`} className="btn btn-go">
              {n === 0 ? `Start with lesson ${lessons[0].number}` : `Keep going: lesson ${nextUp.number}`} &rarr;
            </Link>
          ) : section === 1 ? (
            <Link href="/finish" className="btn btn-sun">
              Get your certificate &rarr;
            </Link>
          ) : quiz ? (
            <Link href="/finish/section-2" className="btn btn-sun">
              Get your Section 2 certificate &rarr;
            </Link>
          ) : (
            <Link href="/quiz" className="btn btn-sun">
              Take the final quiz &rarr;
            </Link>
          )}
        </div>
      </div>

      <ol className="trail" style={{ "--trail-h": `${height}px` } as React.CSSProperties}>
        <svg className="trail-path" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <path
            d={trailPath(stops)}
            fill="none"
            stroke="#d9cfee"
            strokeWidth="2.4"
            strokeDasharray="1 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {lessons.map((l, i) => {
          const isOn = isDone(l.slug);
          const isNext = nextUp?.slug === l.slug;
          return (
            <li key={l.slug} className={`stop ${i % 2 ? "stop-right" : "stop-left"} ${isNext ? "is-next" : ""}`}>
              <Link href={`/lessons/${l.slug}`} className="stop-card" style={{ "--lc": l.color, "--lt": l.tint } as React.CSSProperties}>
                <span className="stop-badge">
                  <Badge lesson={l} size={92} earned={isOn} />
                </span>
                <span className="stop-body">
                  <span className="stop-meta">
                    Lesson {l.number} &middot; {l.minutes} min {isOn && <b className="stop-done">Done!</b>}
                    {isNext && <b className="stop-up">Up next</b>}
                  </span>
                  <span className="stop-title">{l.title}</span>
                  <span className="stop-idea">{l.bigIdea}</span>
                  <span className="stop-game">
                    Game: <b>{l.game}</b>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
        {section === 1 ? (
          <li className="stop stop-finish">
            <Link href="/finish" className="finish-flag">
              <svg viewBox="0 0 60 70" width="56" height="64" aria-hidden="true">
                <path d="M10 66 V6" stroke="#231d4f" strokeWidth="5" strokeLinecap="round" />
                <path d="M12 8 H52 L44 22 L52 36 H12 Z" fill="#ffd34d" stroke="#231d4f" strokeWidth="4" strokeLinejoin="round" />
              </svg>
              <span>
                <b>Finish line</b>
                <small>Your certificate</small>
              </span>
            </Link>
          </li>
        ) : (
          <li className="stop stop-finish stop-finish-2">
            <Link href="/quiz" className="finish-flag">
              <span className="finish-emoji" aria-hidden="true">
                🧠
              </span>
              <span>
                <b>Final quiz</b>
                <small>{quiz ? `Done: ${quiz.score} of 10` : "10 questions, both sections"}</small>
              </span>
            </Link>
            <Link href="/finish/section-2" className="finish-flag">
              <svg viewBox="0 0 60 70" width="56" height="64" aria-hidden="true">
                <path d="M10 66 V6" stroke="#231d4f" strokeWidth="5" strokeLinecap="round" />
                <path d="M12 8 H52 L44 22 L52 36 H12 Z" fill="#ffd34d" stroke="#231d4f" strokeWidth="4" strokeLinejoin="round" />
              </svg>
              <span>
                <b>Finish line</b>
                <small>Your Section 2 certificate</small>
              </span>
            </Link>
          </li>
        )}
      </ol>
      {done.length > 0 && (
        <p className="center">
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              if (window.confirm("Start over? This turns off all of Pip's lights on this device, in every section.")) reset();
            }}
          >
            Start over
          </button>
        </p>
      )}
    </>
  );
}

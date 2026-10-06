"use client";

import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { Badge } from "./Badge";
import { Pip } from "./Pip";

export function Trail() {
  const { done, isDone, reset } = useProgress();
  const n = LESSONS.filter((l) => isDone(l.slug)).length;
  const nextUp = LESSONS.find((l) => !isDone(l.slug));
  return (
    <>
      <div className="trail-hud">
        <Pip mood={n === 7 ? "proud" : n > 0 ? "happy" : "wow"} size={120} lights={n} />
        <div>
          <p className="small-cap">Pip&rsquo;s brain</p>
          <p className="hud-big">
            {n} of 7 lights on
          </p>
          <div className="hud-bar" aria-hidden="true">
            <span style={{ width: `${(n / 7) * 100}%` }} />
          </div>
          {nextUp ? (
            <Link href={`/lessons/${nextUp.slug}`} className="btn btn-go">
              {n === 0 ? "Start with lesson 1" : `Keep going: lesson ${nextUp.number}`} &rarr;
            </Link>
          ) : (
            <Link href="/finish" className="btn btn-sun">
              Get your certificate &rarr;
            </Link>
          )}
        </div>
      </div>

      <ol className="trail">
        <svg className="trail-path" viewBox="0 0 100 700" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M30 20 C 80 60, 80 90, 70 120 S 20 190, 30 220 S 80 290, 70 320 S 20 390, 30 420 S 80 490, 70 520 S 20 590, 30 620 S 60 680, 50 700"
            fill="none"
            stroke="#d9cfee"
            strokeWidth="2.4"
            strokeDasharray="1 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {LESSONS.map((l, i) => {
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
      </ol>
      {done.length > 0 && (
        <p className="center">
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              if (window.confirm("Start over? This turns off all of Pip's lights on this device.")) reset();
            }}
          >
            Start over
          </button>
        </p>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { countDone, nextStep } from "@/lib/journey";
import { LESSONS, type Lesson } from "@/lib/lessons";
import { useProgress, useQuizResult } from "@/lib/progress";
import { Badge } from "./Badge";
import { LessonArt } from "./LessonTiles";

/**
 * The one big "what to tap next" button. Reads progress from this browser only (localStorage).
 * New kids get "Start Lesson 1"; returning kids get "Keep going: Lesson N". One tap opens the lesson.
 */
export function StartButton({ className = "btn-sun" }: { className?: string }) {
  const { done } = useProgress();
  const quiz = useQuizResult();
  const s = nextStep(done, quiz !== null);
  const [main, sub] =
    s.kind === "start"
      ? ["Start Lesson 1", s.lesson.title]
      : s.kind === "lesson"
        ? [`Keep going: Lesson ${s.lesson.number}`, s.lesson.title]
        : s.kind === "quiz"
          ? ["Take the final quiz", `All ${LESSONS.length} lessons done!`]
          : ["See your certificate", "You finished everything!"];
  return (
    <Link href={s.href} className={`btn btn-huge btn-start ${className}`} data-next={s.kind}>
      <span className="btn-start-main">
        {main} <span aria-hidden="true">&rarr;</span>
      </span>
      <span className="btn-start-sub">{sub}</span>
    </Link>
  );
}

/** "X of 15 done" with a bar. Shows nothing until a kid has finished at least one lesson, unless `always`. */
export function ProgressLine({ always = false, light = false }: { always?: boolean; light?: boolean }) {
  const { done } = useProgress();
  const n = countDone(done);
  if (!always && n === 0) return null;
  return (
    <div className={`progress-line ${light ? "is-light" : ""}`}>
      <p>
        <b>
          {n} of {LESSONS.length}
        </b>{" "}
        lessons done
      </p>
      <div
        className="hud-bar"
        role="progressbar"
        aria-label="Lessons done"
        aria-valuemin={0}
        aria-valuemax={LESSONS.length}
        aria-valuenow={n}
      >
        <span style={{ width: `${(n / LESSONS.length) * 100}%` }} />
      </div>
    </div>
  );
}

/** Every badge, colored once earned. Each one is a link into its lesson. */
export function BadgeShelf() {
  const { isDone, done } = useProgress();
  const n = countDone(done);
  return (
    <div className="badge-shelf">
      <ProgressLine always />
      <p className="badge-shelf-note">
        {n === 0
          ? "Finish a lesson to earn its badge. Your badges are saved on this device only."
          : n === LESSONS.length
            ? "Every badge earned. Amazing!"
            : "Gray badges are still waiting for you. Tap one to play it."}
      </p>
      <ul className="badge-shelf-list">
        {LESSONS.map((l) => (
          <li key={l.slug}>
            <Link
              href={`/lessons/${l.slug}`}
              className={`badge-shelf-item ${isDone(l.slug) ? "is-earned" : ""}`}
            >
              <span aria-hidden="true">
                <Badge lesson={l} size={58} earned={isDone(l.slug)} />
              </span>
              <span>
                <span className="sr-only">Lesson </span>
                {l.number}
                <span className="sr-only">
                  : {l.title}. {isDone(l.slug) ? `${l.badge} badge earned` : "Badge not earned yet"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A big, primary "Next lesson" card with the lesson's picture and title. */
export function NextLessonCard({ lesson, kicker = "Next lesson", secondary = false }: { lesson: Lesson; kicker?: string; secondary?: boolean }) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className={`next-card ${secondary ? "is-secondary" : ""}`}
      style={{ "--lc": lesson.color, "--lt": lesson.tint } as React.CSSProperties}
    >
      <span className="next-card-art" aria-hidden="true">
        <LessonArt slug={lesson.slug} />
      </span>
      <span className="next-card-body">
        <span className="next-card-kicker">{kicker}</span>
        <span className="next-card-title">
          Lesson {lesson.number}: {lesson.title}
        </span>
        <span className="next-card-go">
          Let&rsquo;s go <span aria-hidden="true">&rarr;</span>
        </span>
      </span>
    </Link>
  );
}

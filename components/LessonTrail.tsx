"use client";

import Link from "next/link";
import { usePrefs } from "@/components/Preferences";
import { LESSONS } from "@/lib/lessons";

export function LessonTrail({ variant = "index" }: { variant?: "index" | "stepper" }) {
  const { prefs, ready } = usePrefs();

  if (variant === "stepper") {
    return (
      <ol className="stepper">
        {LESSONS.map((lesson) => {
          const done = ready && prefs.completed.includes(lesson.slug);
          return (
            <li key={lesson.slug}>
              <Link href={`/lessons/${lesson.slug}`} className="step-link">
                <span className="step-num">{String(lesson.number).padStart(2, "0")}</span>
                <span className="step-title">{lesson.title}</span>
                <span className="step-meta">{done ? "Finished" : `${lesson.minutes} min`}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="trail">
      {LESSONS.map((lesson) => {
        const done = ready && prefs.completed.includes(lesson.slug);
        return (
          <li key={lesson.slug}>
            <Link href={`/lessons/${lesson.slug}`} className="trail-link">
              <span className="trail-num">{String(lesson.number).padStart(2, "0")}</span>
              <span>
                <span className="trail-title">{lesson.title}</span>
                <span className="mt-1 block text-sm text-muted">
                  {lesson.subtitle} · about {lesson.minutes} min
                  {done ? " · finished" : ""}
                </span>
              </span>
              <span className="trail-go" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

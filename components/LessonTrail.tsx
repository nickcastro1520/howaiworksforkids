"use client";

import Link from "next/link";
import { usePrefs } from "@/components/Preferences";
import { LESSONS } from "@/lib/lessons";

export function LessonTrail() {
  const { prefs, ready } = usePrefs();
  return (
    <ol className="grid gap-3">
      {LESSONS.map((lesson) => {
        const done = ready && prefs.completed.includes(lesson.slug);
        return (
          <li key={lesson.slug}>
            <Link
              href={`/lessons/${lesson.slug}`}
              className="sticker flex items-start gap-3 p-4 no-underline"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-sun text-xl font-extrabold">
                {lesson.number}
              </span>
              <span>
                <span className="block font-display text-2xl font-bold text-ink">{lesson.title}</span>
                <span className="mt-1 block text-sm text-muted">
                  {lesson.subtitle} · about {lesson.minutes} min
                  {done ? " · finished" : ""}
                </span>
                <span className="grownup-chip mt-2">
                  <span className="chip">{lesson.grownup.chip}</span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { useState } from "react";
import { AttentionGame } from "@/components/games/AttentionGame";
import { CheckSource } from "@/components/games/CheckSource";
import { LearnByTrying } from "@/components/games/LearnByTrying";
import { LookAlikes } from "@/components/games/LookAlikes";
import { NotMagic } from "@/components/games/NotMagic";
import { SafetyGame } from "@/components/games/SafetyGame";
import { WordsContext } from "@/components/games/WordsContext";
import { usePrefs } from "@/components/Preferences";
import { ShareCard } from "@/components/ShareCard";
import { localOnlyLine } from "@/lib/game-data";
import type { Lesson } from "@/lib/lessons";

const GAMES = {
  "not-magic": NotMagic,
  "learn-by-trying": LearnByTrying,
  "words-need-context": WordsContext,
  "tricky-look-alikes": LookAlikes,
  "what-it-notices": AttentionGame,
  "check-a-source": CheckSource,
  "be-safe-and-honest": SafetyGame,
} as const;

export function LessonGame({ lesson }: { lesson: Lesson }) {
  const { prefs, ready, markComplete } = usePrefs();
  const [justFinished, setJustFinished] = useState(false);
  const showShare = justFinished || (ready && prefs.completed.includes(lesson.slug));
  const Game = GAMES[lesson.slug as keyof typeof GAMES];

  function finish() {
    const already = prefs.completed.includes(lesson.slug);
    markComplete(lesson.slug);
    setJustFinished(true);
    if (!already) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => {
        document.getElementById("finish-card")?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
      }, 50);
    }
  }

  if (!Game) return null;

  return (
    <div className="mt-6">
      <p className="text-sm font-extrabold text-muted">{localOnlyLine}</p>
      <div className="grownup-chip mt-4 rounded-2xl border-2 border-dashed border-ink p-3">
        <span className="chip">{lesson.grownup.chip}</span>
        <span className="mt-2 block text-sm">{lesson.grownup.note}</span>
      </div>
      <div className="sticker mt-4 p-4 sm:p-6">
        {ready ? (
          <Game key={prefs.theme} theme={prefs.theme} age={prefs.age} onComplete={finish} />
        ) : (
          <p>Getting your activity ready…</p>
        )}
      </div>
      {showShare && ready ? <ShareCard lesson={lesson} age={prefs.age} /> : null}
    </div>
  );
}

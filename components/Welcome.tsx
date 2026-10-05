"use client";

import { useEffect, useState } from "react";
import { ThemeArt } from "@/components/Art";
import { usePrefs } from "@/components/Preferences";
import { THEMES } from "@/lib/themes";
import type { AgeId, ThemeId } from "@/lib/types";

export function Welcome() {
  const { saveWelcome } = usePrefs();
  const [theme, setTheme] = useState<ThemeId | null>(null);
  const [age, setAge] = useState<AgeId | null>(null);

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);

  function preview(next: ThemeId) {
    setTheme(next);
  }

  function start() {
    if (!theme || !age) return;
    saveWelcome({ theme, age });
    document.getElementById("content")?.focus();
  }

  return (
    <div className="welcome-gate">
      <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-6 px-4 py-8">
        <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
          How AI Works for Kids
        </p>
        <div>
          <h1 className="font-display text-5xl leading-none font-bold sm:text-6xl">
            Pick a world
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted">
            Free games about how AI works. No account. No ads. You can change this later.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="World">
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="sticker flex flex-col items-start gap-2 p-4 text-left"
              aria-pressed={theme === item.id}
              onClick={() => preview(item.id)}
            >
              <ThemeArt theme={item.id} className="h-48 w-full object-contain sm:h-44" />
              <span className="font-display text-2xl font-bold">{item.name}</span>
              <span className="text-sm text-muted">{item.blurb}</span>
            </button>
          ))}
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold">Who’s learning?</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2" role="group" aria-label="Reading level">
            <button
              type="button"
              className="choice"
              aria-pressed={age === "kids"}
              onClick={() => setAge("kids")}
            >
              Kids, ages 6–10
              <span className="mt-1 block text-sm font-semibold text-muted">
                Short words. Almost no jargon.
              </span>
            </button>
            <button
              type="button"
              className="choice"
              aria-pressed={age === "tweens"}
              onClick={() => setAge("tweens")}
            >
              Tweens, ages 11–14
              <span className="mt-1 block text-sm font-semibold text-muted">
                Same games, plus a small grown-up name.
              </span>
            </button>
          </div>
        </div>
        <button type="button" className="btn btn-primary text-lg" disabled={!theme || !age} onClick={start}>
          Start learning
        </button>
        {!theme || !age ? (
          <p className="text-sm text-muted">Pick a world and who’s learning. Then this button turns on.</p>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ThemeArt } from "@/components/Art";
import { usePrefs } from "@/components/Preferences";
import { THEMES } from "@/lib/themes";
import type { ThemeId } from "@/lib/types";

export function Welcome() {
  const { saveWelcome } = usePrefs();
  const [theme, setTheme] = useState<ThemeId | null>(null);

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);

  function start() {
    if (!theme) return;
    saveWelcome({ theme });
    document.getElementById("content")?.focus();
  }

  return (
    <div className="welcome-gate">
      <div className="welcome-inner">
        <p className="kicker">Ages 6–10 · free · no sign-up</p>
        <h1 className="welcome-title mt-3 font-bold">
          Pick a world <em>to play in.</em>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Free games about how AI works. No account. No ads. You can change this later.
        </p>
        <div className="world-grid mt-6" role="group" aria-label="World">
          {THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="world-pick"
              aria-pressed={theme === item.id}
              onClick={() => setTheme(item.id)}
            >
              <ThemeArt theme={item.id} />
              <span className="px-2 font-display text-2xl font-bold">{item.name}</span>
              <span className="px-2 text-sm text-muted">{item.blurb}</span>
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-primary mt-6 text-lg" disabled={!theme} onClick={start}>
          Start learning
        </button>
        {!theme ? (
          <p className="mt-3 text-sm text-muted">Pick a world. Then this button turns on.</p>
        ) : null}
      </div>
    </div>
  );
}

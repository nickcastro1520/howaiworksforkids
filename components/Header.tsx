"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ThemeArt } from "@/components/Art";
import { usePrefs } from "@/components/Preferences";
import { THEMES } from "@/lib/themes";
import type { AgeId, ThemeId } from "@/lib/types";

const NAV = [
  { href: "/lessons", label: "Lessons" },
  { href: "/parents", label: "Parents" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setTheme, setAge } = usePrefs();

  function openThemes() {
    dialogRef.current?.showModal();
  }

  function chooseTheme(theme: ThemeId) {
    setTheme(theme);
    dialogRef.current?.close();
  }

  return (
    <header className="site-header sticky top-0 z-40 border-b-2 border-ink">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="font-display text-2xl leading-none font-bold text-ink">
            How AI Works
          </Link>
          <button type="button" className="btn btn-ghost" onClick={openThemes}>
            <span className="swap-space">Space</span>
            <span className="swap-dinos">Dinos</span>
            <span className="swap-ebikes">E-bikes</span>
            <span aria-hidden="true">▾</span>
            <span className="sr-only">Change world</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Reading level"
            className="flex rounded-full border-2 border-ink bg-card p-1"
          >
            <AgeButton age="kids" label="Kids 6–10" onPick={setAge} />
            <AgeButton age="tweens" label="Tweens 11–14" onPick={setAge} />
          </div>
          <nav aria-label="Site" className="flex flex-wrap gap-x-3 gap-y-1 text-sm font-extrabold">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="underline decoration-2 underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <dialog ref={dialogRef} className="theme-dialog" aria-labelledby="world-title">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 id="world-title" className="font-display text-3xl font-bold">
            Pick a world
          </h2>
          <button type="button" className="btn btn-ghost" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
        <p className="mb-4 text-muted">Same lessons. New examples and pictures.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className="sticker flex flex-col items-start gap-2 p-3 text-left"
              onClick={() => chooseTheme(theme.id)}
            >
              <ThemeArt theme={theme.id} className="h-16 w-16 text-accent" />
              <span className="font-display text-xl font-bold">{theme.name}</span>
              <span className="text-sm text-muted">{theme.blurb}</span>
            </button>
          ))}
        </div>
      </dialog>
    </header>
  );
}

function AgeButton({
  age,
  label,
  onPick,
}: {
  age: AgeId;
  label: string;
  onPick: (age: AgeId) => void;
}) {
  const { prefs } = usePrefs();
  return (
    <button
      type="button"
      className="age-btn"
      data-age-choice={age}
      aria-pressed={prefs.age === age}
      onClick={() => onPick(age)}
    >
      {label}
    </button>
  );
}

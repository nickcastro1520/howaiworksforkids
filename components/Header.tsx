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
  const { prefs, setTheme, setAge } = usePrefs();

  function openThemes() {
    dialogRef.current?.showModal();
  }

  function chooseTheme(theme: ThemeId) {
    setTheme(theme);
    dialogRef.current?.close();
  }

  function onDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) dialogRef.current?.close();
  }

  return (
    <header className="site-header">
      <div className="header-bar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>
            <span className="brand-name">How AI Works</span>
            <span className="brand-sub">for kids</span>
          </span>
        </Link>
        <button type="button" className="world-switch" onClick={openThemes}>
          <span className="swap-space">Space</span>
          <span className="swap-dinos">Dinos</span>
          <span className="swap-ebikes">E-bikes</span>
          <span aria-hidden="true">▾</span>
          <span className="sr-only">Change world</span>
        </button>
        <nav aria-label="Site" className="nav-links">
          {NAV.map((item) => {
            const current =
              item.href === "/lessons" ? pathname.startsWith("/lessons") : pathname === item.href;
            return (
              <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div role="group" aria-label="Reading level" className="age-switch">
          <AgeButton age="kids" label="Kids 6–10" onPick={setAge} />
          <AgeButton age="tweens" label="Tweens 11–14" onPick={setAge} />
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="theme-dialog"
        aria-labelledby="world-title"
        onClick={onDialogClick}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="kicker">Worlds</p>
            <h2 id="world-title" className="mt-1 font-display text-4xl font-bold">
              Pick a world
            </h2>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
        <p className="mb-4 max-w-xl text-muted">Same lessons. The pictures and examples change.</p>
        <div className="world-grid">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className="world-pick"
              aria-pressed={prefs.theme === theme.id}
              onClick={() => chooseTheme(theme.id)}
            >
              <ThemeArt theme={theme.id} />
              <span className="px-2 font-display text-2xl font-bold">{theme.name}</span>
              <span className="px-2 text-sm text-muted">{theme.blurb}</span>
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

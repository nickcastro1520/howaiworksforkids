"use client";

import { useEffect } from "react";
import { play, setSoundOn, useSoundOn } from "@/lib/sound";

/** Header speaker button. Also plays the tap blip for any button or button-styled link. */
export function SoundToggle() {
  const on = useSoundOn();
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.("button, .btn, [role='button']");
      if (!el || el.closest("[data-no-tap]")) return;
      play("tap");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return (
    <button
      type="button"
      className="sound-toggle"
      data-no-tap
      aria-pressed={on}
      aria-label={on ? "Sound effects on. Tap to turn off." : "Sound effects off. Tap to turn on."}
      title={on ? "Sound on" : "Sound off"}
      onClick={() => setSoundOn(!on)}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
        {on ? (
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}

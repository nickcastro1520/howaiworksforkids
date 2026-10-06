"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GLOSSARY, termId } from "@/lib/glossary";
import { LESSONS } from "@/lib/lessons";

export function WordBook() {
  const [open, setOpen] = useState<string[]>([]);
  const all = open.length === GLOSSARY.length;

  // Linked from a lesson (e.g. /glossary#pattern)? Flip that card open.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const hit = GLOSSARY.find((g) => termId(g.word) === id);
      if (hit) setOpen((o) => (o.includes(hit.word) ? o : [...o, hit.word]));
    };
    const t = window.setTimeout(openFromHash, 0);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);
  return (
    <>
      <p className="center">
        <button type="button" className="btn btn-plain" onClick={() => setOpen(all ? [] : GLOSSARY.map((g) => g.word))}>
          {all ? "Flip them all back" : "Flip all the cards"}
        </button>
      </p>
      <ul className="flip-grid">
        {GLOSSARY.map((g, i) => {
          const isOpen = open.includes(g.word);
          return (
            <li key={g.word} id={termId(g.word)}>
              <button
                type="button"
                className={`flip ${isOpen ? "is-open" : ""}`}
                style={{ "--fc": g.color, "--r": `${(i % 3) - 1}deg` } as React.CSSProperties}
                onClick={() => setOpen((o) => (o.includes(g.word) ? o.filter((w) => w !== g.word) : [...o, g.word]))}
                aria-expanded={isOpen}
              >
                <span className="flip-inner">
                  <span className="flip-front">
                    <span className="flip-word">{g.word}</span>
                    {g.say && <span className="flip-say">say: {g.say}</span>}
                    <span className="flip-tap">Tap to flip</span>
                  </span>
                  <span className="flip-back">
                    <span className="flip-word-sm">{g.word}</span>
                    <span className="flip-means">{g.means}</span>
                  </span>
                </span>
              </button>
              <Link href={`/lessons/${g.lesson}`} className="flip-link">
                See it in Lesson {LESSONS.find((l) => l.slug === g.lesson)?.number} &rarr;
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

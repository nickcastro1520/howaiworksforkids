"use client";

import Link from "next/link";
import { useState } from "react";
import { GLOSSARY } from "@/lib/glossary";

export function WordBook() {
  const [open, setOpen] = useState<string[]>([]);
  const all = open.length === GLOSSARY.length;
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
            <li key={g.word}>
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
              {isOpen && (
                <Link href={`/lessons/${g.lesson}`} className="flip-link">
                  See it in a lesson &rarr;
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

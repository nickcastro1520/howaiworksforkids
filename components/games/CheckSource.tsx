"use client";

import { useState } from "react";
import { sourceShelves } from "@/lib/game-data";
import { pickAge, type AgeId, type ThemeId } from "@/lib/types";

export function CheckSource({
  theme,
  age,
  onComplete,
}: {
  theme: ThemeId;
  age: AgeId;
  onComplete: () => void;
}) {
  const shelf = sourceShelves[theme];
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"ask" | "shelf" | "badguess" | "answered">("ask");
  const [pickedFact, setPickedFact] = useState<string | null>(null);
  const question = shelf.questions[index];
  const fact = shelf.facts.find((card) => card.id === question.factId);

  function resetForNext() {
    if (index === shelf.questions.length - 1) {
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setMode("ask");
    setPickedFact(null);
  }

  return (
    <div>
      <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
        Question {index + 1} of {shelf.questions.length}
      </p>
      <h2 className="mt-1 font-display text-3xl font-bold">{question.ask}</h2>
      {mode === "ask" ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button type="button" className="btn btn-ghost" onClick={() => setMode("badguess")}>
            Just guess
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setMode("shelf")}>
            Check the shelf
          </button>
        </div>
      ) : null}
      {mode === "badguess" ? (
        <div className="mt-4">
          <p className="why-box" role="status">
            A guess with no source: “{question.madeUp}” That can sound sure and still be made up.
          </p>
          <button type="button" className="btn btn-primary mt-3" onClick={() => setMode("shelf")}>
            Check the shelf instead
          </button>
        </div>
      ) : null}
      {mode === "shelf" || mode === "answered" ? (
        <div className="mt-4 grid gap-2">
          {shelf.facts.map((card) => (
            <button
              key={card.id}
              type="button"
              className="choice"
              aria-pressed={pickedFact === card.id}
              onClick={() => {
                setPickedFact(card.id);
                if (question.factId && card.id === question.factId) setMode("answered");
              }}
            >
              <span className="block">{card.title}</span>
              <span className="mt-1 block text-sm font-semibold text-muted">{card.text}</span>
            </button>
          ))}
          {!question.factId ? (
            <button type="button" className="btn btn-sun" onClick={() => setMode("answered")}>
              It’s not on the shelf
            </button>
          ) : null}
        </div>
      ) : null}
      {pickedFact && question.factId && pickedFact !== question.factId ? (
        <p className="mt-3 text-sm" role="status">
          That card is real, and it does not answer this question.
        </p>
      ) : null}
      {mode === "answered" && question.factId && fact ? (
        <div className="mt-4">
          <p className="why-box" role="status">
            From the card “{fact.title}”: {question.fromSource}
          </p>
          <button type="button" className="btn btn-primary mt-3" onClick={resetForNext}>
            {index === shelf.questions.length - 1 ? "Finish" : "Next question"}
          </button>
        </div>
      ) : null}
      {mode === "answered" && !question.factId ? (
        <div className="mt-4">
          <p className="why-box" role="status">
            {pickAge(age, {
              kids: "It is not on the shelf. The honest answer is “I don’t know,” not a made-up name or address.",
              tweens:
                "No source, no answer. Inventing a password, address, or name is worse than saying the shelf does not have it.",
            })}
          </p>
          <button type="button" className="btn btn-primary mt-3" onClick={resetForNext}>
            Finish
          </button>
        </div>
      ) : null}
    </div>
  );
}

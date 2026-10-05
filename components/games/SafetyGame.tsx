"use client";

import { useState } from "react";
import { WhyBox } from "@/components/games/bits";
import { safetyDecks, type SafetyItem } from "@/lib/game-data";
import type { AgeId, ThemeId } from "@/lib/types";

const STEPS = [
  {
    id: "oops",
    title: "Sure does not mean true",
    prompt: "Is this line okay?",
    choices: [
      { id: "right", label: "This is true" },
      { id: "wrong", label: "This is wrong" },
    ],
  },
  {
    id: "privacy",
    title: "Keep private things private",
    prompt: "What should you do with this?",
    choices: [
      { id: "share", label: "Okay to say" },
      { id: "keep", label: "Keep private" },
    ],
  },
  {
    id: "grownup",
    title: "Ask a grown-up",
    prompt: "What fits this moment?",
    choices: [
      { id: "wonder", label: "Okay to wonder" },
      { id: "ask", label: "Ask a grown-up" },
    ],
  },
] as const;

export function SafetyGame({
  theme,
  age,
  onComplete,
}: {
  theme: ThemeId;
  age: AgeId;
  onComplete: () => void;
}) {
  const deck = safetyDecks[theme];
  const [stepIndex, setStepIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const step = STEPS[stepIndex];
  const items = deck[step.id];
  const item: SafetyItem = items[itemIndex];
  const correct = picked === item.answer;

  function next() {
    if (itemIndex === items.length - 1 && stepIndex === STEPS.length - 1) {
      onComplete();
      return;
    }
    setPicked(null);
    if (itemIndex < items.length - 1) {
      setItemIndex((value) => value + 1);
      return;
    }
    setItemIndex(0);
    setStepIndex((value) => value + 1);
  }

  return (
    <div>
      <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
        Part {stepIndex + 1} of {STEPS.length}
      </p>
      <h2 className="mt-1 font-display text-3xl font-bold">{step.title}</h2>
      <p className="mt-2 text-muted">{step.prompt}</p>
      <article className="sticker mt-4 p-4 text-lg font-extrabold">{item.text}</article>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {step.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="choice"
            aria-pressed={picked === choice.id}
            onClick={() => setPicked(choice.id)}
          >
            {choice.label}
          </button>
        ))}
      </div>
      {picked && !correct ? (
        <p className="why-box mt-3" role="status">
          Not this one. Read the line again, then try the other button. The note below appears when you
          pick the careful answer.
        </p>
      ) : null}
      {picked && correct ? <WhyBox age={age} copy={item.why} /> : null}
      {correct ? (
        <button type="button" className="btn btn-primary mt-4" onClick={next}>
          {stepIndex === STEPS.length - 1 && itemIndex === items.length - 1 ? "Finish" : "Next"}
        </button>
      ) : null}
    </div>
  );
}

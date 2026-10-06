"use client";

import { useState } from "react";
import { ChoiceButton, RoundLabel, WhyBox } from "@/components/games/bits";
import { notMagicRounds } from "@/lib/game-data";
import type { ThemeId } from "@/lib/types";

export function NotMagic({
  theme,
  onComplete,
}: {
  theme: ThemeId;
  onComplete: () => void;
}) {
  const rounds = notMagicRounds[theme];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const round = rounds[index];
  const correct = picked === round.answer;

  function choose(id: string) {
    setPicked(id);
    if (id === round.answer && index === rounds.length - 1) onComplete();
  }

  return (
    <div>
      <RoundLabel current={index + 1} total={rounds.length} />
      <h2 className="mt-1 font-display text-3xl font-bold">{round.prompt}</h2>
      <ol className="mt-4 flex flex-wrap gap-2" aria-label="Examples so far">
        {round.sequence.map((item, itemIndex) => (
          <li key={`${item.label}-${itemIndex}`} className="sticker min-w-16 px-3 py-2 text-center shadow-none">
            <span className="block text-2xl" aria-hidden="true">
              {item.emoji}
            </span>
            <span className="text-sm font-extrabold">{item.label}</span>
          </li>
        ))}
        <li className="sticker grid min-w-16 place-items-center px-3 py-2 text-2xl font-bold shadow-none">?</li>
      </ol>
      <div className="mt-4 grid gap-2">
        {round.choices.map((choice) => (
          <ChoiceButton key={choice.id} pressed={picked === choice.id} onClick={() => choose(choice.id)}>
            {choice.label}
          </ChoiceButton>
        ))}
      </div>
      {picked && correct ? <WhyBox copy={round.why} /> : null}
      {picked && !correct ? (
        <p className="why-box mt-3" role="status">
          Not quite. Look at the examples again.
        </p>
      ) : null}
      {correct && index < rounds.length - 1 ? (
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => {
            setIndex((value) => value + 1);
            setPicked(null);
          }}
        >
          Next pattern
        </button>
      ) : null}
    </div>
  );
}

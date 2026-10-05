"use client";

import { useState } from "react";
import { ChoiceButton, RoundLabel, WhyBox } from "@/components/games/bits";
import { lookRounds } from "@/lib/game-data";
import type { AgeId, ThemeId } from "@/lib/types";

export function LookAlikes({
  theme,
  age,
  onComplete,
}: {
  theme: ThemeId;
  age: AgeId;
  onComplete: () => void;
}) {
  const rounds = lookRounds[theme];
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
      <p className="mt-1 text-sm font-extrabold tracking-wide text-accent uppercase">{round.kicker}</p>
      <h2 className="font-display text-3xl font-bold">{round.question}</h2>
      <p className="mt-3 text-lg">{round.story}</p>
      {round.chart ? (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-3" aria-hidden="true">
            {[
              { label: round.chart.aLabel, value: round.chart.a },
              { label: round.chart.bLabel, value: round.chart.b },
            ].map((bar) => (
              <div key={bar.label} className="sticker p-3 shadow-none">
                <div className="flex h-28 items-end">
                  <div
                    className="w-full rounded-t-xl bg-accent"
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-extrabold">{bar.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">{round.chart.caption}</p>
        </div>
      ) : null}
      <div className="mt-4 grid gap-2">
        {round.choices.map((choice) => (
          <ChoiceButton key={choice.id} pressed={picked === choice.id} onClick={() => choose(choice.id)}>
            {choice.label}
          </ChoiceButton>
        ))}
      </div>
      {picked && !correct ? (
        <p className="why-box mt-3" role="status">
          Look again. Alike, or rising together, is not the same as the real reason.
        </p>
      ) : null}
      {picked && correct ? <WhyBox age={age} copy={round.why} /> : null}
      {correct && index < rounds.length - 1 ? (
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => {
            setIndex((value) => value + 1);
            setPicked(null);
          }}
        >
          Next trap
        </button>
      ) : null}
    </div>
  );
}

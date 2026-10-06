"use client";

import { useMemo, useState } from "react";
import { nearestMemory, otherLabel, type Memory } from "@/lib/engine";
import { trainSets, type TrainCard } from "@/lib/game-data";
import type { ThemeId } from "@/lib/types";

export function LearnByTrying({
  theme,
  onComplete,
}: {
  theme: ThemeId;
  onComplete: () => void;
}) {
  const set = trainSets[theme];
  const labels = set.bins.map((bin) => bin.id);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"practice" | "showoff" | "twist">("practice");
  const [note, setNote] = useState<string | null>(null);

  const card: TrainCard =
    phase === "showoff" ? set.showoff : phase === "twist" ? set.twist.card : set.practice[step];

  const activeMemories = useMemo(() => {
    if (phase !== "twist") return memories;
    return memories.map((memory) =>
      memory.id === set.twist.flipId
        ? { ...memory, label: otherLabel(labels, memory.label) }
        : memory,
    );
  }, [labels, memories, phase, set.twist.flipId]);

  const nearest = nearestMemory(activeMemories, card.vec);
  const guess = nearest?.label ?? otherLabel(labels, card.label);
  const guessName = set.bins.find((bin) => bin.id === guess)?.label ?? guess;
  const rememberedName = nearest
    ? [...set.practice, set.showoff, set.twist.card].find((item) => item.id === nearest.id)?.name
    : null;

  function binName(id: string) {
    return set.bins.find((bin) => bin.id === id)?.label ?? id;
  }

  function teach(label: string) {
    if (phase === "twist") return;
    if (label !== card.label) {
      setNote("Check the clues, then pick the other bin.");
      return;
    }
    const nextMemory = { id: card.id, vec: card.vec, label };
    if (phase === "showoff") {
      setNote(`${set.buddy} kept the right guess.`);
      setPhase("twist");
      return;
    }
    const nextMemories = [...memories, nextMemory];
    setMemories(nextMemories);
    setNote(`${set.buddy} will remember ${card.name} as ${binName(label)}.`);
    if (step + 1 >= set.practice.length) setPhase("showoff");
    else setStep((value) => value + 1);
  }

  return (
    <div>
      <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
        {phase === "practice" ? `Try ${step + 1} of ${set.practice.length}` : phase === "showoff" ? "A new try" : "A wrong cheer"}
      </p>
      <h2 className="mt-1 font-display text-3xl font-bold">
        Coach {set.buddy}
      </h2>
      <p className="mt-2 text-muted">
        {set.buddy} only notices two clues. Right cheers help. This stays on your device.
      </p>
      <article className="sticker mt-4 p-4">
        <p className="text-4xl" aria-hidden="true">
          {card.emoji}
        </p>
        <h3 className="font-display text-3xl font-bold">{card.name}</h3>
        <ul className="mt-3 grid gap-1 text-sm">
          {set.clueNames.map((name, index) => (
            <li key={name}>
              <span className="font-extrabold">{name}:</span> {card.vec[index] ? "yes" : "no"}
            </li>
          ))}
        </ul>
      </article>
      <p className="mt-4 rounded-2xl border-2 border-ink bg-blob px-4 py-3 font-extrabold" role="status">
        {nearest
          ? `${set.buddy} guesses “${guessName}” because ${rememberedName ?? "an earlier example"} is the closest example.`
          : `${set.buddy} has no examples yet, so this is a wild guess: “${guessName}.”`}
      </p>
      {phase !== "twist" ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {set.bins.map((bin) => (
            <button key={bin.id} type="button" className="btn btn-primary" onClick={() => teach(bin.id)}>
              It belongs in {bin.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <WhyBoxText text={set.twist.why} />
          <p className="mt-2 font-extrabold">
            {set.buddy} now says “{guessName}” for {card.name}. That guess is wrong.
          </p>
          <button type="button" className="btn btn-sun mt-3" onClick={onComplete}>
            That’s the lesson
          </button>
        </div>
      )}
      {note ? (
        <p className="mt-3 text-sm" role="status">
          {note}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-muted">Examples remembered: {memories.length}</p>
    </div>
  );
}

function WhyBoxText({ text }: { text: string }) {
  return (
    <p className="why-box" role="status">
      {text}
    </p>
  );
}

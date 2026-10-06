"use client";

import { useState } from "react";
import { ChoiceButton, RoundLabel, WhyBox } from "@/components/games/bits";
import { contextRounds } from "@/lib/game-data";
import type { ThemeId } from "@/lib/types";

export function WordsContext({
  theme,
  onComplete,
}: {
  theme: ThemeId;
  onComplete: () => void;
}) {
  const rounds = contextRounds[theme];
  const [roundIndex, setRoundIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const round = rounds[roundIndex];
  const sentence = round.sentences[sentenceIndex];
  const correct = picked === sentence.answer;

  function choose(id: string) {
    setPicked(id);
    const lastSentence = sentenceIndex === round.sentences.length - 1;
    const lastRound = roundIndex === rounds.length - 1;
    if (id === sentence.answer && lastSentence && lastRound) onComplete();
  }

  function next() {
    setPicked(null);
    if (sentenceIndex < round.sentences.length - 1) {
      setSentenceIndex((value) => value + 1);
      return;
    }
    setSentenceIndex(0);
    setRoundIndex((value) => value + 1);
  }

  return (
    <div>
      <RoundLabel current={roundIndex + 1} total={rounds.length} />
      <h2 className="mt-1 font-display text-3xl font-bold">
        What does “{round.word}” mean here?
      </h2>
      <blockquote className="sticker mt-4 p-4 text-xl font-extrabold">
        {sentence.text}
      </blockquote>
      <div className="mt-4 grid gap-2">
        {round.meanings.map((meaning) => (
          <ChoiceButton key={meaning.id} pressed={picked === meaning.id} onClick={() => choose(meaning.id)}>
            {meaning.label}
          </ChoiceButton>
        ))}
      </div>
      {picked && !correct ? (
        <p className="why-box mt-3" role="status">
          The letters stayed the same. Read the other words and try the other meaning.
        </p>
      ) : null}
      {picked && correct ? <WhyBox copy={round.why} /> : null}
      {correct && !(roundIndex === rounds.length - 1 && sentenceIndex === round.sentences.length - 1) ? (
        <button type="button" className="btn btn-primary mt-4" onClick={next}>
          {sentenceIndex === 0 ? "Same word, next sentence" : "Next word"}
        </button>
      ) : null}
    </div>
  );
}

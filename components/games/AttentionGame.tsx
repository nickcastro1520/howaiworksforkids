"use client";

import { useState } from "react";
import { WhyBox } from "@/components/games/bits";
import { attentionScenes } from "@/lib/game-data";
import type { AgeId, ThemeId } from "@/lib/types";

export function AttentionGame({
  theme,
  age,
  onComplete,
}: {
  theme: ThemeId;
  age: AgeId;
  onComplete: () => void;
}) {
  const scenes = attentionScenes[theme];
  const [sceneIndex, setSceneIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const scene = scenes[sceneIndex];
  const question = scene.questions[questionIndex];
  const correct = picked === question.answer;
  const last =
    sceneIndex === scenes.length - 1 && questionIndex === scene.questions.length - 1;

  function choose(id: string) {
    setPicked(id);
    if (id === question.answer && last) onComplete();
  }

  function next() {
    setPicked(null);
    if (questionIndex < scene.questions.length - 1) {
      setQuestionIndex((value) => value + 1);
      return;
    }
    setQuestionIndex(0);
    setSceneIndex((value) => value + 1);
  }

  return (
    <div>
      <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
        Scene {sceneIndex + 1} of {scenes.length}
      </p>
      <h2 className="mt-1 font-display text-3xl font-bold">{scene.title}</h2>
      <p className="mt-3 text-lg font-extrabold">{question.ask}</p>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Details in the scene">
        {scene.details.map((detail) => (
          <button
            key={detail.id}
            type="button"
            className="choice min-h-20"
            aria-pressed={picked === detail.id}
            onClick={() => choose(detail.id)}
          >
            {detail.label}
          </button>
        ))}
      </div>
      {picked && !correct ? (
        <p className="why-box mt-3" role="status">
          That detail is in the scene, but it does not answer this question.
        </p>
      ) : null}
      {picked && correct ? <WhyBox age={age} copy={question.why} /> : null}
      {correct && !last ? (
        <button type="button" className="btn btn-primary mt-4" onClick={next}>
          {questionIndex === 0 ? "Same scene, new question" : "Next scene"}
        </button>
      ) : null}
    </div>
  );
}

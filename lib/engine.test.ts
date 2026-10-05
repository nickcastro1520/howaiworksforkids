import assert from "node:assert/strict";
import test from "node:test";
import { bestSource, nearestMemory, otherLabel, type Memory } from "./engine.ts";
import { sourceShelves, trainSets } from "./game-data.ts";
import { THEME_IDS } from "./types.ts";

for (const theme of THEME_IDS) {
  test(`training story stays honest for ${theme}`, () => {
    const set = trainSets[theme];
    const labels = set.bins.map((bin) => bin.id);
    const memories: Memory[] = [];

    assert.equal(nearestMemory(memories, set.practice[0].vec), null);

    memories.push({
      id: set.practice[0].id,
      vec: set.practice[0].vec,
      label: set.practice[0].label,
    });

    const early = nearestMemory(memories, set.practice[1].vec);
    assert.ok(early);
    assert.notEqual(early.label, set.practice[1].label);

    memories.push({
      id: set.practice[1].id,
      vec: set.practice[1].vec,
      label: set.practice[1].label,
    });

    for (const card of [...set.practice.slice(2), set.showoff]) {
      const guess = nearestMemory(memories, card.vec);
      assert.ok(guess);
      assert.equal(guess.label, card.label, card.name);
      if (card.id !== set.showoff.id) {
        memories.push({ id: card.id, vec: card.vec, label: card.label });
      }
    }

    const bad = memories.map((memory) =>
      memory.id === set.twist.flipId
        ? { ...memory, label: otherLabel(labels, memory.label) }
        : memory,
    );
    const twisted = nearestMemory(bad, set.twist.card.vec);
    assert.ok(twisted);
    assert.notEqual(twisted.label, set.twist.card.label);
  });

  test(`source shelf answers and misses for ${theme}`, () => {
    const shelf = sourceShelves[theme];
    for (const question of shelf.questions) {
      const found = bestSource(question.ask, shelf.facts);
      if (question.factId) {
        assert.ok(found);
        assert.equal(found.id, question.factId);
      } else {
        assert.equal(found, null);
      }
    }
  });
}

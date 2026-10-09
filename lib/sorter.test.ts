import { test } from "node:test";
import assert from "node:assert/strict";
import { JOBS, guess, kindCheck, type Taught } from "./sorter";

for (const job of JOBS) {
  test(`${job.id}: data is consistent`, () => {
    const all = [...job.teach, ...job.test, ...job.extra];
    assert.equal(new Set(all.map((c) => c.id)).size, all.length, "unique ids");
    for (const a of all)
      for (const b of all)
        if (a.label !== b.label) assert.notDeepEqual(a.f, b.f, `${a.id} and ${b.id} look identical but sort differently`);
    for (const k of job.kinds) assert.ok(all.some((c) => c.kind === k), `kind ${k} has cards`);
    assert.ok(job.teach.length >= 6);
  });

  test(`${job.id}: a fair kid run ends with every kind sorted right`, () => {
    for (const n of [6, 7, 8]) {
      const ex: Taught[] = job.teach.slice(0, n).map((card) => ({ card, label: card.label }));
      const mistakes = job.test.filter((t) => guess(job, ex, t)!.label !== t.label);
      // Kid fixes test mistakes, then fixes kinds until all are right.
      for (const m of mistakes) ex.push({ card: m, label: m.label });
      let rounds = 0;
      for (;;) {
        const bad = kindCheck(job, ex).find((k) => !k.ok);
        if (!bad) break;
        const wrong = bad.cards.find((x) => !x.right)!.card;
        ex.push({ card: wrong, label: wrong.label });
        assert.ok(++rounds < 20, "fairness loop ends");
      }
      console.log(`${job.id} n=${n}: test mistakes=${mistakes.map((m) => m.id).join(",") || "none"}, kind fixes=${rounds}`);
    }
  });
}

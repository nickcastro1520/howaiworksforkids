import assert from "node:assert/strict";
import { test } from "node:test";
import {
  BLOB_EXACT_WRITES,
  BLOB_PACK_WRITE_CAP,
  BLOB_SAMPLE_WEIGHT,
  BLOB_SAMPLE_WRITE_CAP,
  BLOB_VISIT_WRITE_CAP,
  chicagoDate,
  counterBlobPath,
  isBotCampVisitPath,
  isKitSubscribeAccepted,
  kitChallengeUrl,
  kitSubscriptionBody,
  kitSubscriptionFields,
  planIncrement,
} from "./botCamp";

test("isBotCampVisitPath counts only the lab page, not teachers or pack", () => {
  assert.equal(isBotCampVisitPath("/bot-camp"), true);
  assert.equal(isBotCampVisitPath("/bot-camp/index.html"), true);
  assert.equal(isBotCampVisitPath("/bot-camp/"), false);
  assert.equal(isBotCampVisitPath("/bot-camp/teachers"), false);
  assert.equal(isBotCampVisitPath("/bot-camp/pack"), false);
  assert.equal(isBotCampVisitPath("/teachers"), false);
});

test("counter blob paths are day-stamped and distinct", () => {
  assert.equal(counterBlobPath("visits", "2026-11-11"), "bc/visits/2026-11-11.json");
  assert.equal(counterBlobPath("pack", "2026-11-11"), "bc/pack/2026-11-11.json");
  assert.notEqual(counterBlobPath("visits", "2026-11-11"), counterBlobPath("pack", "2026-11-11"));
});

test("chicagoDate is YYYY-MM-DD in America/Chicago", () => {
  // 4:30 AM UTC on Nov 12 is still Nov 11 in Chicago (UTC-6).
  assert.equal(chicagoDate(new Date("2026-11-12T04:30:00Z")), "2026-11-11");
  assert.equal(chicagoDate(new Date("2026-11-12T06:30:00Z")), "2026-11-12");
  assert.match(chicagoDate(), /^\d{4}-\d{2}-\d{2}$/);
});

test("planIncrement counts exactly through the exact phase, then samples, then caps", () => {
  const first = planIncrement({ n: 0, writes: 0 }, BLOB_VISIT_WRITE_CAP, BLOB_EXACT_WRITES, BLOB_SAMPLE_WEIGHT, 0);
  assert.deepEqual(first, { write: true, next: { n: 1, writes: 1 } });

  const lastExact = planIncrement(
    { n: BLOB_EXACT_WRITES - 1, writes: BLOB_EXACT_WRITES - 1 },
    BLOB_VISIT_WRITE_CAP,
    BLOB_EXACT_WRITES,
    BLOB_SAMPLE_WEIGHT,
    0.99,
  );
  assert.deepEqual(lastExact, { write: true, next: { n: BLOB_EXACT_WRITES, writes: BLOB_EXACT_WRITES } });

  const skipSample = planIncrement(
    { n: BLOB_EXACT_WRITES, writes: BLOB_EXACT_WRITES },
    BLOB_VISIT_WRITE_CAP,
    BLOB_EXACT_WRITES,
    BLOB_SAMPLE_WEIGHT,
    0.5,
  );
  assert.deepEqual(skipSample, { write: false });

  const takeSample = planIncrement(
    { n: BLOB_EXACT_WRITES, writes: BLOB_EXACT_WRITES },
    BLOB_VISIT_WRITE_CAP,
    BLOB_EXACT_WRITES,
    BLOB_SAMPLE_WEIGHT,
    0,
  );
  assert.deepEqual(takeSample, {
    write: true,
    next: { n: BLOB_EXACT_WRITES + BLOB_SAMPLE_WEIGHT, writes: BLOB_EXACT_WRITES + 1 },
  });

  const capped = planIncrement(
    { n: 100, writes: BLOB_VISIT_WRITE_CAP },
    BLOB_VISIT_WRITE_CAP,
    BLOB_EXACT_WRITES,
    BLOB_SAMPLE_WEIGHT,
    0,
  );
  assert.deepEqual(capped, { write: false });
});

test("hobby monthly put budget stays under 2,000 advanced operations", () => {
  assert.ok((BLOB_VISIT_WRITE_CAP + BLOB_PACK_WRITE_CAP + BLOB_SAMPLE_WRITE_CAP) * 31 < 2000);
});

test("kit subscription fields include grade and opt-in only when ticked, and never tags", () => {
  assert.deepEqual(kitSubscriptionFields({ grade: "4", newLessons: true }), {
    grade: "4",
    new_lessons_opt_in: "true",
  });
  assert.deepEqual(kitSubscriptionFields({ grade: "4", newLessons: false }), { grade: "4" });
  assert.deepEqual(kitSubscriptionFields({ grade: "", newLessons: true }), { new_lessons_opt_in: "true" });
  assert.deepEqual(kitSubscriptionFields({ grade: "", newLessons: false }), {});

  const body = kitSubscriptionBody("nick@example.com", kitSubscriptionFields({ grade: "4", newLessons: true }));
  const params = new URLSearchParams(body);
  assert.equal(params.get("email_address"), "nick@example.com");
  assert.equal(params.get("fields[grade]"), "4");
  assert.equal(params.get("fields[new_lessons_opt_in]"), "true");
  assert.equal(params.get("tags[]"), null);
  assert.equal(params.get("tags"), null);
});

test("isKitSubscribeAccepted is false for quarantined 200s and true only for real accepts", () => {
  assert.equal(isKitSubscribeAccepted(null), false);
  assert.equal(isKitSubscribeAccepted("ok"), false);
  assert.equal(
    isKitSubscribeAccepted({
      consent: { enabled: false },
      status: "quarantined",
      url: "https://app.kit.com/forms/guards/aebe600a-7f1e-4d67-beaf-4c9e797e9f7b",
    }),
    false,
  );
  assert.equal(isKitSubscribeAccepted({ status: "error" }), false);
  assert.equal(isKitSubscribeAccepted({ status: "success" }), true);
  assert.equal(isKitSubscribeAccepted({ status: "unconfirmed" }), true);
  assert.equal(isKitSubscribeAccepted({ subscription: { id: 123, state: "active" } }), true);
  assert.equal(isKitSubscribeAccepted({ subscription: { id: 1, state: "quarantined" } }), false);
  assert.equal(isKitSubscribeAccepted({}), false);
});

test("kitChallengeUrl only returns a Kit guard URL for quarantined responses", () => {
  assert.equal(kitChallengeUrl({ status: "success", url: "https://app.kit.com/forms/guards/abc" }), null);
  assert.equal(kitChallengeUrl({ status: "quarantined" }), null);
  assert.equal(kitChallengeUrl({ status: "quarantined", url: "https://evil.example/forms/guards/abc" }), null);
  assert.equal(
    kitChallengeUrl({
      status: "quarantined",
      url: "https://app.kit.com/forms/guards/aebe600a-7f1e-4d67-beaf-4c9e797e9f7b",
    }),
    "https://app.kit.com/forms/guards/aebe600a-7f1e-4d67-beaf-4c9e797e9f7b",
  );
});

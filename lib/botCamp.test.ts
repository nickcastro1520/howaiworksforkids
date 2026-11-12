import assert from "node:assert/strict";
import { test } from "node:test";
import { chicagoDate, isBotCampVisitPath, packCountKey, visitCountKey } from "./botCamp";

test("isBotCampVisitPath counts only the lab page, not teachers or pack", () => {
  assert.equal(isBotCampVisitPath("/bot-camp"), true);
  assert.equal(isBotCampVisitPath("/bot-camp/index.html"), true);
  assert.equal(isBotCampVisitPath("/bot-camp/"), false);
  assert.equal(isBotCampVisitPath("/bot-camp/teachers"), false);
  assert.equal(isBotCampVisitPath("/bot-camp/pack"), false);
  assert.equal(isBotCampVisitPath("/teachers"), false);
});

test("counter keys are day-stamped and distinct", () => {
  assert.equal(visitCountKey("2026-11-11"), "botcamp:visits:2026-11-11");
  assert.equal(packCountKey("2026-11-11"), "botcamp:pack:2026-11-11");
  assert.notEqual(visitCountKey("2026-11-11"), packCountKey("2026-11-11"));
});

test("chicagoDate is YYYY-MM-DD in America/Chicago", () => {
  // 4:30 AM UTC on Nov 12 is still Nov 11 in Chicago (UTC-6).
  assert.equal(chicagoDate(new Date("2026-11-12T04:30:00Z")), "2026-11-11");
  assert.equal(chicagoDate(new Date("2026-11-12T06:30:00Z")), "2026-11-12");
  assert.match(chicagoDate(), /^\d{4}-\d{2}-\d{2}$/);
});

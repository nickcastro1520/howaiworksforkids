/**
 * Bot Camp helpers: Kit form config and aggregate counters.
 * Never records what kids draw or type, or IPs or user agents.
 * Emails go to Kit only, not our storage.
 */

import { BlobNotFoundError, get, put } from "@vercel/blob";

const CHICAGO = "America/Chicago";

/** Calendar date in America/Chicago, YYYY-MM-DD. */
export function chicagoDate(now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: CHICAGO });
}

export function kitFormId(): string {
  return (process.env.KIT_FORM_ID || process.env.NEXT_PUBLIC_KIT_FORM_ID || "").trim();
}

export function kitApiKey(): string {
  return (process.env.KIT_API_KEY || "").trim();
}

export function kitNewLessonsTagId(): string {
  return (process.env.KIT_NEW_LESSONS_TAG_ID || process.env.NEXT_PUBLIC_KIT_NEW_LESSONS_TAG_ID || "").trim();
}

/** ConvertKit/Kit custom field key for "What grade do you teach?" */
export function kitGradeField(): string {
  return (process.env.KIT_GRADE_FIELD || "grade").trim() || "grade";
}

export function isKitConfigured(): boolean {
  return kitFormId().length > 0;
}

/** Where /bot-camp/pack 302s until the store listing URL is set. */
export function packRedirectTarget(): string {
  const url = (process.env.BOT_CAMP_PACK_URL || "").trim();
  return url || "/bot-camp/teachers";
}

export type CounterKind = "visits" | "pack";

export type DayCount = {
  n: number;
  writes: number;
};

/**
 * Hobby Blob includes 2,000 advanced operations (put/list) per month.
 * Each increment is one put. These daily write caps keep a 31-day month
 * under that limit (40 visit writes + 20 pack writes × 31 = 1,860), leaving
 * a little room for retries and store setup.
 */
export const BLOB_VISIT_WRITE_CAP = 40;
export const BLOB_PACK_WRITE_CAP = 20;
/** First this many writes of the day are exact (+1 each). */
export const BLOB_EXACT_WRITES = 15;
/** After the exact phase, a write adds this many and happens with probability 1/weight. */
export const BLOB_SAMPLE_WEIGHT = 10;

export function writeCap(kind: CounterKind): number {
  return kind === "visits" ? BLOB_VISIT_WRITE_CAP : BLOB_PACK_WRITE_CAP;
}

export function counterBlobPath(kind: CounterKind, day: string): string {
  return `bc/${kind}/${day}.json`;
}

export function isBlobConfigured(): boolean {
  return Boolean((process.env.BLOB_READ_WRITE_TOKEN || "").trim() || (process.env.BLOB_STORE_ID || "").trim());
}

/**
 * Decide whether to write a new daily total, and what the next stored values are.
 * `rand` is a number in [0, 1), like Math.random().
 */
export function planIncrement(
  current: DayCount,
  cap: number,
  exactWrites = BLOB_EXACT_WRITES,
  sampleWeight = BLOB_SAMPLE_WEIGHT,
  rand = Math.random(),
): { write: false } | { write: true; next: DayCount } {
  if (current.writes >= cap) return { write: false };
  if (current.writes < exactWrites) {
    return { write: true, next: { n: current.n + 1, writes: current.writes + 1 } };
  }
  if (rand >= 1 / sampleWeight) return { write: false };
  return { write: true, next: { n: current.n + sampleWeight, writes: current.writes + 1 } };
}

const EMPTY: DayCount = { n: 0, writes: 0 };

function normalizeCount(data: unknown): DayCount {
  if (!data || typeof data !== "object") return { ...EMPTY };
  const rec = data as { n?: unknown; writes?: unknown };
  const n = Number(rec.n);
  const writes = Number(rec.writes);
  return {
    n: Number.isFinite(n) && n >= 0 ? n : 0,
    writes: Number.isFinite(writes) && writes >= 0 ? writes : 0,
  };
}

async function readDayCount(path: string): Promise<DayCount> {
  try {
    const res = await get(path, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200 || !res.stream) return { ...EMPTY };
    const text = await new Response(res.stream).text();
    return normalizeCount(JSON.parse(text) as unknown);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return { ...EMPTY };
    throw err;
  }
}

async function writeDayCount(path: string, count: DayCount): Promise<void> {
  await put(path, JSON.stringify(count), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    contentType: "application/json",
  });
}

/** Lab page visits only, not the teachers form or the pack redirect. */
export function isBotCampVisitPath(pathname: string): boolean {
  return pathname === "/bot-camp" || pathname === "/bot-camp/index.html";
}

export async function incrementCounter(kind: CounterKind, now = new Date()): Promise<void> {
  if (!isBlobConfigured()) return;
  const day = chicagoDate(now);
  const path = counterBlobPath(kind, day);
  const current = await readDayCount(path);
  const planned = planIncrement(current, writeCap(kind));
  if (!planned.write) return;
  await writeDayCount(path, planned.next);
}

export async function readCounter(kind: CounterKind, day: string): Promise<DayCount> {
  if (!isBlobConfigured()) return { ...EMPTY };
  return readDayCount(counterBlobPath(kind, day));
}

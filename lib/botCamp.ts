/**
 * Bot Camp helpers: Kit form config and aggregate counters.
 * Never records what kids draw or type. Emails go to Kit only, not our storage.
 */

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

export type KvConfig = { url: string; token: string };

export function kvConfig(): KvConfig | null {
  const url = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "").trim().replace(/\/$/, "");
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "").trim();
  if (!url || !token) return null;
  return { url, token };
}

export function visitCountKey(day: string): string {
  return `botcamp:visits:${day}`;
}

export function packCountKey(day: string): string {
  return `botcamp:pack:${day}`;
}

/** Lab page visits only, not the teachers form or the pack redirect. */
export function isBotCampVisitPath(pathname: string): boolean {
  return pathname === "/bot-camp" || pathname === "/bot-camp/index.html";
}

export async function incrementCounter(key: string): Promise<void> {
  const kv = kvConfig();
  if (!kv) return;
  const res = await fetch(`${kv.url}/incr/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${kv.token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`KV incr failed (${res.status}): ${text.slice(0, 200)}`);
  }
}

export async function readCounter(key: string): Promise<number | null> {
  const kv = kvConfig();
  if (!kv) return null;
  const res = await fetch(`${kv.url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${kv.token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: string | number | null };
  const n = Number(data.result);
  return Number.isFinite(n) ? n : 0;
}

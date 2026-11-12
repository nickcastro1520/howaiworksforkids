/** Kit public form helpers. Safe to import from client components (no storage SDK). */

export const KIT_NEW_LESSONS_FIELD = "new_lessons_opt_in";

/** ConvertKit/Kit custom field key for "What grade do you teach?" */
export function kitGradeField(): string {
  return (process.env.KIT_GRADE_FIELD || "grade").trim() || "grade";
}

/**
 * Custom fields for a Kit form subscription. Grade is included when provided.
 * new_lessons_opt_in is included only when the box is ticked. No tags.
 */
export function kitSubscriptionFields(input: { grade: string; newLessons: boolean }): Record<string, string> {
  const fields: Record<string, string> = {};
  if (input.grade) fields[kitGradeField()] = input.grade;
  if (input.newLessons) fields[KIT_NEW_LESSONS_FIELD] = "true";
  return fields;
}

/** URL-encoded body for the public form subscription endpoint (no API key, no tags). */
export function kitSubscriptionBody(email: string, fields: Record<string, string>): string {
  const params = new URLSearchParams();
  params.set("email_address", email);
  for (const [key, value] of Object.entries(fields)) {
    params.set(`fields[${key}]`, value);
  }
  return params.toString();
}

export function kitSubscribeUrl(formId: string): string {
  return `https://app.kit.com/forms/${encodeURIComponent(formId)}/subscriptions`;
}

/** Statuses that mean Kit actually accepted the subscriber (or recorded a pending double opt-in). */
const ACCEPTED_STATUSES = new Set(["success", "created", "confirmed", "unconfirmed", "active"]);

/**
 * Kit's public form endpoint can return HTTP 200 with status "quarantined" when
 * bot protection holds the signup for a CAPTCHA. That is not a successful subscribe.
 */
export function isKitSubscribeAccepted(payload: unknown): boolean {
  if (!payload || typeof payload !== "object") return false;
  const data = payload as Record<string, unknown>;
  const status = typeof data.status === "string" ? data.status.toLowerCase() : "";
  if (status === "quarantined" || status === "error" || status === "failed" || status === "invalid") {
    return false;
  }
  if (ACCEPTED_STATUSES.has(status)) return true;
  const sub = data.subscription;
  if (sub && typeof sub === "object") {
    const rec = sub as { id?: unknown; state?: unknown };
    const state = typeof rec.state === "string" ? rec.state.toLowerCase() : "";
    if (state === "quarantined" || state === "error" || state === "failed") return false;
    return rec.id != null || ACCEPTED_STATUSES.has(state);
  }
  return false;
}

/** Guard/CAPTCHA URL from a quarantined Kit response, or null. */
export function kitChallengeUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { status?: unknown; url?: unknown };
  if (String(data.status || "").toLowerCase() !== "quarantined") return null;
  const url = typeof data.url === "string" ? data.url.trim() : "";
  if (!/^https:\/\/app\.kit\.com\/forms\/guards\/[A-Za-z0-9-]+\/?$/.test(url)) return null;
  return url;
}

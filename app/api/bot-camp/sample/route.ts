import { NextResponse } from "next/server";
import { isKitConfigured, kitApiKey, kitFormId, kitGradeField, kitNewLessonsTagId } from "@/lib/botCamp";

type Body = {
  email?: string;
  grade?: string;
  newLessons?: boolean;
};

function invalid(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

/**
 * Forwards a teacher/parent sample request to Kit. We do not store the email.
 * Returns a friendly "coming soon" error if KIT_FORM_ID is not set.
 */
export async function POST(request: Request) {
  if (!isKitConfigured()) {
    return NextResponse.json(
      { ok: false, error: "coming_soon", message: "Sign-up is coming soon. The mailbox is not connected yet." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return invalid("Please check the form and try again.");
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return invalid("Please enter a working email address.");
  }
  const grade = (body.grade || "").trim().slice(0, 80);
  const newLessons = Boolean(body.newLessons);
  const formId = kitFormId();
  const apiKey = kitApiKey();
  const tagId = kitNewLessonsTagId();
  const field = kitGradeField();

  try {
    if (apiKey) {
      const payload: Record<string, unknown> = {
        api_key: apiKey,
        email,
        fields: grade ? { [field]: grade } : {},
      };
      if (newLessons && tagId) {
        const tag = Number(tagId);
        payload.tags = Number.isFinite(tag) && tag > 0 ? [tag] : [tagId];
      }
      const res = await fetch(`https://api.convertkit.com/v3/forms/${encodeURIComponent(formId)}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
      }
    } else {
      const params = new URLSearchParams();
      params.set("email_address", email);
      if (grade) params.set(`fields[${field}]`, grade);
      if (newLessons && tagId) params.append("tags[]", tagId);
      const res = await fetch(`https://app.kit.com/forms/${encodeURIComponent(formId)}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: params.toString(),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
      }
    }
  } catch {
    return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

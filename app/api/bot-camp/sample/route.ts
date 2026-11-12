import { NextResponse } from "next/server";
import {
  incrementCounter,
  isKitConfigured,
  kitApiKey,
  kitFormId,
  kitSubscriptionBody,
  kitSubscriptionFields,
} from "@/lib/botCamp";

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
 * On a successful Kit subscribe, increments the daily sample-sent total only.
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
  const fields = kitSubscriptionFields({ grade, newLessons });

  try {
    if (apiKey) {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${encodeURIComponent(formId)}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ api_key: apiKey, email, fields }),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
      }
    } else {
      const res = await fetch(`https://app.kit.com/forms/${encodeURIComponent(formId)}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: kitSubscriptionBody(email, fields),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
      }
    }
  } catch {
    return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
  }

  try {
    await incrementCounter("sample");
  } catch {
    // The lesson email was accepted; a missed count must not fail the request.
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import {
  incrementCounter,
  isKitConfigured,
  isKitSubscribeAccepted,
  kitApiKey,
  kitChallengeUrl,
  kitFormId,
  kitSubscribeUrl,
  kitSubscriptionBody,
  kitSubscriptionFields,
} from "@/lib/botCamp";

type Body = {
  email?: string;
  grade?: string;
  newLessons?: boolean;
  /** Set when the browser already got an accepted response from Kit. */
  kitAccepted?: boolean;
};

function invalid(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function kitNotAccepted(payload: unknown) {
  const url = kitChallengeUrl(payload);
  if (url) {
    return NextResponse.json(
      {
        ok: false,
        error: "kit_challenge",
        url,
        message: "Please complete the security check to get your lesson.",
      },
      { status: 403 },
    );
  }
  return NextResponse.json({ ok: false, error: "kit_failed" }, { status: 502 });
}

async function readJson(res: Response): Promise<unknown> {
  const type = res.headers.get("content-type") || "";
  if (!type.includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Forwards a teacher/parent sample request to Kit, or records a daily total
 * after the browser already received an accepted Kit response.
 * We do not store the email. ok: true only when Kit actually accepted the subscriber.
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

  // The public form endpoint quarantines server-side requests (bot protection).
  // When the browser already got an accepted Kit status, only record the daily total.
  if (body.kitAccepted === true) {
    try {
      await incrementCounter("sample");
    } catch {
      // The lesson request was already accepted; a missed count must not fail the request.
    }
    return NextResponse.json({ ok: true });
  }

  try {
    let res: Response;
    if (apiKey) {
      res = await fetch(`https://api.convertkit.com/v3/forms/${encodeURIComponent(formId)}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ api_key: apiKey, email, fields }),
        redirect: "manual",
      });
    } else {
      res = await fetch(kitSubscribeUrl(formId), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: kitSubscriptionBody(email, fields),
        redirect: "manual",
      });
    }
    // Do not treat redirects or a bare 2xx as success. Kit returns 200 for
    // quarantined signups that were not added to the list.
    if (res.status >= 300) {
      return kitNotAccepted(null);
    }
    const payload = await readJson(res);
    if (!isKitSubscribeAccepted(payload)) {
      return kitNotAccepted(payload);
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

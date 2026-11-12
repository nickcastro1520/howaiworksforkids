import { NextResponse } from "next/server";
import { chicagoDate, kvConfig, packCountKey, readCounter, visitCountKey } from "@/lib/botCamp";

/**
 * Aggregate Bot Camp counts for a day (America/Chicago). Numbers only.
 * Sample sign-ups are counted in Kit, not here.
 */
export async function GET(request: Request) {
  if (!kvConfig()) {
    return NextResponse.json({
      configured: false,
      timezone: "America/Chicago",
      note: "Visit and pack-click counts need a free Upstash Redis (or Vercel KV) store. Sample sign-ups are counted in Kit.",
    });
  }
  const day = new URL(request.url).searchParams.get("day") || chicagoDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return NextResponse.json({ error: "Use day=YYYY-MM-DD" }, { status: 400 });
  }
  const [visits, packClicks] = await Promise.all([readCounter(visitCountKey(day)), readCounter(packCountKey(day))]);
  return NextResponse.json({
    configured: true,
    timezone: "America/Chicago",
    day,
    visits: visits ?? 0,
    packClicks: packClicks ?? 0,
    sampleSignups: "See the Kit dashboard. This site does not store those emails.",
  });
}

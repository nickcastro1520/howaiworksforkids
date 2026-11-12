import { NextResponse } from "next/server";
import {
  BLOB_EXACT_WRITES,
  BLOB_PACK_WRITE_CAP,
  BLOB_SAMPLE_WEIGHT,
  BLOB_SAMPLE_WRITE_CAP,
  BLOB_VISIT_WRITE_CAP,
  chicagoDate,
  isBlobConfigured,
  readCounter,
  writeCap,
  type CounterKind,
} from "@/lib/botCamp";

/**
 * Aggregate Bot Camp counts for a day (America/Chicago). Numbers only.
 * Sample emails themselves are in Kit, not in this store.
 */
export async function GET(request: Request) {
  if (!isBlobConfigured()) {
    return NextResponse.json({
      configured: false,
      timezone: "America/Chicago",
      note: "Visit, pack-click, and sample-sent counts need a Vercel Blob store. Sample emails themselves are stored in Kit, not here.",
    });
  }
  const day = new URL(request.url).searchParams.get("day") || chicagoDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return NextResponse.json({ error: "Use day=YYYY-MM-DD" }, { status: 400 });
  }
  const [visits, packClicks, sampleSignups] = await Promise.all([
    readCounter("visits", day),
    readCounter("pack", day),
    readCounter("sample", day),
  ]);
  const capped = (kind: CounterKind, writes: number) => writes >= writeCap(kind);
  return NextResponse.json({
    configured: true,
    timezone: "America/Chicago",
    day,
    visits: visits.n,
    packClicks: packClicks.n,
    sampleSignups: sampleSignups.n,
    visitsCapped: capped("visits", visits.writes),
    packClicksCapped: capped("pack", packClicks.writes),
    sampleSignupsCapped: capped("sample", sampleSignups.writes),
    sampleSignupsNote: "This is a daily total only. Emails are in Kit, not in this store.",
    note: `Counts are exact for the first ${BLOB_EXACT_WRITES} events of the day, then sampled (about 1 in ${BLOB_SAMPLE_WEIGHT}). Writing stops after ${BLOB_VISIT_WRITE_CAP} visit writes, ${BLOB_PACK_WRITE_CAP} pack-click writes, and ${BLOB_SAMPLE_WRITE_CAP} sample-sent writes per day to stay on the Vercel Hobby Blob free tier (2,000 advanced operations per month). Concurrent requests may slightly undercount.`,
  });
}

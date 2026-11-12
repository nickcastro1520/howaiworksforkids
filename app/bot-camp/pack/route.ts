import { NextResponse } from "next/server";
import { incrementCounter, packRedirectTarget } from "@/lib/botCamp";

/**
 * Placeholder classroom-pack click counter.
 * When packUrl in the lab page is set to /bot-camp/pack, each click 302s to the
 * store listing (BOT_CAMP_PACK_URL, or /bot-camp/teachers until that is set)
 * and increments a daily total. packUrl in index.html is still left empty.
 */
export async function GET(request: Request) {
  try {
    await incrementCounter("pack");
  } catch {
    // Still send the visitor on; a missing counter must not block the click.
  }
  const target = packRedirectTarget();
  const location = target.startsWith("http") ? target : new URL(target, request.url).toString();
  return NextResponse.redirect(location, 302);
}

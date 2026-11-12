import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { chicagoDate, incrementCounter, isBotCampVisitPath, visitCountKey } from "@/lib/botCamp";

/**
 * Count visits to the Bot Camp lab page only (aggregate numbers, no kid content).
 * No-ops until an Upstash/Vercel KV URL and token are set in the environment.
 */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (request.method === "GET" && isBotCampVisitPath(request.nextUrl.pathname)) {
    event.waitUntil(incrementCounter(visitCountKey(chicagoDate())).catch(() => undefined));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/bot-camp", "/bot-camp/index.html"],
};

import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { incrementCounter, isBotCampVisitPath } from "@/lib/botCamp";

/**
 * Count visits to the Bot Camp lab page only (aggregate numbers, no kid content).
 * No-ops until BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID is set.
 * /bot-camp is a static HTML file, so ?_rsc= prefetches must not 404.
 */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;
  if (isBotCampVisitPath(path) && request.nextUrl.searchParams.has("_rsc")) {
    return new NextResponse(null, { status: 204 });
  }
  if (request.method === "GET" && isBotCampVisitPath(path)) {
    event.waitUntil(incrementCounter("visits").catch(() => undefined));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/bot-camp", "/bot-camp/index.html"],
};

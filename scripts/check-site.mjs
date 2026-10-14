#!/usr/bin/env node
/**
 * Crawl a running build of the site and fail on:
 *  - any internal link or sitemap URL that doesn't return 200
 *  - a page without exactly one <h1>
 *  - an <img> without alt text
 *  - leftover placeholder text (TODO, lorem ipsum, FIXME)
 * Usage: node scripts/check-site.mjs [baseUrl]   (default http://localhost:3000)
 */
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://howaiworksforkids.com";
const problems = [];
const seen = new Map();
const queue = ["/"];

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");

async function visit(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  seen.set(path, res.status);
  if (res.status !== 200) {
    problems.push(`${path} -> HTTP ${res.status}`);
    return;
  }
  if (!(res.headers.get("content-type") || "").includes("text/html")) return;
  const html = await res.text();
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) problems.push(`${path}: ${h1s} <h1> elements`);
  for (const img of html.match(/<img\b[^>]*>/gi) || []) if (!/\balt=/.test(img)) problems.push(`${path}: <img> without alt`);
  const text = strip(html);
  const bad = /\b(TODO|FIXME|lorem ipsum)\b/i.exec(text);
  if (bad) problems.push(`${path}: placeholder text "${bad[0]}"`);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next")) continue;
    const clean = href.split("#")[0].split("?")[0] || "/";
    if (!seen.has(clean) && !queue.includes(clean)) queue.push(clean);
  }
}

while (queue.length) await visit(queue.shift());

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
for (const p of locs) {
  if (seen.has(p)) {
    if (seen.get(p) !== 200) problems.push(`sitemap ${p} -> HTTP ${seen.get(p)}`);
    continue;
  }
  const s = (await fetch(BASE + p, { redirect: "manual" })).status;
  if (s !== 200) problems.push(`sitemap ${p} -> HTTP ${s}`);
}

console.log(`Checked ${seen.size} linked URLs and ${locs.length} sitemap URLs on ${BASE}.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("No broken links, heading, alt-text, or placeholder problems.");

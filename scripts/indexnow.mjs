#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver and others) about every URL in the live sitemap.
 * Free, no account. The key is public by design: search engines check it at KEY_LOCATION.
 *   node scripts/indexnow.mjs            # submit
 *   node scripts/indexnow.mjs --dry-run  # print what would be sent
 */
const HOST = "howaiworksforkids.com";
const SITE = `https://${HOST}`;
export const KEY = "fb3aee366ff77052d7127abe018755b4";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dryRun = process.argv.includes("--dry-run");

async function main() {
  const keyRes = await fetch(KEY_LOCATION);
  const keyText = (await keyRes.text()).trim();
  if (!keyRes.ok || keyText !== KEY) throw new Error(`Key file check failed at ${KEY_LOCATION} (HTTP ${keyRes.status})`);

  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))].filter((u) => u.startsWith(SITE));
  if (urlList.length === 0) throw new Error("No URLs found in the sitemap");

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  if (dryRun) {
    console.log(JSON.stringify(body, null, 2));
    console.log(`Dry run: ${urlList.length} URLs, nothing sent.`);
    return;
  }
  const post = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await post.text();
  console.log(`IndexNow: HTTP ${post.status} for ${urlList.length} URLs ${text}`);
  // 200 = accepted, 202 = accepted, key validation pending.
  if (post.status !== 200 && post.status !== 202) process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

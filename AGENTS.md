# AGENTS.md — howaiworksforkids.com

## What the site is and who it's for
A kid-safe, interactive site that explains AI to kids ages 6–10. Kids learn by teaching a tiny AI named Pip.
It is also a portfolio piece for Nick Castro's job hunt in AI enablement and training. His sons Nathan (8) and Nolan (11) are the test users.

## Current status (updated 2026-11-12)
**Live:**
- 15 lessons in 2 sections (Section 1: lessons 1–7; Section 2 "Pip Grows Up": lessons 8–15), a final quiz, and a certificate.
- Progress tracking, a 15-badge shelf, and Next lesson cards.
- Bonus games: /play/sort-training-data and /play/guess-the-next-word. Sound effects have a mute toggle.
- Pages: /parents, /teachers (free Lesson 1 kit), and /how-i-built-this.
- IndexNow: submits daily and after each push to main.
- CI (GitHub Actions): lint, unit tests, build, and scripts/check-site.mjs.
- Parent guide /explain-ai-to-kids ("How to explain AI to an 8-year-old"): live since 2026-10-22 (PR #19).
- SEO internal links live since 2026-11-04 (PR #21): homepage FAQ intro links /explain-ai-to-kids; "Play it again →" at the end of Lessons 2 and 3.
- Bot Camp at /bot-camp: the 14-station lab page (Doodle Brain, Self-Driving School, Treat Hunt, Parrot Bot, Guess Machine, Fair or Unfair?, Taste Twins, Smart Rockets, Robot Eyes, Beat the Keeper, Moon Lander School, Tic-Tac-Toe Trainer, Head to Head, Camp Finale), served as-is from Claude's Nov 12, 2026 handoff (sha256 fbad3a2f…). Homepage card: "Don't just read about AI. Train one. Fourteen free hands-on labs." /bot-camp/teachers uses the Launch Kit wording; the sample form is live (KIT_FORM_ID 10178091). The browser posts to Kit; our sample route reports ok and increments the counter only when Kit returns an accepted status, not a quarantined 200. /bot-camp/pack 302s to /bot-camp/teachers until BOT_CAMP_PACK_URL is set. packUrl in index.html is empty until the classroom pack listing is live. Visit, pack-click, and sample-sent counters use a private Vercel Blob store on the Hobby free tier (daily write caps so monthly advanced operations stay under 2,000). The teachers form is connected to Kit (form ID in KIT_FORM_ID); KIT_NEW_LESSONS_TAG_ID stays unset on the free plan, and the opt-in is sent as fields[new_lessons_opt_in] only when the box is ticked. /bot-camp and /bot-camp/index.html send a Link canonical header; the HTML file itself is unchanged (sha256 fbad3a2f…). The classroom pack and free sample still cover the first nine stations and were not changed. The paid classroom pack PDF is not published.

**Open pull requests:**
- #20 (/is-ai-safe-for-kids parent guide) — preview only, waiting on Nick's OK.

**In progress:** a weekly SEO report, run Mondays. During the approval period (Oct 26 to Nov 16), it only proposes changes and publishes nothing without Nick's OK.

## Decisions (newest first)

- **2026-11-12:** Bot Camp updated to 14 stations from Claude's handoff. The self-contained /bot-camp/index.html was replaced as-is (no edit, split, minify, or wrap); packUrl stayed empty. New stations: Beat the Keeper, Moon Lander School, Tic-Tac-Toe Trainer, Head to Head, and Camp Finale (unlocks after the other 13 patches). Homepage card and other site copy that said nine labs now say fourteen. The classroom pack PDF and free sample were not changed and still cover the first nine stations. Saved patches in the browser carry over. Do not add any script to index.html.

- **2026-11-11 (night, Kit accept fix):** Kit's public form endpoint can return HTTP 200 with `{ status: "quarantined", url: "https://app.kit.com/forms/guards/…" }` when bot protection holds a signup for a CAPTCHA. That is not a subscriber. The sample route now returns ok only after an accepted Kit status (success, unconfirmed, etc.) and increments the sample-sent counter only then. The teachers form posts to Kit from the visitor's browser (not from our server) so ordinary visitors are less likely to be quarantined; if Kit still asks for a security check, we send them to the guard URL. The teachers page CSP allows connect-src to https://app.kit.com for that browser POST. Do not treat a bare 2xx as success.

- **2026-11-11 (night):** The /bot-camp/teachers form is live with KIT_FORM_ID (Kit form 10178091). The route POSTs to the Kit form subscription endpoint with fields[grade] and, only when the box is ticked, fields[new_lessons_opt_in]. KIT_NEW_LESSONS_TAG_ID is left unset (no tag on the free plan). Successful submits increment a daily sample-sent total in Blob; the email itself stays in Kit only. Daily write caps are 35 visit / 15 pack / 10 sample writes, still under the Hobby 2,000 advanced-operations monthly limit.

- **2026-11-11 (late evening):** Bot Camp counters switched to a private Vercel Blob store on the Hobby free tier (no card). Marketplace Upstash Redis was not used because every listed plan required a payment method. Counts are exact for the first 15 events of a day, then sampled, and writing stops after 40 visit writes and 20 pack-click writes per day so monthly put/list operations stay under the 2,000 Hobby cap. Concurrent writes may slightly undercount. Nothing kids draw or type, and no IPs or user agents, is stored. /bot-camp and /bot-camp/index.html send a Link: rel="canonical" header; the lab HTML stays byte-identical. /bot-camp/teachers has a descriptive title and meta description, one h1, a visible FAQ (What is Bot Camp? / What ages? / Do kids need an account?), LearningResource JSON-LD (isAccessibleForFree, educationalLevel grades 3–6), and BreadcrumbList Home > Bot Camp > Teachers. Links to the static lab page use a plain <a> (and ?_rsc= requests return 204) so Next.js prefetch does not 404. The form stays coming-soon until KIT_FORM_ID is set. packUrl stays empty until the store listing is live.

- **2026-11-11 (evening):** Bot Camp Part 1 is live (PR #23 squash-merge, main `7cbd6e9`). The lab page is the 9-station version, served as-is; packUrl stays empty. The sash shows "N of 9 patches." Homepage card text is "Don't just read about AI. Train one. Nine free hands-on labs." /bot-camp/teachers uses the Launch Kit "Free sample page" wording. The form posts to Kit once KIT_FORM_ID is set; until then it shows a coming-soon state. Grade is a custom field; the new-lessons checkbox is a Kit tag. Teacher emails go to Kit only, not our database; unsubscribe any time; nothing from kids. The free sample PDF is not hosted as a public file — attach Bot-Camp-Free-Sample.pdf in Kit (email copy is in the Launch Kit). /bot-camp/pack 302s to BOT_CAMP_PACK_URL (or /bot-camp/teachers if unset) and will count clicks; set packUrl in index.html to https://howaiworksforkids.com/bot-camp/pack only after the store listing is live. Do not add any script to index.html. The paid Bot-Camp-Classroom-Pack.pdf is not published.


- **2026-11-11:** Bot Camp ships as Claude's self-contained page at /bot-camp, served as-is (no rewrite, split, minify, or site layout/scripts). "Bot Camp" is in the main nav, and the homepage has a feature card ("Don't just read about AI. Train one. Seven free hands-on labs." / "Open Bot Camp"). packUrl stays empty until Nick gives the classroom-pack sales URL. The paid Bot-Camp-Classroom-Pack.pdf is not in the repo and is not published.

- **2026-11-04:** SEO internal links (Nick: "Yes"): homepage FAQ intro links /explain-ai-to-kids; "Play it again →" at the end of Lesson 2 (→ /play/sort-training-data) and Lesson 3 (→ /play/guess-the-next-word).

- 2026-10-23: Every site change gets reported to the SEO & AEO Desk bot with the changed URLs.
- **2026-10-22:** Added a parent guide, /explain-ai-to-kids, targeting "how to explain AI to an 8-year-old". Pages that rank now give advice only; ours links every tip to a real game. Linked from /parents and /teachers, in the sitemap (so IndexNow picks it up), with FAQ schema.
- **2026-10-21:** Added AGENTS.md so every AI on the project stays in sync without Nick relaying messages.
- **2026-10-20:** SEO changes need Nick's OK through Nov 16, so he can review the first month before changes ship on their own.
- **2026-10-14 (PR #18):** IndexNow and lesson summaries that work without JavaScript, so search engines find and read pages faster.
- **2026-10-14 (PR #17):** Sound effects with a mute toggle (off by default on touch screens), plus two bonus games, for more engagement.
- **2026-10-14 (PR #16):** Course counts changed from 7 to 15 so the site matches the real course.
- **2026-10-14 (PRs #14, #15):** Home speed fix (delayed animations, analytics loads when idle). The site only publishes live Lighthouse numbers.
- **2026-10-14 (PR #13):** Progress tracking, badges, a book card (Parents and Teachers pages only), the how-i-built-this page, and CI, to keep kids coming back and show how the site is built.
- **2026-10-14:** Ship straight to live once checks pass. Nick said "Just do it."
- **2026-10-09 (PRs #8–#10):** Section 2 "Pip Grows Up" (lessons 8–15), final quiz, certificate, and the Lesson 8 video.
- **2026-10-08 (PRs #5–#7):** Read-aloud for pre-readers, real tester quotes, and the /teachers page with a free kit.
- **2026-10-06:** Rebuilt around Pip, and Grok writes all the code. Kids learn more by teaching than by reading.
- **2026-10-05:** Bought the domain. Ages 6–10 only, to keep the site focused.

## Next steps
- Confirm Bot-Camp-Free-Sample.pdf is attached to the Kit form confirmation email.
- Classroom pack store listing at $12 still needs Nick's OK on the seller plan before publishing; do not set packUrl until it is live. The pack and free sample still cover only the first nine of the fourteen stations.
- Nathan and Nolan test Section 2 and the bonus games. Use only their real feedback on the site.
- Fix the 53px sideways scroll on 320px-wide screens.
- Keep an eye on home-page speed variance.
- First weekly SEO report on Oct 26.

## Rules

- After any site change (new or edited pages, URLs, titles, content), message the SEO & AEO Desk bot with priority true: what changed plus the full URLs, so it can request indexing and do its SEO/AEO work. (Nick, 2026-10-23)
- Read AGENTS.md at the start of every session. Update it at the end with what changed and what's next, then commit.
- Grok is the main builder. Claude is used for reviews and big decisions, and reads AGENTS.md to catch up.
- Only one AI edits a repo at a time. If Claude has an open pull request on your repo, don't edit until it's merged.
- Commit to GitHub before publishing. Never put keys in code or chat.
- Never claim a test ran unless you show its results.

**Site rules:** no ads, no accounts, no kid data collection, no open AI chat, COPPA-friendly, core lessons free forever, never invent kid quotes or numbers, and no Grok Bot mentions on the site.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

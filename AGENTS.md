# AGENTS.md — howaiworksforkids.com

## What the site is and who it's for
A kid-safe, interactive site that explains AI to kids ages 6–10. Kids learn by teaching a tiny AI named Pip.
It is also a portfolio piece for Nick Castro's job hunt in AI enablement and training. His sons Nathan (8) and Nolan (11) are the test users.

## Current status (updated 2026-10-22)
**Live:**
- 15 lessons in 2 sections (Section 1: lessons 1–7; Section 2 "Pip Grows Up": lessons 8–15), a final quiz, and a certificate.
- Progress tracking, a 15-badge shelf, and Next lesson cards.
- Bonus games: /play/sort-training-data and /play/guess-the-next-word. Sound effects have a mute toggle.
- Pages: /parents, /teachers (free Lesson 1 kit), and /how-i-built-this.
- IndexNow: submits daily and after each push to main.
- CI (GitHub Actions): lint, unit tests, build, and scripts/check-site.mjs.

**Open pull requests:** "How to explain AI to an 8-year-old" guide at /explain-ai-to-kids (branch explain-ai-to-kids). Waiting for Nick to review the preview; do not merge without his OK.

**In progress:** a weekly SEO report, run Mondays. During the approval period (Oct 26 to Nov 16), it only proposes changes and publishes nothing without Nick's OK.

## Decisions (newest first)
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
- Nick reviews the /explain-ai-to-kids preview; merge after his OK.
- Nathan and Nolan test Section 2 and the bonus games. Use only their real feedback on the site.
- Fix the 53px sideways scroll on 320px-wide screens.
- Keep an eye on home-page speed variance.
- First weekly SEO report on Oct 26.

## Rules
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

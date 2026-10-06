# How AI Works for Kids — rebuild plan (ages 6–10)

## The big idea
Kids don't just read about AI. They **teach a tiny AI named Pip**.
Pip starts out knowing nothing. In each lesson the kid shows Pip something new,
watches Pip guess, and sees for themselves how real AI learns, guesses, and messes up.
Every finished lesson fills one light in Pip's brain. All 7 lights = Pip is "grown up"
and the kid gets a certificate.

Each lesson has the same four beats so kids know what to expect, but every game is different:
1. **Read** — a 4–5 page picture story with Pip (one or two short sentences per page, big type).
2. **Play** — a hands-on mini-game that teaches the idea by doing it.
3. **Check** — two quick questions with friendly feedback (no fail state).
4. **Badge** — a celebration, a badge, and a light in Pip's brain.

## Lessons

| # | Title | One-line idea | The game |
|---|-------|---------------|----------|
| 1 | **Meet Pip: What is AI?** (`what-is-ai`) | AI is a computer program that learns from lots of examples and then makes guesses. It's not magic and it's not alive. | **AI Detective** — tap things in a house scene to find the ones that use AI (voice helper, phone face unlock, video suggestions, map app, spam filter) vs. things that don't (lamp, toaster, book, bike). Each tap explains why. |
| 2 | **Teach by Showing** (`learning-from-examples`) | AI learns from examples, not from someone writing every rule. More good examples = better guesses. | **Sort the Glorbs** — kids invent a secret rule and sort made-up creatures into two teams. Pip (a real nearest-neighbor classifier running in the browser) guesses which team new Glorbs belong to, and gets better as the kid adds examples. "Pip figured out your rule!" |
| 3 | **How Chatbots Talk** (`guess-the-next-word`) | Chatbots work by guessing the next word, one word at a time, from patterns in what they read. | **Next Word!** — guess the next word, then see Pip's guess bars. Then **Story Builder**: build a silly story by picking from Pip's top 3 next words (a tiny real word-counting model built from kid stories). |
| 4 | **Good Examples In, Good Guesses Out** (`sneaky-clues`) | If the examples are lopsided, AI learns the wrong clue. | **Fix Pip's Mix-up** — Pip only saw blue fish and red birds, so it calls a red fish a "bird". Kids test Pip, find the sneaky clue (color!), add better examples, and re-test until Pip gets it right. |
| 5 | **Sure Doesn't Mean Right** (`ai-can-be-wrong`) | AI can sound super sure and still be wrong. Smart people check. | **Fact or Fib?** — Pip answers questions in a confident voice. Kids pick "Sounds right" or "Let's check", then open the Fact Book to see the truth. Earn a Fib Finder score. |
| 6 | **Real or Made by AI?** (`real-or-made-up`) | AI can make pictures and voices of things that never happened. Look closely and ask a grown-up. | **Spot the Glitches** — find 6 AI goofs hidden in a picture (six-finger hand, melty clock, two-tailed cat, backwards shadow, gibberish sign, floating cup). |
| 7 | **Be the Boss of AI** (`smart-and-safe`) | You're in charge: keep private things private, AI is not a person, and a grown-up is your best helper. | **Go, Ask, or Stop** — sort real-life situations with a traffic light (green = OK, yellow = ask a grown-up, red = stop). Then the **Secret Shield**: guard private info (address, password, school) and let safe things through. |

After all 7: **Finish line** → Pip is all lit up, a printable certificate (nickname stays on screen only),
and an optional "tell a grown-up" mailto link (nothing stored).

## Other pages
- **Home** — big animated Pip hero with a live mini-demo, the lesson trail, what makes this different, "Tested by real kids" (Nathan, 8, and Nolan, 11 are testing it; notes placeholder), grown-up strip.
- **Lessons** — a winding trail map with progress from localStorage and Pip's brain meter.
- **Pip's Word Book** (`/glossary`) — flip cards with ~12 AI words in kid language.
- **Finish** (`/finish`) — certificate.
- **Parents & Teachers** — what kids learn per lesson, how to use it (home / classroom), talk-about questions, safety & privacy.
- **About** — Nick Castro, links to nickcastrobuilds.com and LinkedIn.
- **Tested by real kids** — honest placeholder, no invented quotes.
- **Privacy** — COPPA-friendly notice.

## Rules we follow
No ads, no accounts, no kid data collected, no open-ended AI chat, no trackers (optional GA only when
`NEXT_PUBLIC_GA_MEASUREMENT_ID` is set). Progress lives in localStorage only. Big type, short sentences,
touch + keyboard friendly, high contrast, respects `prefers-reduced-motion`. Core lessons are free forever.

## Old URLs
Old lesson slugs redirect (308) to the closest new lesson so nothing 404s.

# How AI Works for Kids

**Live:** https://howaiworksforkids.com

Free, hands-on lessons that show kids ages 6–10 how AI works. Kids teach a tiny AI named **Pip**, test it, and fix its mistakes. Every finished lesson lights up one of the 7 lights in Pip's brain.

Built by [Nick Castro](https://nickcastrobuilds.com).

## The lessons

Each lesson goes **Read → Play → Check → Badge**: a 5-page picture story (with a "Read it to me" button), a hands-on game, two quick questions, and a badge.

| # | Lesson | Big idea | Game |
|---|---|---|---|
| 1 | Meet Pip: What is AI? | AI is a computer program that learns patterns from examples, then guesses. | **AI Detective**: tap things in a room and decide which ones use AI. |
| 2 | Teach by Showing | AI learns from examples, not a list of rules. | **Sort the Glorbs**: a real nearest-neighbor model learns your secret rule and shows *why* it guessed. |
| 3 | How Chatbots Talk | Chatbots guess the next word, again and again. | **Next Word!** + **Story Builder**: a tiny word-counting model writes a story with you. |
| 4 | Good Examples In, Good Guesses Out | Lopsided examples teach the wrong clue. | **Fix Pip's Mix-up**: Pip thinks red = bird until you add better examples. |
| 5 | Sure Doesn't Mean Right | AI can sound sure and still be wrong. | **Fact or Fib?** with a Sure-o-meter and a Fact Book. |
| 6 | Real or Made by AI? | AI can make pictures of things that never happened. | **Spot the Glitches**: find 6 goofs in an AI-style picture. |
| 7 | Be the Boss of AI | Keep private things private; AI isn't a person; ask a grown-up. | **Go, Ask, or Stop** + **Secret Shield**. |

The machine-learning bits in `lib/ml.ts` are real (tiny) models that run in the browser: a weighted nearest-neighbor classifier, a one-clue decision stump, and a word-pair (bigram/trigram) next-word model.

## Kid safety and privacy

- No ads, no accounts, no sign-up, no names or emails collected.
- No live chatbot. Every game runs right in the page.
- Progress is saved only in the browser's `localStorage` (`hawfk.progress.v2`).
- The certificate's name stays on screen only. The "email a grown-up" option opens the family's own mail app (`mailto:`); nothing is sent to us.
- Google Analytics loads **only** if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (it is not set by default).
- Respects `prefers-reduced-motion`, works with touch and keyboard.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · deployed on Vercel from `main`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm test         # ML model tests (Node 22+)
```

## Pages

`/` home · `/lessons` trail · `/lessons/[slug]` lessons · `/finish` certificate · `/glossary` word book · `/parents` parents & teachers · `/tested-by-kids` · `/about` · `/privacy`

SEO: metadata, Open Graph/Twitter images, JSON-LD (`lib/seo.ts`), `sitemap.xml`, `robots.txt`, `llms.txt`.

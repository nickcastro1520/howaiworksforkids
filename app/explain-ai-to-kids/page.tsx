import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { ogAlt } from "@/lib/og";

export const metadata: Metadata = pageMeta({
  title: "How to Explain AI to an 8-Year-Old (With Games to Try)",
  description:
    "Simple ways to explain AI to an 8-year-old, in words you can say out loud. Each tip links to a free, kid-safe game so your child can try the idea, plus a 10-minute plan.",
  path: "/explain-ai-to-kids",
  ogKey: "explain-ai-to-kids",
  ogAlt: ogAlt("explain-ai-to-kids"),
  keywords: [
    "how to explain AI to an 8 year old",
    "how to explain AI to a child",
    "explain artificial intelligence to kids",
    "talking to kids about AI",
  ],
});

const TIPS = [
  {
    idea: "AI is a pattern finder",
    say: "AI is a computer program that learns from lots of examples. It looks for what's the same, like pointy ears and whiskers on cats, and then makes a guess.",
    href: "/lessons/what-is-ai",
    try: "Lesson 1: Meet Pip (AI Detective)",
  },
  {
    idea: "AI learns by being shown, not told",
    say: "Nobody writes every rule for AI. People show it examples and tell it when it guessed right or wrong. Each fix helps it guess better next time.",
    href: "/lessons/learning-from-examples",
    try: "Lesson 2: Teach by Showing (Sort the Glorbs)",
  },
  {
    idea: "Chatbots guess the next word",
    say: "A chatbot doesn't think up an answer like you do. It guesses which word should come next, again and again, from patterns in lots of reading.",
    href: "/play/guess-the-next-word",
    try: "Bonus game: Guess the Next Word",
  },
  {
    idea: "Bad examples teach the wrong lesson",
    say: "If AI only sees lopsided examples, it can learn the wrong clue. Better and more varied examples make a better AI.",
    href: "/lessons/sneaky-clues",
    try: "Lesson 4: Fix Pip's Mix-up",
  },
  {
    idea: "Sounding sure isn't the same as being right",
    say: "AI can say something in a very confident voice and still be wrong. We check important answers with a grown-up or a source we trust.",
    href: "/lessons/ai-can-be-wrong",
    try: "Lesson 5: Fact or Fib?",
  },
  {
    idea: "To a computer, a picture is tiny squares",
    say: "A computer sees a picture as a grid of tiny colored squares called pixels. AI looks for patterns in those squares.",
    href: "/lessons/how-ai-sees-pictures",
    try: "Lesson 9: Pixel Peek",
  },
  {
    idea: "You're the boss of AI",
    say: "AI isn't a person and doesn't have feelings. Keep private things private, and ask a grown-up when you're not sure.",
    href: "/lessons/smart-and-safe",
    try: "Lesson 7: Go, Ask, or Stop",
  },
];

const FAQ = [
  {
    q: "Is AI alive? Does it have feelings?",
    a: "No. AI is a computer program. It can sound friendly, but it doesn't feel happy or sad, and it isn't your friend the way a person is.",
  },
  {
    q: "Is AI smarter than people?",
    a: "AI is very fast at some jobs, like finding patterns in lots of examples. But it makes mistakes people wouldn't, and it doesn't understand the world the way you do. You do the thinking.",
  },
  {
    q: "How does AI know things?",
    a: "It learned patterns from lots of examples that people gave it, like pictures and writing. If the examples were wrong or lopsided, its guesses can be wrong too.",
  },
  {
    q: "Can AI be wrong?",
    a: "Yes, and it can be wrong while sounding very sure. That's why we check important answers with a grown-up or a trusted source.",
  },
  {
    q: "Will AI take over the world?",
    a: "AI is a tool that people build and control. Grown-ups have real questions about how to use it well, and that's why it's good to learn how it works.",
  },
  {
    q: "Does my child chat with an AI on this site?",
    a: "No. There is no open AI chat here, no accounts, and no ads. Every game is a tiny model built for this site that runs in the web page, and every answer was written in advance.",
  },
];

export default function ExplainAiPage() {
  return (
    <div className="parents">
      <JsonLd data={faqJsonLd(FAQ)} />
      <header className="page-hero parents-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Parents & Teachers", path: "/parents" }, { name: "Explain AI to kids", path: "/explain-ai-to-kids" }]} />
          <p className="small-cap">For parents &amp; teachers</p>
          <h1 className="page-title">How to explain AI to an 8-year-old</h1>
          <p className="page-lead">
            Say this: &ldquo;AI is a computer program that learns from lots of examples. It finds patterns, then makes guesses, and
            sometimes the guesses are wrong.&rdquo; Then let your child try it. Each idea below links to a free game where they can see it happen.
          </p>
        </div>
      </header>

      <div className="wrap parents-body">
        <section aria-labelledby="say">
          <h2 id="say" className="section-title">
            7 simple explanations you can say out loud
          </h2>
          <div className="use-grid">
            {TIPS.map((t, i) => (
              <div key={t.href} className="use-card">
                <h3>
                  {i + 1}. {t.idea}
                </h3>
                <p>&ldquo;{t.say}&rdquo;</p>
                <p className="use-more">
                  <Link href={t.href} className="text-link">
                    Try it: {t.try} &rarr;
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="plan" className="use-grid">
          <h2 id="plan" className="section-title">
            Try it together in 10 minutes
          </h2>
          <div className="use-card">
            <ol>
              <li>
                <b>Ask first.</b> &ldquo;What do you think AI is?&rdquo; Listen. There are no wrong answers yet.
              </li>
              <li>
                <b>Say the plain answer.</b> AI learns patterns from examples and then guesses.
              </li>
              <li>
                <b>Play one game.</b> Open <Link href="/lessons/learning-from-examples">Sort the Glorbs</Link> and let your child teach Pip a
                secret rule. Let them drive.
              </li>
              <li>
                <b>Make it wrong on purpose.</b> Give Pip a few lopsided examples and watch it guess badly. Ask, &ldquo;Why did Pip get that wrong?&rdquo;
              </li>
              <li>
                <b>Wrap up.</b> Ask, &ldquo;Where do you think we use AI at home?&rdquo; Then try{" "}
                <Link href="/lessons/what-is-ai">AI Detective</Link> next time.
              </li>
            </ol>
          </div>
        </section>

        <section aria-labelledby="safe" className="safe-box">
          <h2 id="safe" className="section-title light">
            A safety note
          </h2>
          <ul className="safe-list">
            <li>
              <b>Grown-up first.</b> Many AI apps have age rules. Check them, and use AI tools with your child rather than handing them over.
            </li>
            <li>
              <b>Private stays private.</b> Teach kids not to type their name, school, address, or photos of people into any AI.
            </li>
            <li>
              <b>Check, then trust.</b> Read AI answers before your child does, and check important ones with a trusted source.
            </li>
            <li>
              <b>Nothing to sign up for here.</b> This site has no ads, no accounts, no open AI chat, and collects no kid data.
            </li>
          </ul>
          <Link href="/privacy" className="btn btn-sun">
            Read the privacy notice
          </Link>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="section-title">
            Questions kids ask, with honest answers
          </h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p>
            Ready for more? See all the <Link href="/lessons">free lessons</Link>, the <Link href="/parents">parent guide</Link>, or the{" "}
            <Link href="/teachers">free teacher kit</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

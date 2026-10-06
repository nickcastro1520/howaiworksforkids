import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { GA_ENABLED } from "@/lib/analytics";
import { LESSONS } from "@/lib/lessons";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { ogAlt } from "@/lib/og";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "Teach Kids About AI: Free Guide for Parents & Teachers",
  description:
    "How to teach kids about AI at home or in an elementary classroom: what the 7 free lessons cover, how to use them, safety, privacy, and FAQ.",
  path: "/parents",
  ogKey: "parents",
  ogAlt: ogAlt("parents"),
  keywords: ["teach kids about AI", "AI lesson plans for elementary", "AI for elementary students", "AI literacy for kids", "AI curriculum for kids"],
});

const FAQ = [
  {
    q: "Does my child chat with an AI on this site?",
    a: "No. There is no live chatbot and nothing is sent to an AI service. Each game is a tiny, simple model written for this site that runs inside the web page, like Pip's nearest-neighbor sorter and word counter.",
  },
  {
    q: "What age is it for?",
    a: "Ages 6 to 10. Six- and seven-year-olds may want a grown-up nearby to read along, or they can tap \u201cRead it to me\u201d on each story page.",
  },
  {
    q: "Is it free?",
    a: "Yes. The core lessons are free and will stay free. There are no ads and no in-app purchases.",
  },
  {
    q: "Do kids need an account?",
    a: "No. Progress (which lessons are done) is saved in this browser only, using localStorage. Clearing site data, or tapping \u201cStart over\u201d on the lesson trail, erases it.",
  },
  {
    q: "How long does it take?",
    a: "Each lesson takes about 5 to 6 minutes, and all 7 take about 40 minutes. Kids can do one a day or several in a row, in any order.",
  },
  {
    q: "Can I use it in my classroom?",
    a: "Yes, and it's free for classrooms. Project a lesson for the whole class, or let students work on their own devices. There are no logins, so it works on shared tablets and Chromebooks. The “What kids learn” table above lists the big idea and a discussion question for each lesson.",
  },
  {
    q: "Is it really how AI works, or just a cartoon?",
    a: "The games use real (very small) versions of real ideas. Sort the Glorbs uses a nearest-neighbor classifier that learns from the examples your child gives it. Story Builder counts which words come next in a pile of short stories. Fix Pip's Mix-up picks the clue that best fits its training examples, so lopsided examples really do teach it the wrong rule.",
  },
  {
    q: "Does it work on tablets?",
    a: "Yes. Everything works with touch, a mouse, or a keyboard, on phones, tablets, Chromebooks, and computers.",
  },
];

export default function ParentsPage() {
  return (
    <div className="parents">
      <JsonLd data={faqJsonLd(FAQ)} />
      <header className="page-hero parents-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Parents & Teachers", path: "/parents" }]} />
          <p className="small-cap">For parents &amp; teachers</p>
          <h1 className="page-title">Kids learn AI by teaching one.</h1>
          <p className="page-lead">
            Seven 5-minute lessons. Each has a short story, a hands-on game, a two-question check, and a badge. Kids don&rsquo;t just hear
            that &ldquo;AI learns from data.&rdquo; They give Pip data, watch it guess, and fix it when it&rsquo;s wrong.
          </p>
        </div>
      </header>

      <div className="wrap parents-body">
        <section aria-labelledby="learn">
          <h2 id="learn" className="section-title">
            What kids learn
          </h2>
          <div className="learn-table" role="table" aria-label="Lessons and what kids learn">
            <div className="lt-row lt-head" role="row">
              <span role="columnheader">Lesson</span>
              <span role="columnheader">Big idea</span>
              <span role="columnheader">Ask them afterward</span>
            </div>
            {LESSONS.map((l) => (
              <div key={l.slug} className="lt-row" role="row" style={{ "--lc": l.color } as React.CSSProperties}>
                <span role="cell" className="lt-lesson">
                  <b>
                    {l.number}. <Link href={`/lessons/${l.slug}`}>{l.title}</Link>
                  </b>
                  <small>Game: {l.game}</small>
                </span>
                <span role="cell">{l.bigIdea}</span>
                <span role="cell" className="lt-talk">
                  {l.talk}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="use" className="use-grid">
          <h2 id="use" className="section-title">
            How to use it
          </h2>
          <div className="use-card">
            <h3>At home</h3>
            <ul>
              <li>Do one lesson a day. Each takes about 5 minutes.</li>
              <li>Sit nearby for the first one. Let your child drive the game.</li>
              <li>Use the &ldquo;For a grown-up to ask&rdquo; question at the end of each lesson.</li>
              <li>Finish all 7 and print the certificate.</li>
            </ul>
          </div>
          <div className="use-card">
            <h3>In a classroom</h3>
            <ul>
              <li>Project a lesson. Read the story together, or tap &ldquo;Read it to me.&rdquo;</li>
              <li>Let the class vote on each move in the game.</li>
              <li>Sort the Glorbs works great as a whole-class guessing game: the class picks a secret rule, one student sorts.</li>
              <li>No logins, so it works on shared devices.</li>
            </ul>
          </div>
          <div className="use-card">
            <h3>Words we use</h3>
            <p>
              We keep sentences short and words simple. When there&rsquo;s a grown-up term, we mention it once in <Link href="/glossary">Pip&rsquo;s Word Book</Link>: for example &ldquo;lopsided data&rdquo; (bias) and &ldquo;made-up answer&rdquo; (hallucination).
            </p>
          </div>
        </section>

        <section aria-labelledby="safe" className="safe-box">
          <h2 id="safe" className="section-title light">
            Safety and privacy
          </h2>
          <ul className="safe-list">
            <li>
              <b>No ads, no ad trackers.</b> We don&rsquo;t run ads or ad trackers.{" "}
              {GA_ENABLED
                ? "We use Google Analytics only to count anonymous visits and finished lessons, with ad features turned off."
                : "Site analytics are off."}
            </li>
            <li>
              <b>No kid data.</b> We never ask for a child&rsquo;s name, email, school, photo, or location.
            </li>
            <li>
              <b>No open AI chat.</b> Kids can&rsquo;t type to an AI here. Every answer in the games was written in advance.
            </li>
            <li>
              <b>Local progress only.</b> Lesson progress is stored in this browser and never sent to us.
            </li>
            <li>
              <b>Certificate name stays on screen.</b> The nickname on the certificate is never saved or sent.
            </li>
          </ul>
          <Link href="/privacy" className="btn btn-sun">
            Read the privacy notice
          </Link>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="section-title">
            Questions
          </h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

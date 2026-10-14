import Link from "next/link";
import { TesterCards } from "@/components/TesterCards";
import { Glorb, Sparkle } from "@/components/art/Bits";
import { Book } from "@/components/art/Props";
import { HeroPip } from "@/components/HeroPip";
import { BadgeShelf, ProgressLine, StartButton } from "@/components/Journey";
import { JsonLd } from "@/components/JsonLd";
import { LessonTiles } from "@/components/LessonTiles";
import { Pip } from "@/components/Pip";
import { courseJsonLd, faqJsonLd, TOTAL_MINUTES } from "@/lib/seo";
import { LESSONS, SECTIONS, SECTION_1, SECTION_2 } from "@/lib/lessons";
import { SITE_NAME } from "@/lib/site";

const STEPS = [
  { n: 1, title: "Read", text: "A short picture story with Pip. Tap to hear it read out loud." },
  { n: 2, title: "Play", text: "A hands-on game where you teach, test, and fix a real tiny AI." },
  { n: 3, title: "Check", text: "Two quick questions. No grades. Just try again." },
  { n: 4, title: "Badge", text: "Earn a badge and turn on a light in Pip's brain." },
];

const PROMISES = [
  { title: "No ads", text: "Not one. Not ever." },
  { title: "No accounts", text: "No sign-up, no names, no emails from kids." },
  { title: "No chatbot", text: "Kids never chat with a live AI here. Every game runs right in the page." },
  { title: "Stays on your device", text: "Progress is saved in this browser only. We never see it." },
];

/** Visible on the page below, so FAQPage schema is accurate. */
const HOME_FAQ = [
  {
    q: "How does this site teach how AI works to kids?",
    a: "Kids don\u2019t just hear that AI learns from examples. They teach a tiny AI named Pip, test it, and fix its mistakes. The games run real, very small versions of real ideas, like a nearest-neighbor sorter and a next-word counter, right in the web page.",
  },
  {
    q: "Are the AI lessons for kids really free?",
    a: `Yes. All ${LESSONS.length} lessons, the final quiz, both certificates, and the Lesson 1 teacher kit are free. There are no ads, no accounts, and no in-app purchases.`,
  },
  {
    q: "What ages is it for, and how long does it take?",
    a: `Ages 6 to 10. Each lesson takes about 5 to 9 minutes, about ${Math.round(TOTAL_MINUTES / 5) * 5} minutes for all ${LESSONS.length}. Kids who can\u2019t read yet can tap the speaker buttons to hear everything read aloud.`,
  },
  {
    q: "Can teachers use these AI lessons in class?",
    a: "Yes. There are no logins, so the lessons work on a projector, shared tablets, or Chromebooks. The Teachers page has a free, print-and-go AI lesson plan for elementary classrooms.",
  },
  {
    q: "Does my child chat with an AI here?",
    a: "No. There is no chatbot and nothing your child types is sent to an AI. Progress is saved only in this browser.",
  },
];

function StepIcon({ n }: { n: number }) {
  if (n === 1) return <Book size={74} />;
  if (n === 2) return <Glorb g={{ color: "orange", eyes: 2, top: "antenna", spots: true, shape: "round" }} size={70} />;
  if (n === 3)
    return (
      <svg viewBox="0 0 80 80" width="70" height="70" aria-hidden="true">
        <circle cx="40" cy="40" r="32" fill="#33c4b0" stroke="#231d4f" strokeWidth="4" />
        <path d="M24 41 l11 11 l22 -24" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return <Sparkle size={70} />;
}

export default function Home() {
  return (
    <>
      <JsonLd data={courseJsonLd()} />
      <JsonLd data={faqJsonLd(HOME_FAQ)} />

      <section className="hero">
        <div className="stars" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span>Ages 6&ndash;10</span>
              <span>Free</span>
              <span>No sign-up</span>
            </p>
            <h1 className="hero-title">
              Teach a tiny AI.
              <span>Find out how real AI works.</span>
            </h1>
            <p className="hero-lead">
              Meet Pip, a baby AI who knows almost nothing. In {LESSONS.length} quick games, you&rsquo;ll teach Pip, test Pip, and catch
              Pip&rsquo;s mistakes. That&rsquo;s exactly how real AI works!
            </p>
            <div className="hero-ctas">
              <StartButton />
              <Link href="/lessons" className="btn btn-big btn-ghost-light">
                See all lessons
              </Link>
            </div>
            <ProgressLine light />
          </div>
          <HeroPip />
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 C240 90 480 0 720 30 C960 60 1200 10 1440 40 V90 H0Z" fill="#fff8ec" />
        </svg>
      </section>

      <section className="shelf" aria-labelledby="my-badges">
        <div className="wrap">
          <h2 id="my-badges" className="section-title">
            Your <span className="hl">badges</span>
          </h2>
          <BadgeShelf />
        </div>
      </section>

      <section className="how">
        <div className="wrap">
          <h2 className="section-title">
            Every lesson has <span className="hl">4 steps</span>
          </h2>
          <ol className="how-steps">
            {STEPS.map((s) => (
              <li key={s.n} className={`how-step how-${s.n}`}>
                <span className="how-icon">
                  <StepIcon n={s.n} />
                </span>
                <span className="how-n">Step {s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="games">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">
              {SECTION_1.length} games. <span className="hl hl-mint">{SECTION_1.length} big ideas.</span>
            </h2>
            <p className="section-sub">
              {SECTIONS[1].kicker}: {SECTIONS[1].name}. Each one takes about 5 minutes. Do them in order, or jump around.
            </p>
          </div>
          <LessonTiles section={1} />
          <div className="section-head s2-head">
            <p className="small-cap">
              New &middot; {SECTIONS[2].kicker}
            </p>
            <h2 className="section-title">
              {SECTIONS[2].name}: <span className="hl hl-pink">{SECTION_2.length} more games</span>
            </h2>
            <p className="section-sub">
              Where AI came from, how AI sees pictures, asking clearly, checking answers, AI as a helper, fairness, keeping secrets safe, and
              building your own AI. Each ends with an optional mission to try with a grown-up. Then take the final quiz!
            </p>
          </div>
          <LessonTiles section={2} />
          <p className="center">
            <Link href={SECTIONS[2].path} className="btn btn-big btn-sun">
              See the {SECTIONS[2].name} trail &rarr;
            </Link>
          </p>
          <p className="muted center">
            {LESSONS.length} free lessons in two sections, plus a <Link href="/quiz">final quiz</Link>.
          </p>
        </div>
      </section>

      <section className="promise">
        <div className="wrap promise-inner">
          <div className="promise-copy">
            <p className="small-cap light">For grown-ups</p>
            <h2 className="section-title light">Built safe for kids, on purpose.</h2>
            <p className="promise-lead">
              Kids learn how AI works by doing it, without talking to an AI. Every game is a tiny model that runs in the page.
            </p>
            <Link href="/parents" className="btn btn-sun">
              Parent &amp; teacher guide
            </Link>
          </div>
          <ul className="promise-list">
            {PROMISES.map((p, i) => (
              <li key={p.title} style={{ "--i": i } as React.CSSProperties}>
                <b>{p.title}</b>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="testers">
        <div className="wrap">
          <h2 className="section-title">
            Tested by <span className="hl hl-pink">real kids</span>
          </h2>
          <p className="section-sub">
            Tested with Nathan and Nolan. Pip is made for ages 6&ndash;10. Nathan, 8, plays every lesson. Nolan, 11, is our older tester. He
            checks whether things are too easy or confusing.
          </p>
          <TesterCards />
          <p className="center">
            <Link href="/tested-by-kids" className="text-link">
              How we test with kids
            </Link>
          </p>
        </div>
      </section>

      <section className="home-faq" aria-labelledby="home-faq">
        <div className="wrap narrow">
          <p className="small-cap">For grown-ups</p>
          <h2 id="home-faq" className="section-title">
            How AI works for kids: questions from grown-ups
          </h2>
          <p className="section-sub">
            {SITE_NAME} is a free set of AI lessons for kids. It&rsquo;s a simple way to teach kids about AI at home or in an elementary classroom.
            More in the <Link href="/parents">parent guide</Link> and on the <Link href="/teachers">Teachers page</Link>.
          </p>
          <div className="faq">
            {HOME_FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap final-inner">
          <Pip mood="wow" size={150} wave />
          <div>
            <h2 className="section-title">Pip is ready to learn.</h2>
            <p className="section-sub">Are you ready to teach?</p>
            <StartButton className="btn-go" />
          </div>
        </div>
      </section>
    </>
  );
}

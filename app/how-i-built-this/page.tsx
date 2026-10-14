import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { GLOSSARY } from "@/lib/glossary";
import { LESSONS, SECTION_1, SECTION_2, numberWord } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { IDS, pageMeta } from "@/lib/seo";
import { BOOK, NICK, SITE_NAME, absoluteUrl } from "@/lib/site";
import { TESTERS } from "@/lib/testers";
import { KIT } from "@/lib/teacherKit";

export const metadata: Metadata = pageMeta({
  title: "How I Built It: AI Tools, Tests, and Kid-Safe Design",
  description: `How Nick Castro built ${SITE_NAME}: ${LESSONS.length} lessons on Next.js and Vercel, AI coding assistants, Google Veo, automated tests, and testing with his two sons.`,
  path: "/how-i-built-this",
  ogKey: "how-i-built-this",
  ogAlt: ogAlt("how-i-built-this"),
  type: "article",
});

/**
 * Verifiable facts only. Re-measure before changing any number here.
 * Lighthouse: mobile preset, local production build (next build + next start), measured 2026-10-14.
 */
const REPO = "https://github.com/nickcastro1520/howaiworksforkids";
const CHECKED_ON = "October 14, 2026";
const UNIT_TESTS = 27;
const LIGHTHOUSE: { page: string; perf: number; a11y: number; bp: number; seo: number }[] = [
  { page: "Home", perf: 92, a11y: 100, bp: 100, seo: 100 },
  { page: "A lesson (Lesson 4)", perf: 93, a11y: 100, bp: 100, seo: 100 },
  { page: "This page", perf: 95, a11y: 100, bp: 100, seo: 100 },
];

const TOOLS = [
  {
    title: "Next.js, TypeScript, and Tailwind on Vercel",
    text: "The site is a Next.js App Router app written in TypeScript, styled with Tailwind CSS v4 plus a small hand-written design system, and hosted on Vercel. Almost every page is static, so it loads fast on old school tablets.",
  },
  {
    title: "A GitHub pull-request workflow",
    text: "Every change lives on its own branch and pull request. Vercel builds a preview for each one, and I check it on my phone and laptop (often with my kids) before I merge anything.",
  },
  {
    title: "AI coding assistants",
    text: "I used AI coding assistants to write and refactor code, tests, and first drafts of copy. I set the goals and the kid-safe rules, review every change, and decide what ships. Kid quotes are never written by AI.",
  },
  {
    title: "Tiny AI models that run in the page",
    text: "The games run real, very small versions of real ideas, written in TypeScript: a nearest-neighbor sorter, a next-word counter, and a one-clue decision rule. No game calls an AI service, so kids never chat with a live AI.",
  },
  {
    title: "Google Veo for the Lesson 8 video",
    text: "The 13-second cartoon in Lesson 8 was made with Google Veo. It is labeled as AI-made right under the player, has captions, never autoplays, and is served from this site with no third-party player.",
  },
  {
    title: "GA4 and Search Console",
    text: "Google Analytics 4 counts anonymous visits and a lesson-complete event with no names or kid text. Search Console shows how parents and teachers find the site. Quiz answers and progress are never sent anywhere.",
  },
  {
    title: "Automated checks on every release",
    text: `GitHub Actions runs on every pull request: lint, ${UNIT_TESTS} unit tests for the tiny models and lesson logic, a production build, and a crawl of the built site that fails on broken links, missing alt text, or leftover placeholder text. I also run browser scripts at phone and desktop sizes (tap targets of at least 48px, sideways scrolling, console errors, a next step on every badge screen) and Lighthouse before each merge.`,
  },
];

type Who = "me" | "auto";
const FLOW: { step: string; text: string; who: Who }[] = [
  { step: "Plan", text: "I write the goal, the kid-safe rules, and what \u201cdone\u201d means.", who: "me" },
  { step: "Build on a branch", text: "I build it with AI coding assistants, then read and edit every change.", who: "me" },
  { step: "Open a pull request", text: "Every change goes through a GitHub pull request. Nothing goes straight to the live site.", who: "me" },
  { step: "CI checks", text: `GitHub Actions: lint, ${UNIT_TESTS} unit tests, production build, and a broken-link crawl.`, who: "auto" },
  { step: "Preview deploy", text: "Vercel builds a separate preview site for the pull request.", who: "auto" },
  { step: "Browser + Lighthouse", text: "I run browser scripts at phone and desktop sizes, and Lighthouse on the key pages.", who: "me" },
  { step: "Review", text: "I try the preview on my phone and laptop, often with Nathan and Nolan.", who: "me" },
  { step: "Merge and ship", text: "When I approve, I merge to main and Vercel deploys the live site.", who: "me" },
];

const DECISIONS = [
  {
    title: "Tested with my sons",
    text: `Every lesson is tested with Nathan, 8, and Nolan, 11. Their real feedback led to read-aloud buttons on every story, question, and answer, so pre-readers can play alone, and to bigger tap targets for small fingers.`,
  },
  {
    title: "Kid-safe by design",
    text: "No accounts, no kid data, no chat, and no ads. Progress is saved only in the browser. The link to my book lives on grown-up pages only, never inside a lesson.",
  },
  {
    title: "Kid words first, jargon optional",
    text: `Lessons use plain words like "guess" and "lopsided data". The real term shows up as an optional "grown-up name" chip in the ${numberWord(GLOSSARY.length)}-word Word Book, so kids learn the idea before the label.`,
  },
  {
    title: "Honest about AI",
    text: "The site teaches that AI guesses and can be wrong, labels its own AI-made video, and treats AI products neutrally: every helper gets the same short, factual line.",
  },
];

export default function HowIBuiltThisPage() {
  const kit = KIT;
  const results = [
    { n: String(LESSONS.length), label: `lessons in 2 sections (${SECTION_1.length} + ${SECTION_2.length})` },
    { n: "10", label: "question final quiz, with retakes and no fail screen" },
    { n: "2", label: "printable certificates" },
    { n: "1", label: `free teacher kit (${kit.pages}-page PDF for Lesson 1)` },
    { n: "1", label: "companion picture book" },
    { n: String(UNIT_TESTS), label: "automated unit tests" },
  ];
  return (
    <article className="built">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `How I built ${SITE_NAME}`,
          url: absoluteUrl("/how-i-built-this"),
          author: { "@id": IDS.person },
          publisher: { "@id": IDS.org },
          about: { "@id": IDS.course },
          inLanguage: "en-US",
          dateModified: "2026-10-14",
        }}
      />
      <header className="page-hero built-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "How I built this", path: "/how-i-built-this" }]} />
          <p className="small-cap">For grown-ups &middot; by {NICK.name}</p>
          <h1 className="page-title">How I built {SITE_NAME}</h1>
          <p className="page-lead">
            Kids already use AI every day. Almost none of them know how it works. I built this site so kids ages 6&ndash;10 can learn
            it the way I teach grown-ups: by teaching a tiny AI themselves, watching it guess, and catching it being wrong.
          </p>
          <p className="grownups-only">
            This page is for grown-ups. Kids can head to the <Link href="/lessons">lesson trail</Link>.
          </p>
        </div>
      </header>

      <div className="wrap built-body">
        <section aria-labelledby="problem" className="built-two">
          <div>
            <h2 id="problem" className="section-title">
              The problem
            </h2>
            <p>
              Kids talk to voice assistants, get videos picked for them, and see AI-made pictures, often before they can read well.
              Most explanations either call it magic or bury it in jargon. I wanted my sons to really get three things: AI learns
              from examples, it makes guesses, and those guesses can be wrong.
            </p>
          </div>
          <div>
            <h2 id="who" className="section-title">
              Who it&rsquo;s for
            </h2>
            <ul className="built-list">
              <li>
                <b>Kids ages 6&ndash;10.</b> Short stories, hands-on games, and read-aloud everywhere, so pre-readers can play too.
              </li>
              <li>
                <b>Parents.</b> No setup and no sign-up, a question to ask after each lesson, and a{" "}
                <Link href="/parents">parent guide</Link>.
              </li>
              <li>
                <b>Teachers.</b> No logins for shared devices, plus a free print-and-go <Link href="/teachers">Lesson 1 kit</Link>.
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="results">
          <h2 id="results" className="section-title">
            What&rsquo;s live today
          </h2>
          <ul className="built-results">
            {results.map((r) => (
              <li key={r.label}>
                <b>{r.n}</b>
                <span>{r.label}</span>
              </li>
            ))}
          </ul>
          <p className="muted">
            The companion book is <i>{BOOK.title}: {BOOK.subtitle}</i>, which I wrote with Nancy Castro. I don&rsquo;t publish traffic numbers
            here.
          </p>
        </section>

        <section aria-labelledby="tools">
          <h2 id="tools" className="section-title">
            How I used AI and other tools
          </h2>
          <div className="built-cards">
            {TOOLS.map((t) => (
              <div key={t.title} className="built-card">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="flow">
          <h2 id="flow" className="section-title">
            How a change ships
          </h2>
          <p>
            The same loop for every change, from a one-word fix to a new lesson. Automated steps catch mistakes early; I make the call
            on anything a kid will see.
          </p>
          <p className="flow-key" aria-hidden="true">
            <span className="flow-tag is-me">Me</span> I do it <span className="flow-tag is-auto">Auto</span> runs automatically
          </p>
          <ol className="flow">
            {FLOW.map((f, i) => (
              <li key={f.step} className={`flow-step is-${f.who}`}>
                <span className="flow-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span className={`flow-tag is-${f.who}`}>
                  <span className="sr-only">{f.who === "me" ? "Done by me: " : "Automated: "}</span>
                  <span aria-hidden="true">{f.who === "me" ? "Me" : "Auto"}</span>
                </span>
                <h3>{f.step}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ol>
          <p className="muted">
            The CI workflow (<code>.github/workflows/ci.yml</code>) and the site crawler (<code>scripts/check-site.mjs</code>) are in
            the <a href={REPO}>public GitHub repo</a>.
          </p>
        </section>

        <section aria-labelledby="decisions">
          <h2 id="decisions" className="section-title">
            Key decisions
          </h2>
          <div className="built-cards">
            {DECISIONS.map((d) => (
              <div key={d.title} className="built-card built-card-alt">
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
          <div className="built-quotes">
            {TESTERS.map((t) => (
              <figure key={t.name} className="built-quote" style={{ "--qc": t.color } as React.CSSProperties}>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  {t.name}, {t.age} &middot; {t.roleShort}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="muted">
            Quotes are word for word, shared with my sons&rsquo; okay. <Link href="/tested-by-kids">How we test with kids</Link>.
          </p>
        </section>

        <section aria-labelledby="checks">
          <h2 id="checks" className="section-title">
            Quality checks
          </h2>
          <p>
            Lighthouse scores on mobile, measured on a production build on {CHECKED_ON}. Each category is out of 100; performance is the middle score of repeated runs, since it varies a little each time.
          </p>
          <div className="built-table-wrap">
            <table className="built-table">
              <thead>
                <tr>
                  <th scope="col">Page</th>
                  <th scope="col">Performance</th>
                  <th scope="col">Accessibility</th>
                  <th scope="col">Best practices</th>
                  <th scope="col">SEO</th>
                </tr>
              </thead>
              <tbody>
                {LIGHTHOUSE.map((r) => (
                  <tr key={r.page}>
                    <th scope="row">{r.page}</th>
                    <td>{r.perf}</td>
                    <td>{r.a11y}</td>
                    <td>{r.bp}</td>
                    <td>{r.seo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="built-end" aria-labelledby="contact">
          <h2 id="contact" className="section-title">
            Want something like this?
          </h2>
          <p>
            I build AI-powered tools, workflows, and websites that make AI make sense to real people. See more of my work, or say hi.
          </p>
          <div className="built-end-btns">
            <a className="btn btn-big btn-go" href={NICK.site}>
              nickcastrobuilds.com
            </a>
            <a className="btn btn-big btn-plain" href={NICK.linkedin}>
              LinkedIn
            </a>
            <Link className="btn btn-big btn-plain" href="/about">
              About me
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

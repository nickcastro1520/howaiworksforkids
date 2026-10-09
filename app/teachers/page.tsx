import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { KitDownload } from "@/components/KitDownload";
import { LESSONS, SECTIONS, SECTION_1, numberWord } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { pageMeta, teacherKitJsonLd } from "@/lib/seo";
import { KIT, KIT_CONTENTS, KIT_PREVIEWS } from "@/lib/teacherKit";

export const metadata: Metadata = pageMeta({
  title: "Free AI Lesson Plan for Elementary Teachers (Ages 6–10)",
  description:
    "A free, print-and-go teacher kit for Lesson 1, Meet Pip: What is AI? A 35-minute guide, unplugged card sort, K–2 and 3–5 worksheets, answer key, and parent letter. No sign-up.",
  path: "/teachers",
  ogKey: "teachers",
  ogAlt: ogAlt("teachers"),
  keywords: [
    "AI lesson plan for elementary",
    "free AI lesson plan",
    "teach kids about AI",
    "AI unplugged activity",
    "AI worksheet for kids",
    "AI literacy for kids",
    "AI4K12",
  ],
});

const lessonUrl = (slug: string) => `/lessons/${slug}`;
const lessonName = (n: number) => LESSONS.find((l) => l.number === n)!;

const CLASS_TIPS = [
  {
    emoji: "📽️",
    title: "Projector or 1:1 devices",
    text: "Project a lesson and let the class vote on every move, or have students play on their own tablets or Chromebooks. Everything works with touch, a mouse, or a keyboard.",
  },
  {
    emoji: "⏱️",
    title: "About 30–40 minutes",
    text: "Each lesson on the site takes 5–7 minutes. Add a warm-up, discussion, and the unplugged activity and you have a 30–40 minute class.",
  },
  {
    emoji: "🔊",
    title: "Read-aloud for pre-readers",
    text: "Every story, game instruction, question, and answer choice has a speaker button. Tap “Hear how to play” at the start of any game. Answers have pictures too.",
  },
  {
    emoji: "🙅",
    title: "No accounts needed",
    text: "No logins, no student data, no ads, and no open AI chat. Students can’t type to an AI. Every answer in the games is written in advance.",
  },
  {
    emoji: "💾",
    title: "Progress stays on the device",
    text: "Finished lessons are saved in that browser only and never sent anywhere. On shared devices, tap “Start over” on the lesson trail to reset it for the next student.",
  },
];

const BIG_IDEAS = [
  {
    n: 1,
    name: "Perception",
    text: "Computers sense the world with sensors, like a phone that sees a face or a speaker that hears words. Pictures reach an AI as pixels.",
    lessons: [1, 9],
  },
  { n: 2, name: "Representation & Reasoning", text: "AI keeps track of features (color, shape, pixel patterns) and uses them to decide.", lessons: [2, 4, 9] },
  {
    n: 3,
    name: "Learning",
    text: "Computers can learn from data. Students give Pip examples, watch it guess, and fix it. AI took off with more data, faster computers, and better learning methods.",
    lessons: [1, 2, 3, 4, 8, 9],
  },
  {
    n: 4,
    name: "Natural Interaction",
    text: "Chatbots guess the next word. Clear prompts get better results, and answers can sound sure and still be wrong.",
    lessons: [3, 5, 10, 11],
  },
  {
    n: 5,
    name: "Societal Impact",
    text: "Lopsided data, made-up answers, AI-made pictures, staying safe and private, and using AI as a helper for learning.",
    lessons: [4, 5, 6, 7, 8, 12],
  },
];

function LessonChips({ nums }: { nums: number[] }) {
  return (
    <p className="std-lessons">
      <span>Lessons</span>
      {nums.map((n) => (
        <Link key={n} href={lessonUrl(lessonName(n).slug)} aria-label={`Lesson ${n}: ${lessonName(n).title}`}>
          {n}
        </Link>
      ))}
    </p>
  );
}

export default function TeachersPage() {
  const l1 = LESSONS[0];
  return (
    <div className="teachers">
      <JsonLd data={teacherKitJsonLd()} />
      <header className="page-hero teachers-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Teachers", path: "/teachers" }]} />
          <p className="small-cap">For teachers, homeschool parents &amp; club leaders</p>
          <h1 className="page-title">Teach how AI works, with nothing to set up.</h1>
          <p className="page-lead">
            {numberWord(LESSONS.length, true)} free, hands-on lessons for ages 6&ndash;10. Kids teach a tiny AI named Pip, watch it guess, and fix it when it&rsquo;s wrong.
            Start with the free print-and-go kit for Lesson 1.
          </p>
          <p className="grownup-note">This page is for grown-ups. Kids can head to the <Link href="/lessons">lesson trail</Link>.</p>
        </div>
      </header>

      <div className="wrap teachers-body">
        <section aria-labelledby="kit" className="kit">
          <div className="kit-head">
            <span className="kit-tag">Free download</span>
            <h2 id="kit" className="section-title">
              Lesson 1 teacher kit: {l1.title}
            </h2>
            <p className="section-sub">
              Everything you need to teach Lesson 1 in about {KIT.minutes} minutes, ready to print. No email and no sign-up. Just download it.
            </p>
          </div>

          <ul className="kit-strip" aria-label="Pages from the Lesson 1 teacher kit">
            {KIT_PREVIEWS.map((p, i) => (
              <li key={p.key} style={{ "--i": i } as React.CSSProperties}>
                <div className="kit-thumb">
                  {/* Pre-optimized static WebP thumbnails, so no image optimizer is needed. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/teachers/kit-${p.key}-320.webp`}
                    srcSet={`/teachers/kit-${p.key}-320.webp 320w, /teachers/kit-${p.key}-480.webp 480w, /teachers/kit-${p.key}-640.webp 640w`}
                    sizes="(max-width: 600px) 46vw, 220px"
                    width={320}
                    height={414}
                    alt={p.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <span className="kit-cap">{p.label}</span>
              </li>
            ))}
          </ul>

          <div className="kit-cta">
            <KitDownload location="kit_section" />
            <p className="kit-meta">
              PDF &middot; {KIT.pages} pages &middot; US Letter &middot; {KIT.sizeLabel} &middot; Free for classroom and home use
            </p>
          </div>

          <h3 className="kit-inside-title">What&rsquo;s inside</h3>
          <ul className="kit-inside">
            {KIT_CONTENTS.map((c) => (
              <li key={c.title}>
                <span className="kit-emoji" aria-hidden="true">
                  {c.emoji}
                </span>
                <span>
                  <b>{c.title}</b>
                  {c.text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="class" className="use-grid">
          <h2 id="class" className="section-title">
            How to use the site in class
          </h2>
          {CLASS_TIPS.map((t) => (
            <div key={t.title} className="use-card tip-card">
              <h3>
                <span aria-hidden="true">{t.emoji}</span> {t.title}
              </h3>
              <p>{t.text}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="pack" className="pack">
          <div className="pack-head">
            <span className="kit-tag kit-tag-soon">Coming soon</span>
            <h2 id="pack" className="section-title">
              The Full Teacher Pack
            </h2>
            <p className="section-sub">
              The same print-and-go format for all {numberWord(SECTION_1.length)} {SECTIONS[1].kicker} lessons: a teacher guide, an unplugged activity, K&ndash;2 and 3&ndash;5 worksheets, an
              answer key, and a parent letter for each one. Nothing to sign up for. Check back here.
            </p>
          </div>
          <ol className="pack-list">
            {SECTION_1.map((l) => (
              <li key={l.slug} className="pack-card" style={{ "--lc": l.color } as React.CSSProperties}>
                <span className="pack-num" aria-hidden="true">
                  {l.number}
                </span>
                <div className="pack-body">
                  <p className="pack-title">
                    <span className="sr-only">Lesson {l.number}: </span>
                    <Link href={lessonUrl(l.slug)}>{l.title}</Link>
                  </p>
                  <p className="pack-meta">
                    <span>
                      <b>Game:</b> {l.game}
                    </span>
                    <span>
                      <b>Badge:</b> {l.badge}
                    </span>
                  </p>
                </div>
                <span className={`pack-status ${l.number === 1 ? "is-free" : ""}`}>{l.number === 1 ? "Free kit now" : "Coming soon"}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="standards" className="standards">
          <h2 id="standards" className="section-title">
            Standards connections
          </h2>
          <p className="section-sub">
            The lessons connect, at the concept level, to the <b>AI4K12 Five Big Ideas in AI</b> and the <b>Impacts of Computing</b> concept in
            the CSTA K&ndash;12 Computer Science Standards. We describe concepts only and don&rsquo;t claim specific standard codes.
          </p>
          <div className="std-grid">
            {BIG_IDEAS.map((b) => (
              <div key={b.n} className="std-card">
                <p className="std-kicker">AI4K12 Big Idea {b.n}</p>
                <h3>{b.name}</h3>
                <p>{b.text}</p>
                <LessonChips nums={b.lessons} />
              </div>
            ))}
            <div className="std-card std-csta">
              <p className="std-kicker">CSTA K&ndash;12 CS Standards</p>
              <h3>Impacts of Computing</h3>
              <p>Computing in everyday life, and using it safely and responsibly: spotting AI at home, checking answers, AI-made pictures, and privacy.</p>
              <LessonChips nums={[1, 5, 6, 7, 11, 12]} />
            </div>
          </div>
        </section>

        <section className="teachers-end">
          <div>
            <h2 className="section-title">Ready for Lesson 1?</h2>
            <p className="section-sub">Download the kit, then project the lesson. No setup, no logins.</p>
          </div>
          <div className="teachers-end-btns">
            <KitDownload location="page_end" className="btn btn-big btn-go" />
            <Link href={lessonUrl(l1.slug)} className="btn btn-big btn-plain">
              Open Lesson 1 &rarr;
            </Link>
          </div>
          <nav className="teachers-more" aria-label="More for grown-ups">
            <span>More for grown-ups:</span>
            <Link href="/parents">Parents &amp; Teachers guide and FAQ</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/tested-by-kids">Tested by kids</Link>
          </nav>
        </section>
      </div>
    </div>
  );
}

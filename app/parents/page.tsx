import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS } from "@/lib/lessons";

export const metadata: Metadata = {
  title: "For parents and teachers",
  description:
    "How to use How AI Works for Kids at home or in class. Lessons stay free: no student accounts, no checkout, and no live chatbot.",
  alternates: { canonical: "/parents" },
  openGraph: {
    title: "For parents and teachers",
    description:
      "A free lesson path for ages 6–14. No accounts, no ads, and no paywall.",
    url: "/parents",
  },
};

export default function ParentsPage() {
  return (
    <div className="parents-shell">
      <aside className="parents-intro">
        <p className="kicker">Adults</p>
        <h1 className="mt-2 font-bold">
          Sit beside them <em>for one game.</em>
        </h1>
        <p className="mt-4 text-lg">
          About five minutes. Read the question out loud if they want. The games run in the browser.
          Nothing is sent to an AI model.
        </p>
        <p className="mt-4 text-muted">
          Kids (6–10) get short sentences and almost no jargon. Tweens (11–14) play the same games
          and see a small grown-up name — a label, not the title.
        </p>
      </aside>

      <div>
        <section aria-labelledby="map">
          <h2 id="map" className="font-display text-3xl font-bold">
            What each game teaches
          </h2>
          <ol className="syllabus">
            {LESSONS.map((lesson) => (
              <li key={lesson.slug}>
                <Link className="syllabus-row" href={`/lessons/${lesson.slug}`}>
                  <span className="font-display text-xl font-bold text-accent">
                    {String(lesson.number).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{lesson.title}</strong>
                    <span className="mt-1 block">{lesson.takeaway.kids}</span>
                    <span className="mt-2 block text-sm text-muted">
                      Tween note: {lesson.takeaway.tweens} Grown-up label: {lesson.grownup.chip}.
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10" id="classroom" aria-labelledby="class">
          <h2 id="class" className="font-display text-3xl font-bold">
            Classroom pack
          </h2>
          <blockquote className="pull">
            Lessons stay free. A printable pack is planned — cards and a short teacher guide. No
            checkout, no paywall, and no teacher login.
          </blockquote>
          <p className="mt-3 text-muted">You can pass one phone around a table today.</p>
        </section>

        <section className="mt-10" aria-labelledby="safety">
          <h2 id="safety" className="font-display text-3xl font-bold">
            Safety by design
          </h2>
          <ul className="safety-grid">
            <li>No ads and no kid accounts.</li>
            <li>No open chat with an AI model. Answers are written ahead of time or computed on the device.</li>
            <li>
              “Tell a parent” asks for a parent email only, then opens the device email app. The
              address is not stored.
            </li>
            <li>World and reading level stay in this browser. Clearing site data removes them.</li>
          </ul>
          <p className="mt-4">
            <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/privacy">
              Read the privacy page
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

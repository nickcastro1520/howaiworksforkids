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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-sm font-extrabold tracking-wide text-accent uppercase">Adults</p>
      <h1 className="mt-2 font-display text-5xl font-bold">For parents and teachers</h1>
      <p className="mt-4 text-lg">
        Sit with a kid for one lesson, about five minutes. Read the question out loud if they want.
        The games run in the browser. Nothing is sent to an AI model.
      </p>

      <section className="mt-8" aria-labelledby="levels">
        <h2 id="levels" className="font-display text-3xl font-bold">
          Two reading levels
        </h2>
        <p className="mt-2">
          Kids (6–10) get short sentences and almost no jargon. Tweens (11–14) play the same games
          and see a small “grown-up name” chip — pattern recognition, training, context, correlation,
          attention, RAG, AI safety. The chip is a label, not the title.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="map">
        <h2 id="map" className="font-display text-3xl font-bold">
          What each game teaches
        </h2>
        <ol className="mt-4 grid gap-3">
          {LESSONS.map((lesson) => (
            <li key={lesson.slug} className="sticker p-4">
              <h3 className="font-display text-2xl font-bold">
                <Link className="underline decoration-2 underline-offset-4" href={`/lessons/${lesson.slug}`}>
                  {lesson.number}. {lesson.title}
                </Link>
              </h3>
              <p className="mt-1">{lesson.takeaway.kids}</p>
              <p className="mt-2 text-sm text-muted">
                Tween note: {lesson.takeaway.tweens} Grown-up label: {lesson.grownup.chip}.
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8" id="classroom" aria-labelledby="class">
        <h2 id="class" className="font-display text-3xl font-bold">
          Classroom pack
        </h2>
        <p className="mt-2">
          Lessons stay free. A printable classroom pack — cards and a short teacher guide — is
          planned. There is no checkout, no paywall, and no teacher login. You can pass one phone
          around a table today.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="safety">
        <h2 id="safety" className="font-display text-3xl font-bold">
          Safety by design
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>No ads and no kid accounts.</li>
          <li>No open chat with an AI model. Answers in the games are written ahead of time or computed on the device.</li>
          <li>Optional “Tell a parent” asks for a parent email only, then opens the device email app. The address is not stored.</li>
          <li>World and reading level stay in this browser’s localStorage. Clearing site data removes them.</li>
        </ul>
        <p className="mt-3">
          <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/privacy">
            Read the privacy page
          </Link>
        </p>
      </section>
    </div>
  );
}

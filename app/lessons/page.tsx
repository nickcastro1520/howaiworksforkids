import type { Metadata } from "next";
import { LessonTrail } from "@/components/LessonTrail";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Seven free games that show kids how AI works: patterns, practice, context, look-alikes, attention, checking a source, and being safe and honest.",
  alternates: { canonical: "/lessons" },
  openGraph: {
    title: "Lessons",
    description:
      "Seven free games that show kids how AI works, with no accounts and no live chatbot.",
    url: "/lessons",
  },
};

export default function LessonsPage() {
  return (
    <div className="lessons-index">
      <div className="lessons-intro">
        <p className="kicker">The index</p>
        <h1 className="mt-2 font-bold">
          Play in order, <em>or hop.</em>
        </h1>
        <p className="mt-4 text-lg text-muted">
          Every lesson is unlocked. Tweens can switch the reading level to see a small grown-up name.
          Kids stay on plain language.
        </p>
      </div>
      <LessonTrail />
    </div>
  );
}

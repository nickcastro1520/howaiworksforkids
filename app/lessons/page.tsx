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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-sm font-extrabold tracking-wide text-accent uppercase">All lessons</p>
      <h1 className="mt-2 font-display text-5xl font-bold">Play the path</h1>
      <p className="mt-3 text-lg text-muted">
        Start anywhere. The first game is the easiest door in. Tweens can turn on reading level
        “Tweens 11–14” to see a small grown-up name on each lesson. Kids stay on plain language.
      </p>
      <div className="mt-6">
        <LessonTrail />
      </div>
    </div>
  );
}

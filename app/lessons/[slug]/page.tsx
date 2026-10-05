import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LessonGame } from "@/components/LessonGame";
import { getLesson, LESSONS } from "@/lib/lessons";
import { lessonJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.summary,
    alternates: { canonical: `/lessons/${lesson.slug}` },
    openGraph: {
      title: lesson.title,
      description: lesson.summary,
      url: `/lessons/${lesson.slug}`,
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={lessonJsonLd(lesson)} />
      <p className="text-sm font-extrabold text-muted">
        <Link className="underline decoration-2 underline-offset-4" href="/lessons">
          Lessons
        </Link>{" "}
        · {lesson.number} of {LESSONS.length} · about {lesson.minutes} min
      </p>
      <h1 className="mt-2 font-display text-5xl leading-none font-bold">{lesson.title}</h1>
      <p className="mt-3 text-xl font-extrabold">{lesson.subtitle}</p>
      <p className="mt-3 text-lg">{lesson.summary}</p>
      <p className="mt-2 text-muted">{lesson.does}</p>
      <LessonGame lesson={lesson} />
    </div>
  );
}

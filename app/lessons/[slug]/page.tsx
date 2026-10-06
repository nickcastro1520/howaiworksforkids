import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LessonPlayer } from "@/components/LessonPlayer";
import { getLesson, LESSONS } from "@/lib/lessons";
import { lessonJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  const title = `Lesson ${lesson.number}: ${lesson.title}`;
  return {
    title,
    description: `${lesson.bigIdea} Game: ${lesson.game}. ${lesson.gameBlurb}`,
    alternates: { canonical: `/lessons/${lesson.slug}` },
    openGraph: { title, description: lesson.bigIdea, url: `/lessons/${lesson.slug}` },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <div className="lesson" style={{ "--lc": lesson.color, "--lt": lesson.tint } as React.CSSProperties}>
      <JsonLd data={lessonJsonLd(lesson)} />
      <header className="lesson-hero">
        <div className="wrap lesson-hero-inner">
          <p className="crumbs">
            <Link href="/lessons">Lesson trail</Link> <span aria-hidden="true">/</span> Lesson {lesson.number} of {LESSONS.length}
          </p>
          <h1 className="lesson-title">
            <span className="lesson-num" aria-hidden="true">
              {lesson.number}
            </span>
            {lesson.title}
          </h1>
          <p className="lesson-meta">
            About {lesson.minutes} minutes &middot; Game: <b>{lesson.game}</b>
          </p>
        </div>
      </header>
      <div className="wrap lesson-body">
        <LessonPlayer lesson={lesson} />
      </div>
    </div>
  );
}

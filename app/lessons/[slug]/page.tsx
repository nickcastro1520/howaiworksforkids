import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LessonPlayer } from "@/components/LessonPlayer";
import { GLOSSARY, termId } from "@/lib/glossary";
import { getLesson, LESSONS } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { lessonJsonLd, lessonSeo, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  const seo = lessonSeo(lesson);
  return pageMeta({
    title: seo.title,
    description: seo.description,
    path: `/lessons/${lesson.slug}`,
    ogKey: lesson.slug,
    ogAlt: ogAlt(lesson.slug),
    keywords: seo.keywords,
    type: "article",
  });
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const prev = LESSONS.find((l) => l.number === lesson.number - 1);
  const next = LESSONS.find((l) => l.number === lesson.number + 1);
  const words = GLOSSARY.filter((g) => g.lesson === lesson.slug);

  return (
    <div className="lesson" style={{ "--lc": lesson.color, "--lt": lesson.tint } as React.CSSProperties}>
      <JsonLd data={lessonJsonLd(lesson)} />
      <header className="lesson-hero">
        <div className="wrap lesson-hero-inner">
          <Breadcrumbs
            items={[
              { name: "Lessons", path: "/lessons" },
              { name: `Lesson ${lesson.number}: ${lesson.short}`, path: `/lessons/${lesson.slug}` },
            ]}
          />
          <h1 className="lesson-title">
            <span className="lesson-num" aria-hidden="true">
              {lesson.number}
            </span>
            {lesson.title}
          </h1>
          <p className="lesson-meta">
            Lesson {lesson.number} of {LESSONS.length} &middot; About {lesson.minutes} minutes &middot; Game: <b>{lesson.game}</b>
          </p>
        </div>
      </header>
      <div className="wrap lesson-body">
        <LessonPlayer lesson={lesson} />
      </div>

      <nav className="wrap lesson-more" aria-labelledby="more-lessons">
        <h2 id="more-lessons" className="lesson-more-title">
          Keep exploring
        </h2>
        <div className="lesson-pn">
          {prev ? (
            <Link href={`/lessons/${prev.slug}`} className="pn-card pn-prev" style={{ "--lc": prev.color } as React.CSSProperties}>
              <small>&larr; Lesson {prev.number}</small>
              <b>{prev.title}</b>
            </Link>
          ) : (
            <Link href="/lessons" className="pn-card pn-prev">
              <small>&larr; All lessons</small>
              <b>The lesson trail</b>
            </Link>
          )}
          {next ? (
            <Link href={`/lessons/${next.slug}`} className="pn-card pn-next" style={{ "--lc": next.color } as React.CSSProperties}>
              <small>Lesson {next.number} &rarr;</small>
              <b>{next.title}</b>
            </Link>
          ) : (
            <Link href="/finish" className="pn-card pn-next">
              <small>Finish line &rarr;</small>
              <b>Get your certificate</b>
            </Link>
          )}
        </div>
        {words.length > 0 && (
          <p className="lesson-words">
            Words from this lesson:{" "}
            {words.map((w, i) => (
              <span key={w.word}>
                {i > 0 && ", "}
                <Link href={`/glossary#${termId(w.word)}`}>{w.word}</Link>
              </span>
            ))}
            . Grown-ups: see the <Link href="/parents">parent and teacher guide</Link>.
          </p>
        )}
        <ol className="lesson-all" aria-label="All lessons">
          {LESSONS.map((l) => (
            <li key={l.slug}>
              {l.slug === lesson.slug ? (
                <span aria-current="page">
                  {l.number}. {l.short}
                </span>
              ) : (
                <Link href={`/lessons/${l.slug}`}>
                  {l.number}. {l.short}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

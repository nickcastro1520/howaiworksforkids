import type { Metadata } from "next";
import Link from "next/link";
import { Trail } from "@/components/Trail";
import { ogAlt } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";
import { courseJsonLd, pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTabs } from "@/components/SectionTabs";
import { LESSONS, SECTIONS, SECTION_1, SECTION_2 } from "@/lib/lessons";

export const metadata: Metadata = pageMeta({
  title: `AI Lessons for Kids: ${LESSONS.length} Free Interactive AI Games`,
  description: `A free ${LESSONS.length}-lesson AI course for elementary students, ages 6–10, in two sections. Each lesson has a story, a hands-on AI game, a quick check, and a badge.`,
  path: "/lessons",
  ogKey: "lessons",
  ogAlt: ogAlt("lessons"),
  keywords: ["AI lessons for kids", "AI course for kids", "AI games for kids", "AI for elementary students"],
});

export default function LessonsPage() {
  const s2 = SECTIONS[2];
  return (
    <div className="trail-page">
      <JsonLd data={courseJsonLd()} />
      <header className="page-hero trail-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Lessons", path: "/lessons" }]} />
        </div>
        <h1 className="page-title">The lesson trail</h1>
        <p className="page-lead">
          {SECTIONS[1].kicker}: {SECTIONS[1].name}. {SECTION_1.length} stops. Each one is a story, a game, and a badge. Light up Pip&rsquo;s
          whole brain!
        </p>
      </header>
      <div className="wrap narrow">
        <SectionTabs current={1} />
        <Trail section={1} />
        <aside className="s2-teaser" aria-labelledby="s2-teaser">
          <p className="small-cap">{s2.kicker}</p>
          <h2 id="s2-teaser">{s2.name}</h2>
          <p>
            {s2.blurb} {SECTION_2.length} lessons, a final quiz, and a second certificate.
          </p>
          <Link href={s2.path} className="btn btn-big btn-sun">
            See the {s2.name} trail &rarr;
          </Link>
        </aside>
      </div>
    </div>
  );
}

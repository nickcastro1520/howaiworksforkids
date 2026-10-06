import type { Metadata } from "next";
import { Trail } from "@/components/Trail";
import { ogAlt } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";
import { courseJsonLd, pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "AI Lessons for Kids: 7 Free Interactive AI Games",
  description:
    "A free 7-lesson AI course for elementary students, ages 6–10. Each lesson has a story, a hands-on AI game, a quick check, and a badge.",
  path: "/lessons",
  ogKey: "lessons",
  ogAlt: ogAlt("lessons"),
  keywords: ["AI lessons for kids", "AI course for kids", "AI games for kids", "AI for elementary students"],
});

export default function LessonsPage() {
  return (
    <div className="trail-page">
      <JsonLd data={courseJsonLd()} />
      <header className="page-hero trail-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Lessons", path: "/lessons" }]} />
        </div>
        <h1 className="page-title">The lesson trail</h1>
        <p className="page-lead">7 stops. Each one is a story, a game, and a badge. Light up Pip&rsquo;s whole brain!</p>
      </header>
      <div className="wrap narrow">
        <Trail />
      </div>
    </div>
  );
}

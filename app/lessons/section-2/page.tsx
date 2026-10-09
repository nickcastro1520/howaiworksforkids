import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SectionTabs } from "@/components/SectionTabs";
import { Trail } from "@/components/Trail";
import { SECTIONS, SECTION_2 } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { pageMeta, sectionJsonLd } from "@/lib/seo";

const S2 = SECTIONS[2];
const TITLES = SECTION_2.map((l) => l.short).join(", ");

export const metadata: Metadata = pageMeta({
  title: `${S2.kicker}: ${S2.name}. More Free AI Lessons for Kids`,
  description: `${S2.kicker} of How AI Works for Kids: ${SECTION_2.length} more free, hands-on AI lessons for ages 6–10 (${TITLES}), with more coming soon.`,
  path: S2.path,
  ogKey: "section-2",
  ogAlt: ogAlt("section-2"),
  keywords: ["AI lessons for kids", "history of AI for kids", "prompting for kids", "AI literacy for kids"],
});

export default function Section2Page() {
  return (
    <div className="trail-page">
      <JsonLd data={sectionJsonLd(2)} />
      <header className="page-hero trail-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Lessons", path: "/lessons" },
              { name: S2.kicker, path: S2.path },
            ]}
          />
        </div>
        <h1 className="page-title">
          {S2.kicker}: {S2.name}
        </h1>
        <p className="page-lead">
          {S2.blurb} Each lesson ends with an optional mission to try with a grown-up.
        </p>
      </header>
      <div className="wrap narrow">
        <SectionTabs current={2} />
        <Trail section={2} />
      </div>
    </div>
  );
}

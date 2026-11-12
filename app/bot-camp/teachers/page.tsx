import type { Metadata } from "next";
import { BotCampSampleForm } from "@/components/BotCampSampleForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { isKitConfigured } from "@/lib/botCamp";
import { ogAlt } from "@/lib/og";
import { BOT_CAMP_TEACHERS_FAQ, botCampTeachersJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta({
  title: "Free AI lesson for teachers (grades 3–6)",
  description:
    "Get a free Doodle Brain lesson plan and student worksheet. Bot Camp has nine free browser labs for grades 3–6. No sign-up, no student accounts, and drawings stay on the device.",
  path: "/bot-camp/teachers",
  ogKey: "bot-camp-teachers",
  ogAlt: ogAlt("bot-camp-teachers"),
});

export default function BotCampTeachersPage() {
  return (
    <article className="wrap narrow bc-teachers">
      <JsonLd data={botCampTeachersJsonLd()} />
      <JsonLd data={faqJsonLd(BOT_CAMP_TEACHERS_FAQ)} />
      <Breadcrumbs
        items={[
          { name: "Bot Camp", path: "/bot-camp" },
          { name: "Teachers", path: "/bot-camp/teachers" },
        ]}
      />
      <p className="small-cap">A free lesson from Bot Camp</p>
      <h1 className="page-title">Teach your first AI lesson tomorrow. Free.</h1>
      <p className="page-lead">
        Get the Doodle Brain lesson plan and student worksheet. Your students train a real neural network on their own
        drawings, then explain why it needs more than one example. 30 minutes, no prep, works on Chromebooks.
      </p>
      <p className="bc-teachers-note">For teachers and parents; we don&rsquo;t collect anything from kids.</p>

      <BotCampSampleForm ready={isKitConfigured()} />

      <section className="faq" aria-labelledby="bc-teachers-faq">
        <h2 id="bc-teachers-faq" className="section-title">
          Questions
        </h2>
        {BOT_CAMP_TEACHERS_FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      <p className="muted">
        The lab itself is already free, with no sign-up: <a href="/bot-camp">Open Bot Camp</a>.
      </p>
    </article>
  );
}

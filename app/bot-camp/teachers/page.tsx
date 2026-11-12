import type { Metadata } from "next";
import Link from "next/link";
import { BotCampSampleForm } from "@/components/BotCampSampleForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isKitConfigured } from "@/lib/botCamp";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta({
  title: "Teach your first AI lesson tomorrow. Free.",
  description:
    "Get the Doodle Brain lesson plan and student worksheet. Your students train a real neural network on their own drawings. 30 minutes, no prep, works on Chromebooks.",
  path: "/bot-camp/teachers",
  ogKey: "bot-camp-teachers",
  ogAlt: ogAlt("bot-camp-teachers"),
});

export default function BotCampTeachersPage() {
  return (
    <article className="wrap narrow bc-teachers">
      <Breadcrumbs
        items={[
          { name: "Bot Camp", path: "/bot-camp" },
          { name: "For teachers", path: "/bot-camp/teachers" },
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

      <p className="muted">
        The lab itself is already free, with no sign-up:{" "}
        <Link href="/bot-camp">Open Bot Camp</Link>.
      </p>
    </article>
  );
}

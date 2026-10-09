import type { Metadata } from "next";
import { Certificate } from "@/components/Certificate";
import { SECTION_1 } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Your AI Certificate",
  description: `Finish all ${SECTION_1.length} Section 1 lessons to light up Pip's brain and print a certificate. The name stays on your screen. Nothing is saved or sent.`,
  path: "/finish",
  ogKey: "finish",
  ogAlt: ogAlt("finish"),
  noindex: true,
});

export default function FinishPage() {
  return (
    <div className="wrap finish-wrap">
      <Certificate />
    </div>
  );
}

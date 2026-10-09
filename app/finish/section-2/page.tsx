import type { Metadata } from "next";
import { Certificate } from "@/components/Certificate";
import { SECTION_2 } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Your Section 2 Certificate",
  description: `Finish all ${SECTION_2.length} Section 2 lessons and the final quiz to print your Section 2 certificate. The name stays on your screen. Nothing is saved or sent.`,
  path: "/finish/section-2",
  ogKey: "finish-2",
  ogAlt: ogAlt("finish-2"),
  noindex: true,
});

export default function FinishSection2Page() {
  return (
    <div className="wrap finish-wrap">
      <Certificate section={2} />
    </div>
  );
}

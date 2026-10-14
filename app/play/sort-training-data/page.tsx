import type { Metadata } from "next";
import Link from "next/link";
import { BonusPage } from "@/components/bonus/BonusPage";
import { SortTrainingData } from "@/components/bonus/SortTrainingData";
import { BONUS } from "@/lib/bonus";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";

const G = BONUS.sort;

export const metadata: Metadata = pageMeta({
  title: "Sort the Training Data: Free AI Game for Kids",
  description:
    "Free AI game for kids 6–10: sort pictures into the right bins before time runs out, and see how good training data teaches an AI. Tap, drag, or use keys.",
  path: G.path,
  ogKey: `play-${G.slug}`,
  ogAlt: ogAlt(`play-${G.slug}`),
  keywords: ["AI game for kids", "training data for kids", "machine learning game for kids", "sorting game"],
});

export default function Page() {
  return (
    <BonusPage game={G}>
      <SortTrainingData />
      <p className="bonus-note">
        Why it matters: AI learns from examples that people sort and label. When the labels are right, the AI learns the right thing. When they&rsquo;re wrong, it
        learns mistakes. You saw this in <Link href="/lessons/learning-from-examples">Lesson 2</Link> and{" "}
        <Link href="/lessons/sneaky-clues">Lesson 4</Link>.
      </p>
    </BonusPage>
  );
}

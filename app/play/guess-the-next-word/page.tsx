import type { Metadata } from "next";
import Link from "next/link";
import { BonusPage } from "@/components/bonus/BonusPage";
import { NextWordGame } from "@/components/bonus/NextWordGame";
import { BONUS } from "@/lib/bonus";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";

const G = BONUS.nextWord;

export const metadata: Metadata = pageMeta({
  title: "Guess the Next Word: Free Chatbot Game for Kids",
  description:
    "A free bonus AI game for kids 6–10: Pip starts a sentence and you pick the most likely next word from 3, with a friendly reason for each. Learn how chatbots write, one word at a time.",
  path: G.path,
  ogKey: `play-${G.slug}`,
  ogAlt: ogAlt(`play-${G.slug}`),
  keywords: ["chatbot game for kids", "how chatbots work for kids", "next word game", "AI game for kids"],
});

export default function Page() {
  return (
    <BonusPage game={G}>
      <NextWordGame />
      <p className="bonus-note">
        Why it matters: chatbots pick a likely next word, over and over, from patterns in lots of writing. Likely doesn&rsquo;t always mean true, so it&rsquo;s smart to
        check. You saw this in <Link href="/lessons/guess-the-next-word">Lesson 3</Link>. This game uses a fixed word list. No AI is used here.
      </p>
    </BonusPage>
  );
}

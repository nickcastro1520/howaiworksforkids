import type { Metadata } from "next";
import { Trail } from "@/components/Trail";

export const metadata: Metadata = {
  title: "The lesson trail",
  description:
    "Seven short, hands-on AI lessons for kids ages 6–10. Teach Pip, test Pip, and fix Pip's mistakes to learn how real AI works.",
  alternates: { canonical: "/lessons" },
  openGraph: { title: "The lesson trail", url: "/lessons" },
};

export default function LessonsPage() {
  return (
    <div className="trail-page">
      <header className="page-hero trail-hero">
        <h1 className="page-title">The lesson trail</h1>
        <p className="page-lead">7 stops. Each one is a story, a game, and a badge. Light up Pip&rsquo;s whole brain!</p>
      </header>
      <div className="wrap narrow">
        <Trail />
      </div>
    </div>
  );
}

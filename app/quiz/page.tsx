import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalQuiz } from "@/components/FinalQuiz";
import { JsonLd } from "@/components/JsonLd";
import { LESSONS } from "@/lib/lessons";
import { ogAlt } from "@/lib/og";
import { QUIZ_TOTAL } from "@/lib/quiz";
import { pageMeta, quizJsonLd } from "@/lib/seo";

const DESCRIPTION = `A free ${QUIZ_TOTAL}-question AI quiz for kids 6–10 covering all ${LESSONS.length} lessons. Picture answers, read-aloud, no timer, and the right answer shown after each one.`;

export const metadata: Metadata = pageMeta({
  title: "Final AI Quiz for Kids: 10 Picture Questions",
  description: DESCRIPTION,
  path: "/quiz",
  ogKey: "quiz",
  ogAlt: ogAlt("quiz"),
  keywords: ["AI quiz for kids", "AI literacy quiz", "AI questions for kids", "AI lessons for kids"],
});

export default function QuizPage() {
  return (
    <div className="quiz-page">
      <JsonLd data={quizJsonLd(DESCRIPTION)} />
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Lessons", path: "/lessons" },
              { name: "Final quiz", path: "/quiz" },
            ]}
          />
        </div>
        <h1 className="page-title">The Final Quiz</h1>
      </header>
      <div className="wrap narrow">
        <FinalQuiz />
      </div>
    </div>
  );
}

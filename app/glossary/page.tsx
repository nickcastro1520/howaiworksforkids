import type { Metadata } from "next";
import { Pip } from "@/components/Pip";
import { WordBook } from "@/components/WordBook";

export const metadata: Metadata = {
  title: "Pip's Word Book: AI words for kids",
  description: "Twelve AI words explained in kid-friendly language: AI, pattern, data, training, model, chatbot, bias, hallucination, deepfake, and more.",
  alternates: { canonical: "/glossary" },
  openGraph: { title: "Pip's Word Book", url: "/glossary" },
};

export default function GlossaryPage() {
  return (
    <div className="glossary-page">
      <header className="page-hero book-hero">
        <div className="wrap book-hero-inner">
          <Pip mood="happy" size={120} />
          <div>
            <h1 className="page-title">Pip&rsquo;s Word Book</h1>
            <p className="page-lead">Big AI words, in small kid words. Tap a card to flip it.</p>
          </div>
        </div>
      </header>
      <div className="wrap">
        <WordBook />
      </div>
    </div>
  );
}

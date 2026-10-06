import type { Metadata } from "next";
import { Pip } from "@/components/Pip";
import { WordBook } from "@/components/WordBook";
import { ogAlt } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";
import { glossaryJsonLd, pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "AI Words for Kids: A Kid-Friendly AI Glossary",
  description:
    "What do AI words mean? Twelve AI terms explained in plain kid words: AI, pattern, data, training, model, chatbot, bias, hallucination, deepfake, and more.",
  path: "/glossary",
  ogKey: "glossary",
  ogAlt: ogAlt("glossary"),
  keywords: ["AI words for kids", "AI glossary for kids", "AI vocabulary for kids", "what is machine learning for kids"],
});

export default function GlossaryPage() {
  return (
    <div className="glossary-page">
      <JsonLd data={glossaryJsonLd()} />
      <header className="page-hero book-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Word Book", path: "/glossary" }]} />
        </div>
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

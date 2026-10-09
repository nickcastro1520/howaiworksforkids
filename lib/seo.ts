import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/glossary";
import type { Lesson } from "@/lib/lessons";
import { LESSONS } from "@/lib/lessons";
import { absoluteUrl, CONTENT_UPDATED, LOGO_URL, NICK, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/* ------------------------------------------------------------------ */
/*  Search-focused copy for every lesson                               */
/* ------------------------------------------------------------------ */

export type LessonSeo = { title: string; description: string; keywords: string[]; teaches: string[] };

export const LESSON_SEO: Record<string, LessonSeo> = {
  "what-is-ai": {
    title: "What Is AI? A Kid-Friendly Lesson + AI Detective Game",
    description:
      "How does AI work? Kids 6–10 meet Pip, a tiny AI, and learn that AI learns patterns from examples. Then they play AI Detective to find AI at home.",
    keywords: ["what is AI for kids", "how does AI work for kids", "AI explained for kids", "artificial intelligence for kids"],
    teaches: ["What artificial intelligence (AI) is", "AI learns patterns from lots of examples", "Spotting AI in everyday devices"],
  },
  "learning-from-examples": {
    title: "How AI Learns from Examples: Machine Learning Game for Kids",
    description:
      "Kids teach Pip to sort Glorbs and watch a real tiny machine-learning model learn their secret rule from examples. A free, hands-on AI lesson for ages 6–10.",
    keywords: ["machine learning for kids", "how AI learns", "AI games for kids", "training data for kids"],
    teaches: ["AI learns from examples instead of written rules", "More good examples make better guesses", "Correcting an AI helps it learn"],
  },
  "guess-the-next-word": {
    title: "How Do Chatbots Work? Next-Word Guessing Game for Kids",
    description:
      "How do chatbots like ChatGPT write? Kids learn that chatbots guess the next word, then build a story with a tiny word-guessing model. Ages 6–10.",
    keywords: ["how do chatbots work for kids", "how does ChatGPT work for kids", "language models for kids", "AI lessons for kids"],
    teaches: ["Chatbots write by guessing the next word", "Guesses come from patterns in lots of reading", "Why chatbot answers can change"],
  },
  "sneaky-clues": {
    title: "AI Bias for Kids: Why Good Examples Matter",
    description:
      "A kid-friendly lesson on AI bias. Pip learns the wrong clue from lopsided examples, and kids fix it by adding better ones. Free for ages 6–10.",
    keywords: ["AI bias for kids", "training data for kids", "fair AI lesson", "AI for elementary students"],
    teaches: ["Lopsided examples teach AI the wrong clue (bias)", "More varied examples fix mistakes", "Testing an AI to find its mix-ups"],
  },
  "ai-can-be-wrong": {
    title: "Can AI Be Wrong? Teaching Kids to Fact-Check AI",
    description:
      "AI can sound sure and still be wrong. Kids play Fact or Fib? and learn to check answers with a grown-up or a trusted source. Free for ages 6–10.",
    keywords: ["can AI be wrong", "AI hallucinations for kids", "fact checking for kids", "AI literacy for kids"],
    teaches: ["AI can sound sure and still be wrong (hallucinations)", "Check answers with a grown-up or a trusted source", "Sounding confident is not the same as being right"],
  },
  "real-or-made-up": {
    title: "Real or AI-Made? Spot AI-Generated Pictures (Kids Game)",
    description:
      "AI can make pictures of things that never happened. Kids hunt for six glitches in an AI-style picture. A free deepfake-awareness lesson, ages 6–10.",
    keywords: ["AI generated images for kids", "deepfakes for kids", "spot AI pictures", "media literacy for kids"],
    teaches: ["AI can make pictures and voices of things that never happened", "Clues that a picture may be AI-made", "Ask a grown-up when something seems unreal"],
  },
  "smart-and-safe": {
    title: "AI Safety for Kids: Be the Boss of AI",
    description:
      "Kids learn to keep private things private, that AI isn't a person, and to ask a grown-up, with the Go, Ask, or Stop game. Free AI safety lesson, ages 6–10.",
    keywords: ["AI safety for kids", "online safety for kids", "teach kids about AI", "AI privacy for kids"],
    teaches: ["Keep private information private", "AI is a computer program, not a person or friend", "Ask a grown-up when unsure"],
  },
};

export function lessonSeo(lesson: Lesson): LessonSeo {
  return LESSON_SEO[lesson.slug] ?? { title: lesson.title, description: lesson.summary, keywords: [], teaches: [lesson.bigIdea] };
}

/* ------------------------------------------------------------------ */
/*  Metadata helper: canonical + full Open Graph + Twitter every time  */
/*  (Next merges metadata shallowly, so each page sets the whole set.) */
/* ------------------------------------------------------------------ */

type PageMetaInput = {
  /** Title without the site name. Use `absoluteTitle` to skip the template. */
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  /** Key for /og/[key] image. */
  ogKey: string;
  ogAlt: string;
  keywords?: string[];
  noindex?: boolean;
  type?: "website" | "article";
};

export function pageMeta(input: PageMetaInput): Metadata {
  // Keep titles short enough for search results: add the site name only when it fits.
  const branded = `${input.title} | ${SITE_NAME}`;
  const absolute = input.absoluteTitle ?? (branded.length > 65 ? input.title : undefined);
  const fullTitle = absolute ?? branded;
  const image = { url: `/og/${input.ogKey}`, width: 1200, height: 630, alt: input.ogAlt, type: "image/png" };
  return {
    title: absolute ? { absolute } : input.title,
    description: input.description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: { canonical: input.path },
    openGraph: {
      type: input.type ?? "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: input.path,
      title: fullTitle,
      description: input.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      images: [image],
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */

export const IDS = {
  website: `${SITE_URL}/#website`,
  org: `${SITE_URL}/#organization`,
  person: `${SITE_URL}/#nick-castro`,
  course: `${SITE_URL}/lessons#course`,
};

const AGE_RANGE = "6-10";
const LEVEL = "Elementary school (ages 6–10)";
const audience = {
  "@type": "EducationalAudience",
  educationalRole: "student",
  audienceType: "Children ages 6–10",
};

const COURSE_NAME = "How AI Works for Kids: 7 Hands-On AI Lessons";

export const TOTAL_MINUTES = LESSONS.reduce((s, l) => s + l.minutes, 0);

/** Site-wide nodes: who publishes, who made it, the website itself. Rendered on every page. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": IDS.org,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
        description: SITE_DESCRIPTION,
        founder: { "@id": IDS.person },
        sameAs: [NICK.site],
      },
      {
        "@type": "Person",
        "@id": IDS.person,
        name: NICK.name,
        url: absoluteUrl("/about"),
        description: "Creator of How AI Works for Kids. Builds tools that explain AI in plain language.",
        homeLocation: { "@type": "Place", name: `${NICK.city}, IL, USA` },
        sameAs: [NICK.site, NICK.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": IDS.website,
        name: SITE_NAME,
        alternateName: "howaiworksforkids.com",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": IDS.org },
        creator: { "@id": IDS.person },
        audience,
      },
    ],
  };
}

function lessonResource(lesson: Lesson, full = false) {
  const seo = lessonSeo(lesson);
  const url = absoluteUrl(`/lessons/${lesson.slug}`);
  return {
    "@type": "LearningResource",
    "@id": `${url}#lesson`,
    name: `Lesson ${lesson.number}: ${lesson.title}`,
    description: seo.description,
    url,
    position: lesson.number,
    educationalLevel: LEVEL,
    typicalAgeRange: AGE_RANGE,
    isAccessibleForFree: true,
    inLanguage: "en-US",
    timeRequired: `PT${lesson.minutes}M`,
    teaches: seo.teaches,
    learningResourceType: ["Interactive game", "Story", "Quiz"],
    interactivityType: "active",
    ...(full
      ? {
          image: absoluteUrl(`/og/${lesson.slug}`),
          abstract: lesson.bigIdea,
          keywords: seo.keywords.join(", "),
          audience,
          author: { "@id": IDS.person },
          publisher: { "@id": IDS.org },
          dateModified: CONTENT_UPDATED,
          isPartOf: { "@type": "Course", "@id": IDS.course, name: COURSE_NAME, url: absoluteUrl("/lessons") },
        }
      : {}),
  };
}


/** The free Lesson 1 teacher kit (PDF) on /teachers. */
export function teacherKitJsonLd() {
  const l1 = LESSONS[0];
  const pageUrl = absoluteUrl("/teachers");
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${pageUrl}#lesson-1-kit`,
    name: `Lesson 1 Teacher Kit: ${l1.title}`,
    description:
      "A free, print-and-go teacher kit: a 35-minute teacher guide, the AI or Not? unplugged card sort, K–2 and 3–5 worksheets, an answer key, and a parent letter.",
    url: pageUrl,
    image: absoluteUrl("/teachers/kit-cover-640.webp"),
    associatedMedia: {
      "@type": "MediaObject",
      name: "Lesson 1 Teacher Kit (PDF, 8 pages)",
      contentUrl: absoluteUrl("/teachers/lesson-1-teacher-kit.pdf"),
      encodingFormat: "application/pdf",
    },
    learningResourceType: ["Lesson plan", "Worksheet", "Unplugged activity", "Answer key"],
    educationalLevel: LEVEL,
    typicalAgeRange: AGE_RANGE,
    timeRequired: "PT35M",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    audience: { "@type": "EducationalAudience", educationalRole: "teacher", audienceType: "Teachers, homeschool parents, and club leaders" },
    about: { "@id": `${absoluteUrl(`/lessons/${l1.slug}`)}#lesson` },
    isPartOf: { "@type": "Course", "@id": IDS.course, name: COURSE_NAME, url: absoluteUrl("/lessons") },
    author: { "@id": IDS.person },
    publisher: { "@id": IDS.org },
    dateModified: "2026-10-08",
  };
}

/** The full course with every lesson as a LearningResource. */
export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": IDS.course,
    name: COURSE_NAME,
    description: `A free, ${LESSONS.length}-lesson AI course for kids ages 6–10. Kids teach a tiny AI named Pip and learn what AI is, how it learns from examples, how chatbots guess the next word, why lopsided data causes mistakes, why AI can be wrong, how to spot AI-made pictures, and how to stay safe.`,
    url: absoluteUrl("/lessons"),
    image: absoluteUrl("/og/lessons"),
    provider: { "@type": "Organization", "@id": IDS.org, name: SITE_NAME, sameAs: SITE_URL },
    creator: { "@id": IDS.person },
    educationalLevel: LEVEL,
    typicalAgeRange: AGE_RANGE,
    audience,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    timeRequired: `PT${TOTAL_MINUTES}M`,
    teaches: LESSONS.map((l) => l.bigIdea),
    about: ["Artificial intelligence", "Machine learning", "AI literacy", "AI safety"],
    dateModified: CONTENT_UPDATED,
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD", category: "Free", availability: "https://schema.org/InStock" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: `PT${TOTAL_MINUTES}M`,
      inLanguage: "en-US",
    },
    hasPart: LESSONS.map((l) => lessonResource(l)),
  };
}

export function lessonJsonLd(lesson: Lesson) {
  return { "@context": "https://schema.org", ...lessonResource(lesson, true) };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function glossaryJsonLd() {
  const url = absoluteUrl("/glossary");
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#terms`,
    name: "Pip's Word Book: AI words for kids",
    url,
    inLanguage: "en-US",
    hasDefinedTerm: GLOSSARY.map((g) => ({
      "@type": "DefinedTerm",
      name: g.word,
      description: g.means,
      inDefinedTermSet: `${url}#terms`,
    })),
  };
}

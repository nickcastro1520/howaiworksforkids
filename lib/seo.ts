import type { Lesson } from "@/lib/lessons";
import { LESSONS } from "@/lib/lessons";
import { absoluteUrl, NICK, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const audience = {
  "@type": "EducationalAudience",
  educationalRole: "student",
  suggestedMinAge: 6,
  suggestedMaxAge: 10,
};

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: NICK.name,
        url: NICK.site,
        homeLocation: {
          "@type": "Place",
          address: { "@type": "PostalAddress", addressLocality: NICK.city, addressRegion: "IL", addressCountry: "US" },
        },
        sameAs: [NICK.site, NICK.linkedin],
        jobTitle: "AI trainer and enablement",
      },
      {
        "@type": "Course",
        "@id": `${SITE_URL}/#course`,
        name: SITE_NAME,
        description:
          "Seven hands-on lessons for ages 6–10: what AI is, learning from examples, how chatbots guess the next word, lopsided data, when AI is wrong, AI-made pictures, and staying safe.",
        url: absoluteUrl("/lessons"),
        provider: { "@id": `${SITE_URL}/#person` },
        educationalLevel: "Beginner",
        inLanguage: "en",
        isAccessibleForFree: true,
        audience,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", category: "Free" },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT40M",
        },
        hasPart: LESSONS.map((lesson) => ({
          "@type": "LearningResource",
          name: lesson.title,
          description: lesson.summary,
          url: absoluteUrl(`/lessons/${lesson.slug}`),
          isAccessibleForFree: true,
          learningResourceType: "Interactive game",
        })),
      },
    ],
  };
}

export function lessonJsonLd(lesson: Lesson) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.summary,
    url: absoluteUrl(`/lessons/${lesson.slug}`),
    isAccessibleForFree: true,
    inLanguage: "en",
    learningResourceType: "Interactive game",
    educationalLevel: "Beginner",
    timeRequired: `PT${lesson.minutes}M`,
    audience,
    teaches: lesson.bigIdea,
    provider: { "@type": "Person", name: NICK.name, url: NICK.site },
    isPartOf: { "@id": `${SITE_URL}/#course` },
  };
}

import { LESSONS } from "@/lib/lessons";
import { absoluteUrl, NICK, SITE_NAME, SITE_URL } from "@/lib/site";
import type { Lesson } from "@/lib/lessons";

const audience = {
  "@type": "EducationalAudience",
  educationalRole: "student",
  suggestedMinAge: 6,
  suggestedMaxAge: 14,
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
        description:
          "Free lessons that show kids ages 6 to 14 how AI works, with no ads, no accounts, and no live chatbot.",
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
          address: {
            "@type": "PostalAddress",
            addressLocality: NICK.city,
            addressRegion: "IL",
            addressCountry: "US",
          },
        },
        sameAs: [NICK.site, NICK.linkedin],
        jobTitle: "AI enablement and trainer",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE_NAME,
        url: SITE_URL,
        founder: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Course",
        "@id": `${SITE_URL}/#course`,
        name: SITE_NAME,
        description:
          "Seven short games about patterns, practice, context, false patterns, attention, checking a source, and safety.",
        url: absoluteUrl("/lessons"),
        provider: { "@id": `${SITE_URL}/#person` },
        educationalLevel: "Beginner",
        inLanguage: "en",
        isAccessibleForFree: true,
        audience,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        hasCourseInstance: LESSONS.map((lesson) => ({
          "@type": "CourseInstance",
          name: lesson.title,
          courseMode: "online",
          url: absoluteUrl(`/lessons/${lesson.slug}`),
        })),
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
    audience,
    teaches: lesson.takeaway.tweens,
    provider: {
      "@type": "Person",
      name: NICK.name,
      url: NICK.site,
    },
    isPartOf: { "@id": `${SITE_URL}/#course` },
  };
}

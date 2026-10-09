import type { MetadataRoute } from "next";
import { LESSONS, SECTIONS } from "@/lib/lessons";
import { absoluteUrl, CONTENT_UPDATED } from "@/lib/site";
import { videoFor } from "@/lib/video";

type Entry = { path: string; og: string; priority: number; freq: "weekly" | "monthly" | "yearly" };

const PAGES: Entry[] = [
  { path: "/", og: "home", priority: 1, freq: "weekly" },
  { path: "/lessons", og: "lessons", priority: 0.9, freq: "weekly" },
  { path: SECTIONS[2].path, og: "section-2", priority: 0.85, freq: "weekly" },
  ...LESSONS.map((l): Entry => ({ path: `/lessons/${l.slug}`, og: l.slug, priority: 0.8, freq: "monthly" })),
  { path: "/quiz", og: "quiz", priority: 0.6, freq: "monthly" },
  { path: "/parents", og: "parents", priority: 0.7, freq: "monthly" },
  { path: "/teachers", og: "teachers", priority: 0.7, freq: "monthly" },
  { path: "/glossary", og: "glossary", priority: 0.6, freq: "monthly" },
  { path: "/tested-by-kids", og: "tested-by-kids", priority: 0.4, freq: "monthly" },
  { path: "/about", og: "about", priority: 0.4, freq: "yearly" },
  { path: "/privacy", og: "privacy", priority: 0.3, freq: "yearly" },
];

/** /finish and /finish/section-2 are intentionally left out: they are personal certificate screens and are marked noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_UPDATED}T00:00:00Z`);
  return PAGES.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified,
    changeFrequency: p.freq,
    priority: p.priority,
    images: [absoluteUrl(`/og/${p.og}`)],
    ...(videoFor(p.og)
      ? {
          videos: [
            {
              title: "Watch Pip's time ride: where did AI come from?",
              thumbnail_loc: absoluteUrl(videoFor(p.og)!.poster),
              description: videoFor(p.og)!.description,
              content_loc: absoluteUrl(videoFor(p.og)!.src),
              duration: videoFor(p.og)!.seconds,
              publication_date: videoFor(p.og)!.uploadDate,
              family_friendly: "yes" as const,
            },
          ],
        }
      : {}),
  }));
}

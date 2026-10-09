import type { MetadataRoute } from "next";
import { LESSONS } from "@/lib/lessons";
import { absoluteUrl, CONTENT_UPDATED } from "@/lib/site";

type Entry = { path: string; og: string; priority: number; freq: "weekly" | "monthly" | "yearly" };

const PAGES: Entry[] = [
  { path: "/", og: "home", priority: 1, freq: "weekly" },
  { path: "/lessons", og: "lessons", priority: 0.9, freq: "weekly" },
  ...LESSONS.map((l): Entry => ({ path: `/lessons/${l.slug}`, og: l.slug, priority: 0.8, freq: "monthly" })),
  { path: "/parents", og: "parents", priority: 0.7, freq: "monthly" },
  { path: "/teachers", og: "teachers", priority: 0.7, freq: "monthly" },
  { path: "/glossary", og: "glossary", priority: 0.6, freq: "monthly" },
  { path: "/tested-by-kids", og: "tested-by-kids", priority: 0.4, freq: "monthly" },
  { path: "/about", og: "about", priority: 0.4, freq: "yearly" },
  { path: "/privacy", og: "privacy", priority: 0.3, freq: "yearly" },
];

/** /finish is intentionally left out: it's a personal certificate screen and is marked noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_UPDATED}T00:00:00Z`);
  return PAGES.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified,
    changeFrequency: p.freq,
    priority: p.priority,
    images: [absoluteUrl(`/og/${p.og}`)],
  }));
}

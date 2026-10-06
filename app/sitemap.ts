import type { MetadataRoute } from "next";
import { LESSONS } from "@/lib/lessons";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", "/lessons", ...LESSONS.map((l) => `/lessons/${l.slug}`), "/glossary", "/parents", "/about", "/tested-by-kids", "/privacy"];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/lessons") ? 0.8 : 0.6,
  }));
}

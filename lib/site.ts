export const SITE_URL = "https://howaiworksforkids.com";
export const SITE_NAME = "How AI Works for Kids";

export const NICK = {
  name: "Nick Castro",
  city: "Chicago",
  site: "https://nickcastrobuilds.com",
  linkedin: "https://www.linkedin.com/in/nicolas-castro-4081545b",
  email: "nickcastro1520@gmail.com",
} as const;

export const PREFS_KEY = "howaiworks.prefs.v1";

export const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function lessonPath(slug: string): string {
  return `/lessons/${slug}`;
}

export function absoluteUrl(path = "/"): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

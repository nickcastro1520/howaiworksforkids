export const SITE_URL = "https://howaiworksforkids.com";
export const SITE_NAME = "How AI Works for Kids";
export const SITE_TAGLINE = "Teach a tiny AI. Find out how real AI works.";
export const SITE_DESCRIPTION =
  "Seven free, hands-on games that show kids ages 6–10 how AI works. Kids teach a tiny AI named Pip, then see how real AI learns, guesses, and makes mistakes. No ads, no accounts, no chatbot.";

export const NICK = {
  name: "Nick Castro",
  city: "Chicago",
  site: "https://nickcastrobuilds.com",
  linkedin: "https://www.linkedin.com/in/nicolas-castro-4081545b",
  email: "nickcastro1520@gmail.com",
} as const;

export const PROGRESS_KEY = "hawfk.progress.v2";

export const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

/** Date the lesson content was last meaningfully updated (used for sitemap lastModified and schema). */
export const CONTENT_UPDATED = "2026-10-05";

/** Square logo used in schema.org Organization markup. */
export const LOGO_URL = `${SITE_URL}/icon-512.png`;

export function absoluteUrl(path = "/"): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

import { GA_ID_PATTERN } from "@/lib/site";

/**
 * Google Analytics 4 is OFF unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set (e.g. "G-ABC123XYZ").
 * NEXT_PUBLIC_* values are baked in at build time, so a redeploy is needed after changing it.
 */
const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
export const GA_ID: string | null = GA_ID_PATTERN.test(raw) ? raw : null;
export const GA_ENABLED = GA_ID !== null;

type GtagParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Send an anonymous event (no names, no free text from kids). Does nothing when GA is off.
 */
export function trackEvent(name: string, params: GtagParams = {}) {
  if (!GA_ENABLED || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

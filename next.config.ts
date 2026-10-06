import type { NextConfig } from "next";

const OLD_LESSONS: Record<string, string> = {
  "not-magic": "what-is-ai",
  "learn-by-trying": "learning-from-examples",
  "words-need-context": "guess-the-next-word",
  "tricky-look-alikes": "sneaky-clues",
  "what-it-notices": "sneaky-clues",
  "check-a-source": "ai-can-be-wrong",
  "be-safe-and-honest": "smart-and-safe",
};

// Content-Security-Policy. Allows only this site plus Google Analytics (gtag.js and its
// collection endpoints). 'unsafe-inline' scripts are needed because Next.js inlines its page
// data and the GA config; nonces would force every page to render dynamically.
// No ads, no third-party embeds, no framing.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return Object.entries(OLD_LESSONS).map(([from, to]) => ({
      source: `/lessons/${from}`,
      destination: `/lessons/${to}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

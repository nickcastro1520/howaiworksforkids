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
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

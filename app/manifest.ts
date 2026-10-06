import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "How AI Works",
    description: "Teach a tiny AI named Pip and learn how real AI works. Free games for ages 6–10.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8ec",
    theme_color: "#6b4cf0",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

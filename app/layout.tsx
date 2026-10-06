import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ogAlt } from "@/lib/og";
import { siteGraph } from "@/lib/seo";
import { NICK, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const body = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

const display = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const HOME_TITLE = "How Does AI Work? Free AI Lessons & Games for Kids (Ages 6–10)";
const HOME_DESCRIPTION =
  "Teach kids about AI with 7 free, hands-on lessons and games. Kids 6–10 teach a tiny AI named Pip and see how real AI learns and makes mistakes.";

/** Google Search Console HTML-tag verification. Only rendered when NEXT_PUBLIC_GSC_VERIFICATION is set. */
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

const defaultImage = { url: "/og/home", width: 1200, height: 630, alt: ogAlt("home"), type: "image/png" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: NICK.name, url: NICK.site }],
  creator: NICK.name,
  publisher: SITE_NAME,
  category: "education",
  keywords: [
    "how does AI work for kids",
    "AI for kids",
    "AI lessons for kids",
    "teach kids about AI",
    "AI games for kids",
    "AI for elementary students",
    "machine learning for kids",
    "AI literacy for kids",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [defaultImage],
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION, images: [defaultImage] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#fff8ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <JsonLd data={siteGraph()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

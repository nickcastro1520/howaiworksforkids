import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { PreferencesRoot } from "@/components/Preferences";
import { PREFS_BOOT_SCRIPT } from "@/lib/prefs";
import { NICK, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const body = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-body-family",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const description =
  "Free, ad-free games that show kids ages 6–14 how AI works: patterns, practice, context, false patterns, attention, checking a source, and safety. No accounts and no live chatbot.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: NICK.name, url: NICK.site }],
  creator: NICK.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description,
  },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: PREFS_BOOT_SCRIPT }} />
        <PreferencesRoot>{children}</PreferencesRoot>
        <Analytics />
      </body>
    </html>
  );
}

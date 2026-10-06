import type { Metadata } from "next";
import { NICK, PROGRESS_KEY, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "COPPA-friendly privacy notice for How AI Works for Kids. No ads, no kid accounts, no kid personal information, and no live AI chat.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy", url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="wrap narrow privacy">
      <p className="small-cap">Updated October 2026</p>
      <h1 className="page-title">Privacy</h1>
      <p className="page-lead">
        The short version: we don&rsquo;t collect information from kids. No ads, no accounts, no chat with an AI. Progress stays in your
        browser.
      </p>

      <h2>Who runs this site</h2>
      <p>
        {SITE_NAME} ({SITE_URL}) is run by {NICK.name} in {NICK.city}. It is made for children and families. Parents and guardians can write
        to <a href={`mailto:${NICK.email}`}>{NICK.email}</a> or use the contact on <a href={NICK.site}>nickcastrobuilds.com</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        Nothing from children. We do not ask for a child&rsquo;s name, email, school, photo, address, or phone number. There are no
        accounts, no ads, and we do not sell or share personal information.
      </p>

      <h2>What stays on your device</h2>
      <p>
        The site remembers which lessons are finished, so Pip&rsquo;s brain lights stay on. It saves this in your browser&rsquo;s
        localStorage under the key <code>{PROGRESS_KEY}</code>. It is a list of lesson names and nothing else. It never leaves your device.
        Tap &ldquo;Start over&rdquo; on the lesson trail, or clear this site&rsquo;s data, to delete it.
      </p>
      <p>
        The nickname typed on the certificate is only shown on the screen. It is not saved or sent anywhere.
      </p>

      <h2>No live AI</h2>
      <p>
        The games use small models written for this site that run inside the web page. Nothing a child does is sent to an AI service, and
        kids cannot type open-ended messages to an AI.
      </p>

      <h2>Read aloud</h2>
      <p>
        &ldquo;Read it to me&rdquo; uses your device&rsquo;s built-in speech feature. It reads the lesson&rsquo;s own story text. Some
        browsers use an online voice to do this, but it only ever reads our story text, never anything a child typed.
      </p>

      <h2>Tell a grown-up email</h2>
      <p>
        On the finish page, a grown-up can choose to open their own email app with a short note about what their child learned. This uses a{" "}
        <code>mailto:</code> link. The address is not sent to us or saved, and the field is cleared right away.
      </p>

      <h2>Analytics</h2>
      <p>
        Analytics are off. If the site owner ever turns on Google Analytics (by setting <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code>), it
        would be set to anonymize IP addresses with ad features and Google signals turned off, and this notice would be updated first.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted by Vercel. Like any web host, Vercel may process basic technical request data (such as IP address and browser
        type) to deliver pages and keep the site secure.
      </p>

      <h2>Parents&rsquo; rights</h2>
      <p>
        Because we don&rsquo;t collect personal information from children, there is nothing for us to review or delete. If you think a
        child&rsquo;s information reached us by mistake, email <a href={`mailto:${NICK.email}`}>{NICK.email}</a> and we will delete it.
      </p>
    </article>
  );
}

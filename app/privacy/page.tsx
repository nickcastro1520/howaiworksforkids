import type { Metadata } from "next";
import { GA_ENABLED } from "@/lib/analytics";
import { NICK, PROGRESS_KEY, QUIZ_KEY, SITE_NAME, SITE_URL } from "@/lib/site";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy: No Ads, No Kid Accounts",
  description:
    "We collect no personal information from children: no ads, no accounts, no chatbot. Lesson progress stays in your browser. Here's exactly what we do.",
  path: "/privacy",
  ogKey: "privacy",
  ogAlt: ogAlt("privacy"),
});

export default function PrivacyPage() {
  return (
    <article className="wrap narrow privacy">
      <Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />
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
        Nothing personal from children. We do not ask for a child&rsquo;s name, email, school, photo, address, or phone number. There are no
        accounts, no ads, and we do not sell or share personal information.
      </p>

      <h2>What stays on your device</h2>
      <p>
        The site remembers which lessons are finished, so Pip&rsquo;s brain lights stay on. It saves this in your browser&rsquo;s
        localStorage under the key <code>{PROGRESS_KEY}</code>. It is a list of lesson names and nothing else. It never leaves your device.
        Tap &ldquo;Start over&rdquo; on the lesson trail, or clear this site&rsquo;s data, to delete it.
      </p>
      <p>
        The final quiz result is saved the same way, under the key <code>{QUIZ_KEY}</code>: the score and the IDs of any topics that were
        missed (for example &ldquo;fairness&rdquo;), so the certificate can unlock and the next visit can say &ldquo;last time.&rdquo; No
        answers, no name, nothing else. It never leaves your device, and the quiz is not tracked in analytics. &ldquo;Start over&rdquo; deletes
        it too.
      </p>
      <p>
        The nickname typed on the certificate is only shown on the screen. It is not saved or sent anywhere.
      </p>

      <h2>No live AI</h2>
      <p>
        The games use small models written for this site that run inside the web page. Nothing a child does is sent to an AI service, and
        kids cannot type open-ended messages to an AI.
      </p>

      <h2>Drawings</h2>
      <p>
        Some games let kids draw (for example Pixel Peek and Pip&rsquo;s Idea Machine). Drawings stay on the screen and disappear when you
        leave the page. They are not saved or sent anywhere. The same goes for the sorting machine kids build in Lesson 15 and its
        &ldquo;My AI Card&rdquo;: it has no name field, and printing it uses your own printer.
      </p>

      <h2>Grown-up missions</h2>
      <p>
        Section 2 lessons end with an optional &ldquo;Try it with a grown-up&rdquo; mission: a sample prompt a grown-up can type into their
        own AI account, if they choose to. This site does not connect to any AI service. The &ldquo;Copy&rdquo; button only puts the prompt
        text on your device&rsquo;s clipboard. We don&rsquo;t track whether a mission is opened, copied, or done.
      </p>

      <h2>Read aloud</h2>
      <p>
        &ldquo;Read it to me&rdquo; and the &ldquo;Hear it&rdquo; speaker buttons use your device&rsquo;s built-in speech feature. They read
        the site&rsquo;s own text: stories, instructions, questions, and answer choices. Some browsers use an online voice to do this, but
        it only ever reads our text, never anything a child typed.
      </p>

      <h2>Tell a grown-up email</h2>
      <p>
        On the certificate pages and the quiz results, a grown-up can choose to open their own email app with a short note about what their
        child learned. If the quiz was taken, the note includes the score and a talk question for each missed topic. It never includes a name.
        This uses a <code>mailto:</code> link. The address is not sent to us or saved, and the field is cleared right away. The same note is
        shown on screen with &ldquo;Copy note&rdquo; and &ldquo;Print note&rdquo; buttons, which only use your device&rsquo;s clipboard and
        printer.
      </p>

      <h2 id="analytics">Analytics</h2>
      {GA_ENABLED ? (
        <>
          <p>
            We use Google Analytics 4 to see anonymous usage stats: how many visits the site gets, which pages are viewed, roughly what
            country and type of device visitors use, and how many lessons are finished. This helps us see which lessons work and which need
            fixing.
          </p>
          <ul>
            <li>No ads. Advertising features, Google signals, and ad personalization are turned off, and ad consent is set to &ldquo;denied.&rdquo;</li>
            <li>We ask Google to anonymize IP addresses. We never send names, emails, certificate nicknames, or anything a child types.</li>
            <li>
              There are two custom events. &ldquo;Lesson finished&rdquo; records the lesson number and name and whether it was the first time
              on this device. &ldquo;Teacher kit download&rdquo; records which kit was downloaded and which button was used. Nothing about who
              did it. Game answers, quiz answers and scores, drawings, and grown-up missions are not tracked.
            </li>
            <li>Google Analytics sets first-party cookies to count visits. You can block them with your browser&rsquo;s settings or a
              content blocker, and the lessons will still work the same.</li>
          </ul>
          <p>
            Google processes this data under its own terms; see{" "}
            <a href="https://policies.google.com/technologies/partner-sites">how Google uses data from sites that use its services</a>.
          </p>
        </>
      ) : (
        <p>
          Analytics are off right now. If we turn on Google Analytics, it will only count anonymous visits and finished lessons, with ads,
          Google signals, and ad personalization turned off, and we will update this notice when we do.
        </p>
      )}

      <h2>Search Console</h2>
      <p>
        We may use Google Search Console to see how people find the site in Google Search (for example, which searches show our pages).
        It uses search data Google already has and does not add any tracking to this site.
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

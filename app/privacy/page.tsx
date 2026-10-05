import type { Metadata } from "next";
import { NICK, PREFS_KEY, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "COPPA-friendly privacy notice for How AI Works for Kids. No ads, no kid accounts, no kid personal information, and no live AI chat.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy",
    description: "What this kids’ site does and does not collect.",
    url: "/privacy",
  },
};

const SECTIONS = [
  {
    id: "who",
    title: "Who runs this site",
    body: (
      <>
        {SITE_NAME} ({SITE_URL}) is operated by {NICK.name} in {NICK.city}. It is directed at
        children and families. Parents and guardians can write to{" "}
        <a className="underline decoration-2 underline-offset-4" href={`mailto:${NICK.email}`}>
          {NICK.email}
        </a>{" "}
        or use the contact on{" "}
        <a className="underline decoration-2 underline-offset-4" href={NICK.site}>
          nickcastrobuilds.com
        </a>
        .
      </>
    ),
  },
  {
    id: "collect",
    title: "What we collect",
    body: (
      <>
        <p>
          We do not ask children to create accounts. We do not ask for a child’s name, email, school,
          photo, address, or phone number. We do not sell personal information. There is no
          advertising.
        </p>
        <p className="mt-2">
          The site stores a few settings in this browser only, under the localStorage key{" "}
          <code>{PREFS_KEY}</code>: the chosen world (space, dinosaurs, or e-bikes), the reading
          level, and which lessons were finished. That stays on the device. Clearing the browser’s
          site data deletes it. We do not receive a copy.
        </p>
      </>
    ),
  },
  {
    id: "mail",
    title: "Tell a parent",
    body: (
      <>
        <p>
          The optional parent note asks for a parent or guardian email address and then opens a{" "}
          <code>mailto:</code> link in the device’s email app. The address is not sent to this
          website and is not stored. The message does not include a child’s name or email. The field
          is cleared after the mail app opens.
        </p>
        <p className="mt-2">
          A future email service is not turned on. If one is added later, it would be configured
          with an environment variable such as <code>RESEND_API_KEY</code> or{" "}
          <code>PARENT_NOTIFY_WEBHOOK</code>, it would accept only an address a parent typed, and it
          would still refuse a child’s name or email. That hook is documented in the README and is
          off.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics",
    body: (
      <p>
        Analytics is off unless the site operator sets <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> to
        a real Google Analytics 4 measurement ID. There is no ID built into the code. If it is
        turned on, Google may receive pages visited and a device identifier. The tag is configured
        with advertising features and Google signals disabled. The site does not need analytics to
        work. Parents can also use browser controls and content blockers.
      </p>
    ),
  },
  {
    id: "ai",
    title: "No open AI chat",
    body: (
      <p>
        Lessons are local games and scripted explanations. Typing in a lesson does not send text to
        an AI provider. “Check a source” uses a small shelf of facts written for the lesson.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Parents’ choices",
    body: (
      <p>
        Because we don’t hold a child’s personal information on a server, there is no profile to
        review or delete. To remove on-device settings, clear this site’s data in the browser.
        Questions about this notice can go to the email above. This notice was written for the first
        public version of the site.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <article className="policy">
      <p className="kicker">For families</p>
      <h1 className="mt-2 font-bold">Privacy</h1>
      <p className="policy-kid">
        In kid words: we don’t ask your name. We don’t ask your email. We don’t show ads. We don’t
        have a chat with a live AI. If a parent types an email, it only opens their mail app. We
        don’t keep it.
      </p>
      {SECTIONS.map((section, index) => (
        <section key={section.id} className="policy-block" aria-labelledby={section.id}>
          <span className="policy-num">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2 id={section.id} className="font-bold">
              {section.title}
            </h2>
            <div className="mt-2">{section.body}</div>
          </div>
        </section>
      ))}
    </article>
  );
}

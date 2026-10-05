import type { Metadata } from "next";
import { NICK, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Nick Castro",
  description:
    "How AI Works for Kids is a free teaching site by Nick Castro in Chicago, built as a portfolio piece for AI enablement and training.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nick Castro",
    description: "Nick Castro in Chicago builds tools that explain AI in plain language.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-sm font-extrabold tracking-wide text-accent uppercase">{NICK.city}</p>
      <h1 className="mt-2 font-display text-5xl font-bold">About {NICK.name}</h1>
      <p className="mt-4 text-lg">
        {NICK.name} builds websites and tools people actually use. {SITE_NAME} is his sample of AI
        enablement for families: concrete games, honest limits, and language that fits the learner.
      </p>
      <p className="mt-3">
        He lives in {NICK.city}. His sons Nathan (8) and Nolan (11) are the test users for this site.
        He also co-wrote The Smart Soccer Ball Mystery with Nancy Castro, a picture book about what
        happens when a model learns from bad examples.
      </p>
      <p className="mt-3">
        The lessons here stay free. They are not a chatbot, and they do not collect a child’s name
        or email. For work — training, enablement, or a site that has to make sense to a real
        audience — start at his portfolio.
      </p>
      <ul className="mt-6 grid gap-3">
        <li>
          <a className="btn btn-primary" href={NICK.site}>
            nickcastrobuilds.com
          </a>
        </li>
        <li>
          <a className="btn btn-ghost" href={NICK.linkedin}>
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}

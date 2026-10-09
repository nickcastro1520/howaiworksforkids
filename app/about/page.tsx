import type { Metadata } from "next";
import { Pip } from "@/components/Pip";
import { NICK, SITE_NAME } from "@/lib/site";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "About Nick Castro, Creator",
  description: `${SITE_NAME} is a free AI-literacy site for kids ages 6–10, made by Nick Castro in Chicago, who builds tools that explain AI in plain language.`,
  path: "/about",
  ogKey: "about",
  ogAlt: ogAlt("about"),
});

export default function AboutPage() {
  return (
    <div className="about">
      <div className="wrap about-inner">
        <div className="about-card">
          <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
          <p className="small-cap">Who made this</p>
          <h1 className="page-title">Hi, I&rsquo;m {NICK.name}.</h1>
          <p className="about-lead">
            I build websites and tools that make AI make sense to real people. {SITE_NAME} is how I explain AI to the toughest audience
            there is: kids.
          </p>
          <p>
            I live in {NICK.city}. Every lesson is tested with my sons: Nathan, 8, and Nolan, 11, our older tester, who checks whether things are too easy or confusing. I also co-wrote <i>The Smart
            Soccer Ball Mystery</i> with Nancy Castro, a picture book about what happens when a model learns from bad examples.
          </p>
          <p>
            The idea behind this site is the same one I use when I train grown-ups: don&rsquo;t just describe AI, let people poke at it.
            Teach it something. Watch it guess. Catch it being wrong. Then talk about what happened.
          </p>
          <p className="muted">
            The lessons are free. There are no ads, no accounts, and no chatbot. For AI training, enablement, or a site that has to make
            sense to a real audience, start at my portfolio.
          </p>
          <div className="about-links">
            <a className="btn btn-big btn-go" href={NICK.site}>
              nickcastrobuilds.com
            </a>
            <a className="btn btn-big btn-plain" href={NICK.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="about-art" aria-hidden="true">
          <Pip mood="proud" size={220} lights={7} wave />
        </div>
      </div>
    </div>
  );
}

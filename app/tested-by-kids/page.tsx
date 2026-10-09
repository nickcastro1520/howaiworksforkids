import type { Metadata } from "next";
import Link from "next/link";
import { ogAlt } from "@/lib/og";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TesterCards } from "@/components/TesterCards";

export const metadata: Metadata = pageMeta({
  title: "Tested by Real Kids",
  description: "Pip's AI lessons for ages 6–10 are tested with Nathan, 8, and Nolan, 11 (our older tester). Read what they really said. We never invent kid quotes.",
  path: "/tested-by-kids",
  ogKey: "tested-by-kids",
  ogAlt: ogAlt("tested-by-kids"),
});

export default function TestedPage() {
  return (
    <div className="wrap tested">
      <Breadcrumbs items={[{ name: "Tested by kids", path: "/tested-by-kids" }]} />
      <p className="small-cap">Our testers</p>
      <h1 className="page-title">Tested by real kids.</h1>
      <p className="page-lead">
        Tested with Nathan and Nolan. The lessons are made for ages 6&ndash;10. Nathan, 8, plays every lesson. Nolan, 11, is our older
        tester: he checks whether things are too easy or confusing. When something is confusing or boring, it gets fixed.
      </p>
      <TesterCards />
      <h2 className="section-title">How we test</h2>
      <ul className="rules">
        <li>Each kid plays a lesson start to finish, with a grown-up nearby.</li>
        <li>We watch for spots where they get stuck, bored, or need help reading.</li>
        <li>We fix those spots, then they play it again.</li>
      </ul>
      <h2 className="section-title">Our rules for kid notes</h2>
      <ul className="rules">
        <li>We never make up quotes, ratings, or stories.</li>
        <li>A note only goes up with a parent&rsquo;s okay. Nathan and Nolan&rsquo;s notes were shared by their dad, Nick.</li>
        <li>First names and ages only. No last names, schools, photos, or contact info.</li>
        <li>There&rsquo;s no form here on purpose. We don&rsquo;t collect anything from kids.</li>
      </ul>
      <p>
        <Link className="text-link" href="/parents">
          Notes for parents and teachers &rarr;
        </Link>
      </p>
    </div>
  );
}

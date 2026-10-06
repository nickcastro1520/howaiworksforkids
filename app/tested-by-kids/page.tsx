import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tested by real kids",
  description: "Nathan (8) and Nolan (11) are testing every lesson. Real notes will be added here. We never invent kid quotes.",
  alternates: { canonical: "/tested-by-kids" },
  openGraph: { title: "Tested by real kids", url: "/tested-by-kids" },
};

export default function TestedPage() {
  return (
    <div className="wrap tested">
      <p className="small-cap">Test pilots</p>
      <h1 className="page-title">Tested by real kids.</h1>
      <p className="page-lead">
        Nathan (8) and Nolan (11) are trying every lesson. When something is confusing or boring, it gets fixed. Their real notes will go
        here.
      </p>
      <div className="tester-row">
        {[
          { name: "Nathan", age: 8, color: "#2a7de1" },
          { name: "Nolan", age: 11, color: "#23914a" },
        ].map((t) => (
          <div key={t.name} className="tester" style={{ "--tc": t.color } as React.CSSProperties}>
            <span className="tester-badge">Test pilot</span>
            <p className="tester-name">
              {t.name}, <span>age {t.age}</span>
            </p>
            <p className="tester-note">Notes coming soon.</p>
          </div>
        ))}
      </div>
      <h2 className="section-title">Our rules for kid notes</h2>
      <ul className="rules">
        <li>We never make up quotes, ratings, or stories.</li>
        <li>A note only goes up with a parent&rsquo;s okay.</li>
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

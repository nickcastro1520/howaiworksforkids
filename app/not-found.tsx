import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { Pip } from "@/components/Pip";

export const metadata: Metadata = {
  title: "Page not found",
  description: `Pip can't find that page. Try the lesson trail or jump straight to one of the ${LESSONS.length} free AI lessons for kids.`,
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="wrap center lost">
      <Pip mood="oops" size={170} />
      <h1 className="page-title">Oops! Pip can&rsquo;t find that page.</h1>
      <p className="page-lead">Even AI gets lost sometimes.</p>
      <Link href="/lessons" className="btn btn-huge btn-go">
        Go to the lesson trail
      </Link>
      <nav aria-label="Popular pages" className="lost-links">
        <h2 className="lost-title">Or jump to a lesson:</h2>
        <ul>
          {LESSONS.map((l) => (
            <li key={l.slug}>
              <Link href={`/lessons/${l.slug}`}>
                {l.number}. {l.short}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/glossary">Word Book</Link>
          </li>
          <li>
            <Link href="/parents">Parents &amp; Teachers</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

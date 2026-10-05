import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tested by real kids",
  description:
    "Placeholder for notes from real kid test sessions. Nathan (8) and Nolan (11) are the test users. This page does not invent quotes.",
  alternates: { canonical: "/tested-by-kids" },
  openGraph: {
    title: "Tested by real kids",
    description: "A placeholder for real test notes. No invented kid quotes.",
    url: "/tested-by-kids",
  },
};

export default function TestedPage() {
  return (
    <article className="notebook">
      <p className="kicker">Case notes</p>
      <h1 className="mt-2 font-bold">
        Tested by real kids. <em>Notes come later.</em>
      </h1>
      <p className="mt-4 text-lg">
        Nathan (8) and Nolan (11) are the first test users. Real notes from them will go here after
        they try the lessons.
      </p>
      <div className="roster">
        <div className="seat">
          <b>Nathan</b>
          <span className="text-sm font-extrabold text-muted">Age 8 · seat open</span>
        </div>
        <div className="seat">
          <b>Nolan</b>
          <span className="text-sm font-extrabold text-muted">Age 11 · seat open</span>
        </div>
      </div>
      <div className="ruled" aria-hidden="true" />
      <h2 className="mt-6 font-display text-3xl font-bold">No quotes yet</h2>
      <p className="mt-2">
        This page will not invent kid quotes, star ratings, or stories about what they said. When a
        note is added, it will be something a kid actually said, with a parent’s okay, and it will
        not include a last name, school, photo, or contact info.
      </p>
      <p className="mt-3 text-muted">
        There is no form here on purpose. We are not collecting a child’s name or email.
      </p>
      <p className="mt-6">
        <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/parents">
          Notes for parents and teachers
        </Link>
      </p>
    </article>
  );
}

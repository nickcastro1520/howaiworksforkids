"use client";

import Link from "next/link";
import { useState } from "react";
import { nextLesson, type Lesson } from "@/lib/lessons";
import { absoluteUrl } from "@/lib/site";
export function ShareCard({ lesson }: { lesson: Lesson }) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailNote, setEmailNote] = useState("");
  const url = absoluteUrl(`/lessons/${lesson.slug}`);
  const text = `I finished “${lesson.title}” on How AI Works for Kids. ${lesson.shareLine} ${url}`;
  const upcoming = nextLesson(lesson.slug);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
      setEmailNote("Copy didn’t work in this browser. The link is selected in the address bar if you open the lesson.");
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: lesson.title, text, url });
        return;
      } catch {
        return;
      }
    }
    await copyLink();
  }

  function tellParent(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailNote("Type a parent or guardian email like name@example.com.");
      return;
    }
    const subject = `Lesson to try together: ${lesson.title}`;
    const body = [
      "Hello,",
      "",
      "A lesson from How AI Works for Kids is ready to look at together:",
      "",
      lesson.title,
      url,
      "",
      "This note was opened in your email app. The website did not save this email address.",
      "No child name or child email was collected.",
      "",
      "— How AI Works for Kids",
    ].join("\n");
    window.location.href = `mailto:${encodeURIComponent(trimmed)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmail("");
    setEmailNote("Your email app should open. This site did not save the address.");
  }

  return (
    <section id="finish-card" className="finish-banner" aria-labelledby="finish-title">
      <p className="kicker">You finished</p>
      <h2 id="finish-title" className="mt-1 font-display text-4xl font-bold">
        {lesson.title}
      </h2>
      <p className="mt-3 text-lg">{lesson.takeaway}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button type="button" className="btn btn-primary" onClick={copyLink}>
          {copied ? "Link copied" : "Copy link"}
        </button>
        <button type="button" className="btn btn-sun" onClick={share}>
          Share
        </button>
      </div>
      {upcoming ? (
        <p className="mt-4">
          <Link className="font-extrabold underline decoration-2 underline-offset-4" href={`/lessons/${upcoming.slug}`}>
            Next: {upcoming.title}
          </Link>
        </p>
      ) : (
        <p className="mt-4">
          <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/lessons">
            Back to all lessons
          </Link>
        </p>
      )}

      <form className="mt-6 border-t-2 border-ink pt-4" onSubmit={tellParent}>
        <h3 className="font-display text-2xl font-bold">Tell a parent</h3>
        <p className="mt-1 text-sm text-muted">
          Optional. Parent or guardian email only. This opens the email app on this device. We do not
          save the address, and we never ask for a kid’s name or email.
        </p>
        <label className="mt-3 block font-extrabold" htmlFor="parent-email">
          Parent or guardian email
        </label>
        <input
          id="parent-email"
          className="field mt-1"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
        />
        <button type="submit" className="btn btn-ghost mt-3">
          Open email
        </button>
        <p className="mt-2 text-sm" role="status">
          {emailNote}
        </p>
      </form>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { SECTIONS, SECTION_1, numberWord } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { SITE_URL } from "@/lib/site";
import { Badge } from "./Badge";
import { Confetti } from "./Confetti";
import { Pip } from "./Pip";

export function Certificate() {
  const { isDone } = useProgress();
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const LESSONS = SECTION_1;
  const total = LESSONS.length;
  const n = LESSONS.filter((l) => isDone(l.slug)).length;
  const all = n === total;
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (!all) {
    const next = LESSONS.find((l) => !isDone(l.slug))!;
    return (
      <div className="finish-locked">
        <Pip mood="think" size={150} lights={n} />
        <h1 className="page-title">Almost there!</h1>
        <p className="page-lead">
          Pip has <b>{n} of {total}</b> lights on. Finish all {total} Section 1 lessons to unlock your certificate.
        </p>
        <div className="finish-badges">
          {LESSONS.map((l) => (
            <Badge key={l.slug} lesson={l} size={74} earned={isDone(l.slug)} />
          ))}
        </div>
        <Link href={`/lessons/${next.slug}`} className="btn btn-huge btn-go">
          Next: {next.title} &rarr;
        </Link>
      </div>
    );
  }

  const subject = "I finished How AI Works for Kids!";
  const body = `I finished all ${numberWord(total)} Section 1 lessons on How AI Works for Kids and taught Pip how AI works!\n\nAsk me:\n- How does AI learn?\n- How does a chatbot write?\n- What should I do if AI says something weird?\n\n${SITE_URL}`;

  return (
    <div className="finish">
      <Confetti count={90} />
      <h1 className="page-title center">You did it!</h1>
      <p className="page-lead center">All {numberWord(total)} Section 1 lights are on. You taught Pip the basics!</p>

      <div className="cert-tools no-print">
        <label className="field">
          <span>Your first name or nickname (it stays on this screen)</span>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value.slice(0, 24))}
            placeholder="Type it here"
            autoComplete="off"
            maxLength={24}
          />
        </label>
      </div>

      <div className="cert" id="certificate">
        <div className="cert-border">
          <p className="cert-kicker">Certificate of AI Know-How</p>
          <p className="cert-this">{SECTIONS[1].kicker}: {SECTIONS[1].name}</p>
          <p className="cert-this">This shows that</p>
          <p className="cert-name">{nick.trim() || "A Super Teacher"}</p>
          <p className="cert-text">taught Pip, a tiny AI, and learned how real AI works.</p>
          <div className="cert-row">
            <Pip mood="proud" size={110} lights={total} bob={false} />
            <ul className="cert-list">
              {LESSONS.map((l) => (
                <li key={l.slug}>
                  <span style={{ background: l.color }} aria-hidden="true" /> {l.badge}
                </li>
              ))}
            </ul>
          </div>
          <div className="cert-foot">
            <span>{today}</span>
            <span>howaiworksforkids.com</span>
          </div>
        </div>
      </div>

      <div className="finish-actions no-print">
        <button type="button" className="btn btn-big btn-go" onClick={() => window.print()}>
          Print my certificate
        </button>
        <Link href={SECTIONS[2].path} className="btn btn-big btn-sun">
          Next: {SECTIONS[2].kicker}, {SECTIONS[2].name} &rarr;
        </Link>
        <Link href="/glossary" className="btn btn-plain">
          Visit Pip&rsquo;s Word Book
        </Link>
      </div>

      <section className="tell-grownup no-print" aria-labelledby="tell">
        <h2 id="tell">Tell a grown-up</h2>
        <p>
          This opens the email app on this device with a note about what you learned. We don&rsquo;t see or save the address. A grown-up can
          type theirs, or leave it blank and fill it in later.
        </p>
        <form
          className="tell-form"
          onSubmit={(e) => {
            e.preventDefault();
            const to = email.trim();
            window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setEmail("");
          }}
        >
          <label className="field">
            <span>Grown-up&rsquo;s email (optional)</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="grown-up@example.com" />
          </label>
          <button type="submit" className="btn btn-sun">
            Open email app
          </button>
        </form>
      </section>
    </div>
  );
}

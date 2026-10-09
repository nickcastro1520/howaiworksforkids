"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

function printNote() {
  const html = document.documentElement;
  html.classList.add("print-note");
  const done = () => {
    html.classList.remove("print-note");
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
  window.setTimeout(done, 1500);
}

/**
 * "Tell a grown-up": opens the device's email app with a short note (mailto:).
 * The address is never stored or sent anywhere by this site; the field clears after use.
 * No mail app? The same note is on screen with Copy and Print buttons.
 */
export function TellGrownup({ subject, body, intro }: { subject: string; body: string; intro?: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <section className="tell-grownup no-print" aria-labelledby="tell">
      <h2 id="tell">Tell a grown-up</h2>
      <p>
        {intro ?? "Send a grown-up a note about what you learned."} This opens the email app on this device. We don&rsquo;t see or save the
        address. A grown-up can type theirs, or leave it blank and fill it in later.
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
      <div className="grownup-note-wrap">
        <p className="small-cap">No email app? Here&rsquo;s the note:</p>
        <pre className="grownup-note" id="grownup-note" tabIndex={0} aria-label="The note for a grown-up">
          {`${subject}\n\n${body}`}
        </pre>
        <div className="grownup-note-actions">
          <button
            type="button"
            className="btn btn-plain"
            onClick={async () => {
              const ok = await copyText(`${subject}\n\n${body}`);
              setCopied(ok ? "ok" : "fail");
              window.setTimeout(() => setCopied("idle"), 2500);
            }}
          >
            <span aria-hidden="true">{copied === "ok" ? "✅" : "📋"}</span> {copied === "ok" ? "Copied!" : "Copy note"}
          </button>
          <button type="button" className="btn btn-plain" onClick={printNote}>
            <span aria-hidden="true">🖨️</span> Print note
          </button>
          <span className="sr-only" aria-live="polite">
            {copied === "ok" ? "Note copied." : copied === "fail" ? "Couldn't copy. You can print the note instead." : ""}
          </span>
        </div>
      </div>
    </section>
  );
}

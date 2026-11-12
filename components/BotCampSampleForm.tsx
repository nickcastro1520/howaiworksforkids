"use client";

import { useState, type FormEvent } from "react";

type Props = { ready: boolean };

export function BotCampSampleForm({ ready }: Props) {
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [newLessons, setNewLessons] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/bot-camp/sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, grade, newLessons }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; message?: string };
      if (res.ok && data.ok) {
        setStatus("done");
        return;
      }
      setStatus("error");
      setError(data.message || "Something went wrong. Please try again in a moment.");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <div className="bc-sample-done" role="status">
        <p>
          Check your inbox. Your lesson is on its way. While you wait, try the station your students will use:{" "}
          <a href="/bot-camp#doodle">Doodle Brain</a>.
        </p>
      </div>
    );
  }

  const disabled = !ready || status === "sending";

  return (
    <>
      {!ready ? (
        <div className="bc-sample-soon">
          <p>
            Sign-up is coming soon. We&rsquo;re connecting the mailbox that will send you the Doodle Brain lesson. Please
            check back in a bit.
          </p>
        </div>
      ) : null}
    <form className="bc-sample-form" onSubmit={onSubmit} noValidate>
      <label className="field">
        Where should we send it?
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={disabled}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="field">
        What grade do you teach?
        <input
          type="text"
          name="grade"
          autoComplete="off"
          disabled={disabled}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </label>
      <label className="bc-sample-check">
        <input type="checkbox" name="newLessons" checked={newLessons} disabled={disabled} onChange={(e) => setNewLessons(e.target.checked)} />
        Email me when new lessons come out
      </label>
      <button className="btn btn-big btn-sun" type="submit" disabled={disabled}>
        {status === "sending" ? "Sending…" : "Send me the lesson"}
      </button>
      <p className="bc-sample-fine">
        No spam. One email with your lesson, and new lessons only if you ticked the box. Unsubscribe any time.
      </p>
      {status === "error" && error ? (
        <p className="bc-sample-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
    </>
  );
}

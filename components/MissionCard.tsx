"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";
import type { Mission } from "@/lib/lessons";
import { SayButton, SayLine } from "./Speak";

function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <>
      <button
        type="button"
        className="btn btn-plain mission-copy"
        onClick={async () => {
          const ok = await copyText(text);
          setState(ok ? "ok" : "fail");
          window.setTimeout(() => setState("idle"), 2500);
        }}
      >
        <span aria-hidden="true">{state === "ok" ? "✅" : "📋"}</span> {state === "ok" ? "Copied!" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "ok" ? "Prompt copied." : state === "fail" ? "Couldn't copy. A grown-up can type it instead." : ""}
      </span>
    </>
  );
}

/**
 * "Try it with a grown-up": an optional mission shown AFTER the badge. It never blocks anything.
 * The site never talks to an AI. A grown-up types the prompt on their own AI account.
 */
export function MissionCard({ mission, color }: { mission: Mission; color: string }) {
  const checkText = `Check it together. ${mission.check.join(" ")}`;
  return (
    <aside className="mission" aria-labelledby="mission-title" style={{ "--mc": color } as React.CSSProperties}>
      <p className="mission-tag">
        <span aria-hidden="true">🧑‍🤝‍🧑</span> Optional &middot; Try it with a grown-up
      </p>
      <h2 id="mission-title" className="mission-title">
        Grown-up mission
      </h2>
      <div className="mission-intro">
        <p>{mission.intro}</p>
        <SayLine text={`${mission.intro} ${mission.before ?? ""}`} label="the mission" size="md" />
      </div>
      <p className="mission-who">
        <span aria-hidden="true">⌨️</span> A grown-up types the prompt on <b>their own</b> AI account, in an AI app they already use. This
        site never talks to an AI.
      </p>
      {mission.before && (
        <p className="mission-before">
          <span aria-hidden="true">📸</span> <b>First:</b> {mission.before}
        </p>
      )}
      {mission.prompts.map((p, i) => (
        <figure key={i} className="mission-prompt">
          <figcaption>
            {mission.prompts.length > 1 && <span className="mission-step">{i + 1}</span>}
            {p.label}:
          </figcaption>
          <blockquote>
            <p>{p.text}</p>
          </blockquote>
          <div className="mission-btns">
            <SayButton text={p.text} label={`it: ${p.label.toLowerCase()}`} size="md" className="mission-hear">
              Hear it
            </SayButton>
            <CopyButton text={p.text} />
          </div>
        </figure>
      ))}
      <div className="mission-check">
        <div className="mission-check-head">
          <h3>
            <span aria-hidden="true">🔍</span> Check it together
          </h3>
          <SayLine text={checkText} label="the check list" />
        </div>
        <ul>
          {mission.check.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <details className="mission-grownups">
        <summary>For grown-ups</summary>
        <ul>
          <li>Use your own account and stay with your child. Many AI services have a minimum age in their terms.</li>
          <li>Read the answer yourself first. Real AI answers are unpredictable and can be wrong.</li>
          <li>Don&rsquo;t type names, school, address, or other private details, and don&rsquo;t upload photos of people.</li>
          <li>We don&rsquo;t link to or recommend any AI product. This mission is optional. Skipping it is fine, and the badge is already earned.</li>
        </ul>
      </details>
    </aside>
  );
}

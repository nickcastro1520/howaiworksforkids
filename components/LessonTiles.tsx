"use client";

import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { Bird, Fish, Glorb } from "./art/Bits";
import { Computer, Hand6, Shield } from "./art/Props";

function Mini({ slug }: { slug: string }) {
  switch (slug) {
    case "what-is-ai":
      return <Computer size={170} />;
    case "learning-from-examples":
      return (
        <span className="mini-row">
          <Glorb g={{ color: "teal", eyes: 2, top: "antenna", spots: false, shape: "round" }} size={86} className="hop" />
          <Glorb g={{ color: "orange", eyes: 1, top: "horns", spots: true, shape: "tall" }} size={96} className="hop delay-1" />
          <Glorb g={{ color: "teal", eyes: 3, top: "horns", spots: true, shape: "tall" }} size={80} className="hop delay-2" />
        </span>
      );
    case "guess-the-next-word":
      return (
        <span className="mini-words">
          <span>Once</span>
          <span>upon</span>
          <span>a</span>
          <span className="is-next">time</span>
        </span>
      );
    case "sneaky-clues":
      return (
        <span className="mini-row">
          <Fish color="red" size={84} />
          <span className="mini-q">bird?</span>
        </span>
      );
    case "ai-can-be-wrong":
      return (
        <span className="mini-row">
          <span className="ff-card ff-fact small">FACT</span>
          <span className="ff-card ff-fib small">FIB</span>
        </span>
      );
    case "real-or-made-up":
      return <Hand6 size={110} />;
    default:
      return (
        <span className="mini-row">
          <Shield size={92} />
          <Bird color="yellow" size={70} />
        </span>
      );
  }
}

export function LessonTiles() {
  const { isDone } = useProgress();
  return (
    <div className="bento">
      {LESSONS.map((l) => (
        <Link
          key={l.slug}
          href={`/lessons/${l.slug}`}
          className={`tile tile-${l.number}`}
          style={{ "--lc": l.color, "--lt": l.tint } as React.CSSProperties}
        >
          <span className="tile-top">
            <span className="tile-n">{l.number}</span>
            {isDone(l.slug) && <span className="tile-done">Done &#10003;</span>}
          </span>
          <span className="tile-art" aria-hidden="true">
            <Mini slug={l.slug} />
          </span>
          <span className="tile-title">{l.title}</span>
          <span className="tile-game">
            Game: <b>{l.game}</b>
          </span>
        </Link>
      ))}
    </div>
  );
}

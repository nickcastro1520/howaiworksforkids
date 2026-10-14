import Link from "next/link";
import { BONUS_FOR_SECTION } from "@/lib/bonus";
import type { SectionId } from "@/lib/lessons";

/** "Bonus game" card, shown on each trail and on the section-end badge screen. */
export function BonusLink({ section, className = "" }: { section: SectionId; className?: string }) {
  const g = BONUS_FOR_SECTION[section];
  return (
    <Link href={g.path} className={`bonus-link ${className}`}>
      <span className="bonus-link-emoji" aria-hidden="true">
        {g.emoji}
      </span>
      <span>
        <small>Bonus game &middot; play any time</small>
        <b>{g.title}</b>
        <span className="bonus-link-blurb">{g.blurb}</span>
      </span>
      <span aria-hidden="true" className="bonus-link-go">
        &rarr;
      </span>
    </Link>
  );
}

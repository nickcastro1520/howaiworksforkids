import Link from "next/link";
import { SECTIONS, sectionLessons, type SectionId } from "@/lib/lessons";

/** Two tabs that switch between the Section 1 and Section 2 trails. */
export function SectionTabs({ current }: { current: SectionId }) {
  return (
    <nav className="section-tabs" aria-label="Sections">
      {([1, 2] as const).map((id) => {
        const s = SECTIONS[id];
        const live = sectionLessons(id);
        const on = id === current;
        return (
          <Link key={id} href={s.path} className={`section-tab ${on ? "is-on" : ""}`} aria-current={on ? "page" : undefined}>
            <small>{s.kicker}</small>
            <b>{s.name}</b>
            <span>
              Lessons {live[0].number}&ndash;{live[0].number + s.planned - 1}
              {s.planned > live.length && <> &middot; {live.length} ready now</>}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

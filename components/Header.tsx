"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, getLesson, sectionLessons, type SectionId } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { LogoMark } from "./Logo";

const NAV = [
  { href: "/lessons", label: "Lessons" },
  { href: "/glossary", label: "Word Book" },
  { href: "/parents", label: "Grown-ups" },
];

export function Header() {
  const path = usePathname();
  const { done } = useProgress();
  // The pill follows the section you're in (Section 1 everywhere else).
  const slug = path?.startsWith("/lessons/") ? path.slice("/lessons/".length) : "";
  const section: SectionId = slug === "section-2" || getLesson(slug)?.section === 2 ? 2 : 1;
  const info = SECTIONS[section];
  const slots = info.planned;
  const n = sectionLessons(section).filter((l) => done.includes(l.slug)).length;
  return (
    <header className="site-header">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="How AI Works for Kids, home">
          <LogoMark size={42} />
          <span className="brand-text">
            How AI Works
            <small>for Kids</small>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={path?.startsWith(item.href) ? "is-on" : ""} aria-current={path?.startsWith(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={info.path} className="brain-pill">
          <span className="brain-dots" aria-hidden="true">
            {Array.from({ length: slots }).map((_, i) => (
              <i key={i} className={i < n ? "on" : ""} />
            ))}
          </span>
          <span className="brain-n">
            {section === 2 && <span className="brain-sec">S2 </span>}
            {n}/{slots}
          </span>
          <span className="sr-only">: Pip&rsquo;s brain lights on in {info.kicker}</span>
        </Link>
      </div>
    </header>
  );
}

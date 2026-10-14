"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { countDone } from "@/lib/journey";
import { LESSONS } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { LogoMark } from "./Logo";
import { SoundToggle } from "./SoundToggle";

const NAV = [
  { href: "/lessons", label: "Lessons" },
  { href: "/glossary", label: "Word Book" },
  { href: "/parents", label: "Grown-ups" },
];

export function Header() {
  const path = usePathname();
  const { done } = useProgress();
  // Same source and count as the badge shelf ("X of 15"): every lesson in the course.
  const n = countDone(done);
  const total = LESSONS.length;
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
        <SoundToggle />
        <Link href="/lessons" className="brain-pill" aria-label={`${n} of ${total} lessons done. See all lessons.`}>
          <span className="brain-dots" aria-hidden="true">
            {Array.from({ length: total }).map((_, i) => (
              <i key={i} className={i < n ? "on" : ""} />
            ))}
          </span>
          <span className="brain-n" aria-hidden="true">
            {n}/{total} <span className="brain-word">lessons</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

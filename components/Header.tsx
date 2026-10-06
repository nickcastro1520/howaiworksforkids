"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const n = Math.min(done.length, 7);
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
        <Link href="/lessons" className="brain-pill" aria-label={`Pip's brain: ${n} of 7 lights on`}>
          <span className="brain-dots" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <i key={i} className={i < n ? "on" : ""} />
            ))}
          </span>
          <span className="brain-n">{n}/7</span>
        </Link>
      </div>
    </header>
  );
}

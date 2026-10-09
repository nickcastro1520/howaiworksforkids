import Link from "next/link";
import { NICK } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <LogoMark size={46} />
          <div>
            <p className="footer-title">How AI Works for Kids</p>
            <p className="footer-promise">No ads. No accounts. No chatbot. Core lessons are free, always.</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/lessons">Lessons</Link>
          <Link href="/glossary">Word Book</Link>
          <Link href="/finish">Certificate</Link>
          <Link href="/parents">Parents &amp; Teachers</Link>
          <Link href="/teachers">Teacher kit</Link>
          <Link href="/tested-by-kids">Tested by kids</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <p className="footer-small">
          Made in {NICK.city} by <a href={NICK.site}>{NICK.name}</a>. Ages 6&ndash;10.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { NICK, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-rule" />
      <div className="footer-inner">
        <div>
          <p className="footer-word">{SITE_NAME}</p>
          <p className="mt-3 max-w-sm text-muted">
            No ads. No accounts. No live AI chat. Built by {NICK.name} in {NICK.city}.
          </p>
        </div>
        <nav aria-label="Footer" className="footer-links">
          <Link href="/lessons">Lessons</Link>
          <Link href="/parents">Parents</Link>
          <Link href="/about">About</Link>
          <Link href="/tested-by-kids">Tested by kids</Link>
          <Link href="/privacy">Privacy</Link>
          <a href={NICK.site}>Portfolio</a>
        </nav>
      </div>
    </footer>
  );
}

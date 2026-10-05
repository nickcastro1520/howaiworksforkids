import Link from "next/link";
import { NICK, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-ink">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-bold">{SITE_NAME}</p>
          <p className="mt-2 max-w-sm text-muted">
            No ads. No accounts. No live AI chat. Built by {NICK.name} in {NICK.city}.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 font-extrabold">
          <Link className="underline decoration-2 underline-offset-4" href="/lessons">
            Lessons
          </Link>
          <Link className="underline decoration-2 underline-offset-4" href="/parents">
            For parents and teachers
          </Link>
          <Link className="underline decoration-2 underline-offset-4" href="/about">
            About {NICK.name}
          </Link>
          <Link className="underline decoration-2 underline-offset-4" href="/tested-by-kids">
            Tested by real kids
          </Link>
          <Link className="underline decoration-2 underline-offset-4" href="/privacy">
            Privacy
          </Link>
          <a className="underline decoration-2 underline-offset-4" href={NICK.site}>
            nickcastrobuilds.com
          </a>
        </nav>
      </div>
    </footer>
  );
}

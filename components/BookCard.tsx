import { BOOK } from "@/lib/site";

/** "Read the book" card for grown-up pages. Renders nothing until BOOK.url is set. */
export function BookCard() {
  if (!BOOK.url) return null;
  return (
    <aside className="book-card" aria-labelledby="book-card-title">
      <svg className="book-card-art" viewBox="0 0 120 150" width="104" height="130" aria-hidden="true">
        <rect x="8" y="6" width="104" height="138" rx="10" fill="#33c4b0" stroke="#231d4f" strokeWidth="4" />
        <rect x="8" y="6" width="16" height="138" rx="6" fill="#1f9e8c" stroke="#231d4f" strokeWidth="4" />
        <circle cx="68" cy="82" r="30" fill="#fff" stroke="#231d4f" strokeWidth="4" />
        <path d="M68 66 l14 10 -5 16 h-18 l-5 -16 z" fill="#231d4f" />
        <path d="M68 52 v14 M82 76 l14 -6 M77 92 l8 14 M59 92 l-8 14 M54 76 l-14 -6" stroke="#231d4f" strokeWidth="3" />
        <rect x="34" y="20" width="68" height="14" rx="7" fill="#ffd34d" stroke="#231d4f" strokeWidth="3" />
      </svg>
      <div className="book-card-body">
        <p className="small-cap">Read the book</p>
        <h2 id="book-card-title" className="book-card-title">
          {BOOK.title}
          <span>{BOOK.subtitle}</span>
        </h2>
        <p>
          A funny picture book for ages 6&ndash;10 about a smart soccer ball that learns from the wrong examples, and the kids who fix it. It
          pairs well with Lessons 2 and 4 here. Written by {BOOK.authors}; Nick also made this site.
        </p>
        <a className="btn btn-big btn-sun" href={BOOK.url} target="_blank" rel="noopener noreferrer">
          See the book on {BOOK.store} <span className="sr-only">(opens in a new tab)</span>
          <span aria-hidden="true"> &#8599;</span>
        </a>
        <p className="book-card-note">The lessons on this site are free and don&rsquo;t require the book.</p>
      </div>
    </aside>
  );
}

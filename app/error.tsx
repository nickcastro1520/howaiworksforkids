"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="quiet-page">
      <p className="kicker">Try again</p>
      <h1 className="mt-2 font-bold">Something bumped the page.</h1>
      <p className="mt-3 text-lg">The lesson didn’t load. You can try again.</p>
      <button type="button" className="btn btn-primary mt-6" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

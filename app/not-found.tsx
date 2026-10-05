import Link from "next/link";

export default function NotFound() {
  return (
    <div className="quiet-page">
      <p className="kicker">404</p>
      <h1 className="mt-2 font-bold">That page isn’t on the map.</h1>
      <p className="mt-3 text-lg">The lessons are still here.</p>
      <Link className="btn btn-primary mt-6" href="/lessons">
        Back to lessons
      </Link>
    </div>
  );
}

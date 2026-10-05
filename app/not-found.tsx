import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl font-bold">That page isn’t on the map</h1>
      <p className="mt-3 text-lg">The lessons are still here.</p>
      <Link className="btn btn-primary mt-6" href="/lessons">
        Back to lessons
      </Link>
    </div>
  );
}

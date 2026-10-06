import Link from "next/link";
import { Pip } from "@/components/Pip";

export default function NotFound() {
  return (
    <div className="wrap center lost">
      <Pip mood="oops" size={170} />
      <h1 className="page-title">Oops! Pip can&rsquo;t find that page.</h1>
      <p className="page-lead">Even AI gets lost sometimes.</p>
      <Link href="/lessons" className="btn btn-huge btn-go">
        Go to the lesson trail
      </Link>
    </div>
  );
}

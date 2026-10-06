"use client";

import { Pip } from "@/components/Pip";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap center lost">
      <Pip mood="oops" size={150} />
      <h1 className="page-title">Uh-oh, something glitched.</h1>
      <button type="button" className="btn btn-huge btn-go" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

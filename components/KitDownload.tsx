"use client";

import { trackEvent } from "@/lib/analytics";
import { KIT } from "@/lib/teacherKit";

/** Download link for the free kit. Sends one anonymous GA event (no personal data) when GA is on. */
export function KitDownload({ className = "btn btn-huge btn-go", location }: { className?: string; location: string }) {
  return (
    <a
      href={KIT.href}
      download={KIT.fileName}
      type="application/pdf"
      className={className}
      onClick={() => trackEvent("teacher_kit_download", { kit: "lesson-1", location })}
    >
      <span aria-hidden="true">⬇️</span>
      <span>
        Download free Lesson 1 kit <span className="kit-btn-meta">(PDF, {KIT.pages} pages)</span>
      </span>
    </a>
  );
}

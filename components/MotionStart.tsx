"use client";

import { useEffect } from "react";

/** Starts the inline-SVG idle animations once the page has loaded and gone idle (see globals.css). */
export function MotionStart() {
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      t = setTimeout(() => document.documentElement.classList.add("anim-on"), 1500);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (t) clearTimeout(t);
    };
  }, []);
  return null;
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The homepage owns a lot of scroll machinery (Hero's pin-hold `park()`
 * writes, ScrollTrigger refresh compensation, rAF/timer tails). On a
 * client-side navigation away from it, one of those writers can land AFTER
 * Next.js's own one-shot scroll-to-top, so the new page appears to open
 * mid-document. Re-assert "start at the top" on every route change: once
 * synchronously in the commit phase, and once after the next two frames to
 * beat any stale write that fires a tick late.
 *
 * The first run is skipped so a hard load (back/forward, refresh) keeps the
 * browser's native scroll restoration.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => window.scrollTo(0, 0));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return null;
}

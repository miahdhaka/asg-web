"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Route that is excluded from scroll restoration — it should always open at
 *  the top (its Hero pin-hold / ScrollTrigger machinery owns the scrollbar). */
const HOME = "/";

/**
 * Scroll behaviour on route change:
 *
 *  • Forward/back (a genuine popstate) — drop the visitor back at the exact
 *    scroll offset they last had on that page. Positions are tracked live per
 *    pathname, so returning from an adjacent page keeps where you left off.
 *  • Any other navigation (clicking a link, etc.) — start the new page at the
 *    top, re-asserted over the next couple of frames so the homepage's late
 *    scroll writers can't leave the new page parked mid-document.
 *
 * The homepage is always pinned to the top on arrival (never restored).
 * The first run is skipped so a hard load / refresh keeps native restoration.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const positions = useRef(new Map<string, number>());
  const currentPath = useRef(pathname);
  const isPop = useRef(false);
  const first = useRef(true);

  // Flag the upcoming route change as a back/forward (history) navigation.
  useEffect(() => {
    const onPopState = () => {
      isPop.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Keep the live scroll offset for the page the user is currently on.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        positions.current.set(currentPath.current, window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // On route change either restore the remembered offset or start at the top.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      currentPath.current = pathname;
      return;
    }

    const restore = isPop.current && pathname !== HOME;
    isPop.current = false;
    const targetY = restore ? positions.current.get(pathname) ?? 0 : 0;

    // Run the reveal/ScrollTrigger machinery for the new page, then re-assert
    // the offset across the next frames + a short tail so late layout (image
    // decode, hero writers, trigger refresh) can't leave us parked wrongly.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => window.scrollTo(0, targetY));
    });
    const tail = setTimeout(() => window.scrollTo(0, targetY), 140);

    currentPath.current = pathname;
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      clearTimeout(tail);
    };
  }, [pathname]);

  return null;
}

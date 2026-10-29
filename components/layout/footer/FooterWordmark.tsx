"use client";

import { useEffect, useRef, useState } from "react";
import "animate.css";

/**
 * Group wordmark in the fixed band that sits BEHIND the footer. It only
 * becomes visible once the opaque footer scrolls up past it, so the zoom-in
 * must fire at that reveal moment — not on page load/reload.
 *
 * We watch the footer's bottom edge: when it rises above the wordmark's own
 * line the text is no longer covered, so we play animate.css `zoomIn`. The
 * flag toggles, so scrolling away and back down plays it again each time.
 */
export default function FooterWordmark() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const check = () => {
      const footer = document.getElementById("site-footer");
      const text = textRef.current;
      if (!footer || !text) return;
      // Uncovered the moment the footer's bottom clears the wordmark line.
      const uncovered = footer.getBoundingClientRect().bottom <= text.getBoundingClientRect().top;
      setShown(uncovered);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <h2
      ref={textRef}
      className={[
        "relative font-archivo-black uppercase leading-[1.05] text-[2rem] text-[#f2f2f0] sm:text-[2.75rem] lg:text-[5rem]",
        shown ? "animate__animated animate__zoomIn" : "opacity-0",
      ].join(" ")}
    >
      Amanat Shah Group
    </h2>
  );
}

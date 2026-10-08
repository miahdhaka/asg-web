"use client";

import { useEffect, useRef, useState } from "react";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "./HistoryTimeline";

gsap.registerPlugin(ScrollTrigger);

type Phase = "hidden" | "in" | "out";

/* Fixed vertical rail — compact, desktop-only. Slides in from the left
   when the timeline section enters the viewport, slides out when leaving.
   Active milestone's year is always visible; others appear on hover. */
export default function HistoryYearNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("hidden");
  const railRef = useRef<HTMLElement>(null);

  /* Track which milestone occupies the viewport centre */
  useEffect(() => {
    const entries =
      document.querySelectorAll<HTMLElement>("[data-milestone]");
    if (!entries.length) return;

    const triggers = Array.from(entries).map((entry, i) =>
      ScrollTrigger.create({
        trigger: entry,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  /* Show / hide the rail based on the timeline section's visibility.
     Uses "top 40%" so the rail only slides in after the hero has
     mostly scrolled out — not on page load. */
  useEffect(() => {
    const section = document.getElementById("history-timeline");
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 40%",
      end: "bottom 75%",
      onEnter: () => setPhase("in"),
      onLeave: () => setPhase("out"),
      onEnterBack: () => setPhase("in"),
      onLeaveBack: () => setPhase("out"),
    });

    return () => st.kill();
  }, []);

  /* After the slide-out animation finishes, fully hide the element */
  const handleAnimationEnd = () => {
    if (phase === "out") setPhase("hidden");
  };

  const scrollTo = (index: number) => {
    const el = document.querySelector(`[data-milestone="${index}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const animClass =
    phase === "in"
      ? "animate__animated animate__slideInLeft"
      : phase === "out"
        ? "animate__animated animate__slideOutLeft"
        : "";

  return (
    <aside
      ref={railRef}
      onAnimationEnd={handleAnimationEnd}
      aria-hidden={phase === "hidden"}
      className={`hidden lg:flex fixed left-[3em] top-1/2 z-30 h-[55vh] w-[7em] -translate-y-1/2 items-center ${animClass}`}
      style={{
        animationDuration: "0.6s",
        visibility: phase === "hidden" ? "hidden" : "visible",
      }}
    >
      <div className="relative flex h-full w-full flex-col items-start justify-between">
        {/* Continuous vertical line — light, uniform */}
        <div
          aria-hidden
          className="absolute left-[5px] top-1 bottom-1 w-[2px] bg-gray-200"
        />

        {milestones.map((m, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={`${m.year}-${i}`}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Jump to ${m.year} — ${m.title}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative z-10 flex cursor-pointer items-center gap-2"
            >
              {/* Dot */}
              <span
                className={`block shrink-0 rounded-full transition-all duration-300 ${
                  isActive
                    ? "size-3 ring-[3px] ring-gray-300/30"
                    : "size-3 border border-gray-300 bg-white group-hover:border-gray-400"
                }`}
                style={isActive ? { background: "var(--primary-gradient)" } : undefined}
              />
              {/* Year label */}
              <span
                className={`whitespace-nowrap font-neue-montreal text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 text-gray-500 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
                style={
                  isActive
                    ? {
                        background: "var(--primary-gradient)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : undefined
                }
              >
                {m.year}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Milestone data ── */
interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const milestones: Milestone[] = [
  {
    year: "1896",
    title: "The Legacy Begins",
    description:
      "Our journey began 130 years ago as a modest family-run workshop. From our founder's vision to today's 3rd generation of leadership, our character remains steadfast.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "The founding workshop, 1896",
  },
];

/* ── Single milestone entry ── */
function MilestoneEntry({ milestone, index }: { milestone: Milestone; index: number }) {
  const entryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const entry = entryRef.current;
      if (!entry) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        });

        // Center dot scales in with a spring
        if (dotRef.current) {
          tl.fromTo(
            dotRef.current,
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.5 },
            0,
          );
        }

        // Vertical line draws from top to bottom
        if (lineRef.current) {
          tl.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            { scaleY: 1, duration: 0.7 },
            0.1,
          );
        }

        // Text block slides up + fades in
        if (textRef.current) {
          tl.fromTo(
            textRef.current,
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            0.2,
          );
        }

        // Image slides up + fades in (slightly delayed)
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { y: 80, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85 },
            0.35,
          );
        }
      }, entry);

      return () => ctx.revert();
    },
    { scope: entryRef },
  );

  return (
    <div
      ref={entryRef}
      className="relative w-full py-16 lg:py-24"
    >
      {/* ── Center vertical gradient line ── */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full opacity-60"
        style={{
          background:
            "linear-gradient(150deg, rgba(139,195,74,0.2) 0%, rgba(26,161,121,0.2) 81%)",
        }}
      />

      {/* ── Center gradient dot ── */}
      <div
        ref={dotRef}
        className="absolute left-1/2 top-16 lg:top-24 -translate-x-1/2 size-3.5 rounded-full z-10 opacity-0"
        style={{
          background:
            "linear-gradient(150deg, rgba(139,195,74,1) 0%, rgba(26,161,121,1) 87%)",
        }}
      />

      {/* ── Two-column content ── */}
      <div className="mx-auto max-w-[76rem] px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Text content */}
          <div ref={textRef} className="flex flex-col gap-4 opacity-0">
            <span className="font-test-tiempos-fine font-medium text-[3rem] sm:text-[3.75rem] leading-[1.167] text-neutral-800">
              {milestone.year}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="font-test-tiempos-fine font-medium text-2xl leading-8 text-neutral-800">
                {milestone.title}
              </h3>
              <p className="text-sm text-neutral-800 font-neue-montreal leading-5 tracking-wide max-w-[25.4375rem]">
                {milestone.description}
              </p>
            </div>
          </div>

          {/* Right — Image */}
          <div
            ref={imageRef}
            className="relative w-full overflow-hidden rounded-sm opacity-0"
            style={{ aspectRatio: "553 / 320" }}
          >
            <Image
              src={milestone.image}
              alt={milestone.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Timeline container ── */
export default function HistoryTimeline() {
  return (
    <section className="w-full bg-white">
      {milestones.map((milestone, i) => (
        <MilestoneEntry key={milestone.year + i} milestone={milestone} index={i} />
      ))}
    </section>
  );
}

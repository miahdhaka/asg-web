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

export const milestones: Milestone[] = [
  {
    year: "1896",
    title: "The first chapter",
    description:
      "The journey began as a family-run workshop, founded by the first generation with a vision of producing quality textiles on traditional looms.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "The founding workshop, 1896",
  },
  {
    year: "1983",
    title: "Where the Legacy Began M/S Helal & Brother Ltd.",
    description:
      "A family-run enterprise takes its first step, architecting the foundation for a legacy spanning generations and industries.",
    image: "/images/our-history/history-milestone-1.avif",
    imageAlt: "Establishment of Helal & Brothers Ltd., 1983",
  },
  {
    year: "1983",
    title: "The birth of Amanat Shah Group- From Family Enterprise to Industrial Ambition",
    description:
      "The journey began as a family-run enterprise, evolving into a structured industrial powerhouse and entering a new era of growth and sustainability.",
    image: "/images/our-history/history-milestone-2.avif",
    imageAlt: "Amanat Shah Group (ASG) inauguration, 1983",
  },
  {
    year: "2004",
    title: "Beginning of Hazrat Amanat Shah Spinning Mills Ltd.",
    description:
      "Established as a backward linkage of ASG to strengthen integrated production for both domestic and export markets.",
    image: "/images/our-history/Hazrat Amanat Shah Spinning Mills Ltd.png",
    imageAlt: "Hazrat Amanat Shah Spinning Mills Ltd. commissioning, 2004",
  },
  {
    year: "2005",
    title: "The Start of Firm2Firm",
    description:
      "Began producing premium-quality tea and exporting it to global markets.",
    image: "/images/our-history/history-milestone-5.avif",
    imageAlt: "Farm2Firm (Baikunthapur Tea Estate) launch, 2005",
  },
  // {
  //   year: "2007",
  //   title: "The Genesis of Nodi Bangla Real Estate",
  //   description:
  //     "Established as a real estate venture for residential and commercial development, driven by a vision for greener living.",
  //   image: "/images/our-history/history-milestone-1.png",
  //   imageAlt: "Nodi Bangla Real Estate inauguration, 2007",
  // },
  {
    year: "2009",
    title: "The Rise of Hazrat Amanat Shah Securities LTD.",
    description:
      "To ensure secure financial operations, expand the capital market, and guide investors toward safer investment opportunities.",
    image: "/images/our-history/Hazrat Amanat Shah Securities Ltd.png",
    imageAlt: "Hazrat Amanat Shah Securities Ltd. launch, 2009",
  },
  {
    year: "2009",
    title: "The Emergence of Celestial Securities Ltd.",
    description:
      "Formed to strengthen the financial sector and foster sustainable market growth for investors and partners.",
    image: "/images/our-history/history-milestone-7.avif",
    imageAlt: "Celestial Securities Limited inauguration, 2009",
  },
  {
    year: "2014",
    title: "The Arrival of Amanaot Shah Weaving Processing Ltd.",
    description:
      "Emerged as a strategic extension of ASG, strengthening integration, quality control, and sustainable value creation through high-end textile finishing",
    image: "/images/our-history/Amanat Shah Weaving Processing Ltd.png",
    imageAlt: "Amanat Shah Weaving Processing Ltd. inauguration, 2014",
  },
  {
    year: "2015",
    title: "The Establishment of Trust Knitwear industries LTD.",
    description:
      "Built to deliver high-performing knitwear through precision craftsmanship at global standards. Creating consistent value and certainty that help brands build customer loyalty and premium positioning. Shaping trends that endure in consumers’ lifestyles.",
    image: "/images/our-history/history-milestone-9.avif",
    imageAlt: "Trust Knitwear Industries Ltd. inauguration, 2015",
  },
  {
    year: "2017",
    title: "Arrival of Amanat Shah Fabrics",
    description:
      "Created to expand production capacity, delivering premium-quality fabrics with technical precision to help clients create greater value at every stage of their brand journey.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "Amanat Shah Fabrics Ltd. inauguration, 2017",
  },
  {
    year: "2019",
    title: "The Establishment of Miah",
    description:
      "Launched a premium lifestyle retail brand to bring a trusted heritage to the modern consumers.",
    image: "/images/our-history/history-milestone-11.avif",
    imageAlt: "Miah inauguration, 2019",
  },
  {
    year: "2019",
    title: "The Creation of ASG Dynamic",
    description:
      "Designed to drive technological efficiency through specialized software solutions, supporting the Group’s digital transformation from root to roof.",
    image: "/images/our-history/ASG Dynamic.png",
    imageAlt: "ASG Dynamic inauguration, 2019",
  },
  {
    year: "2025",
    title: "A Legacy Takes Root of Amanat Shah Tex Solution",
    description:
      "Developed to empower textile manufacturing with advanced, specialized, and sustainable chemical formulations for innovative production.",
    image: "/images/our-history/history-milestone-13.avif",
    imageAlt: "Amanat Shah Tex Solution inauguration, 2025",
  },
];

/* ── Single milestone entry ── */
function MilestoneEntry({ milestone, index }: { milestone: Milestone; index: number }) {
  const entryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

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
      data-entry={index}
      data-milestone={index}
      className="relative w-full pt-12 sm:pt-16 lg:pt-24 sm:pb-16 lg:pb-24"
    >
      {/* ── Center gradient dot ── */}
      <div
        ref={dotRef}
        data-dot={index}
        className="absolute left-[12.5px] top-18 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 size-2.5 lg:size-3.5 rounded-full z-10 opacity-0"
        style={{
          background: "var(--primary-gradient)",
        }}
      />

      {/* ── Two-column content — alternates text/image sides ── */}
      <div className="mx-auto max-w-[115rem] pl-8 pr-4 lg:pl-20 lg:pr-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-[12rem] items-center">
          {/* Text block */}
          <div
            ref={textRef}
            className={`flex flex-col gap-2 lg:gap-4 opacity-0 ${index % 2 !== 0 ? "lg:order-last" : "lg:justify-self-end"}`}
          >
            <span className="font-archivo-black font-medium text-[2.75rem] sm:text-[5rem] leading-[1.167] text-neutral-800">
              {milestone.year}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="font-archivo-black font-medium text-xl sm:text-[2rem] leading-8 lg:leading-[1.5] text-neutral-800">
                {milestone.title}
              </h3>
              <p className="text-sm text-neutral-800 font-neue-montreal leading-5 tracking-wide max-w-[25.4375rem] lg:max-w-[35rem]">
                {milestone.description}
              </p>
            </div>
          </div>

          {/* Image block */}
          <div
            ref={imageRef}
            className={`relative w-full overflow-hidden rounded-sm opacity-0 ${index % 2 !== 0 ? "lg:order-first" : ""}`}
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
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  /* GSAP line growth — line waits at each dot until the NEXT entry
     scrolls into the viewport, then smoothly animates to that dot. */
  useGSAP(
    () => {
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!section || !line) return;

      const entries = section.querySelectorAll<HTMLElement>("[data-entry]");
      const dots = section.querySelectorAll<HTMLElement>("[data-dot]");
      if (!entries.length || !dots.length) return;

      // Helper: measure dot center relative to section
      const dotCenter = (dot: HTMLElement) => {
        const dotRect = dot.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        return dotRect.top - sectionRect.top + dotRect.height / 2;
      };

      // Defer measurement so layout has fully settled
      setTimeout(() => {
        gsap.set(line, { height: dotCenter(dots[0]), visibility: "visible" });

        for (let i = 1; i < entries.length; i++) {
          ScrollTrigger.create({
            trigger: entries[i],
            start: "top 70%",
            onEnter: () => {
              gsap.to(line, {
                height: dotCenter(dots[i]),
                duration: 1,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            },
            onLeaveBack: () => {
              gsap.to(line, {
                height: dotCenter(dots[i - 1]),
                duration: 1,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            },
          });
        }

        ScrollTrigger.refresh();
      }, 100);
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* ── Continuous centre line — grows dot-by-dot on scroll ── */}
      <div
        ref={lineRef}
        aria-hidden
        className="absolute left-[18px] top-0 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 w-[1px] lg:w-[2px]"
        style={{
          background:
            "linear-gradient(97.37deg, rgba(139, 195, 74, 0.5) 1.29%, rgba(26, 161, 121, 0.5) 88.53%)",
        }}
      />

      {milestones.map((milestone, i) => (
        <MilestoneEntry key={milestone.year + i} milestone={milestone} index={i} />
      ))}
    </section>
  );
}

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
  {
    year: "1983",
    title: "Helal & Brothers Ltd. are born",
    description:
      "A pivotal moment in our expansion. With the establishment of Helal & Brothers Ltd., our endeavor evolved from foundational manufacturing to broader industrial operations, significantly strengthening our market presence and diversifying our operational capabilities.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "Establishment of Helal & Brothers Ltd., 1983",
  },
  {
    year: "1983",
    title: "Amanat Shah Group (ASG) is born",
    description:
      "With the formal inauguration of the Group, our endeavor transitions from a heritage family workshop into a structured, diversified industrial powerhouse, setting the foundation for a new era of growth.",
    image: "/images/about-us/about-hero.png",
    imageAlt: "Amanat Shah Group (ASG) inauguration, 1983",
  },
  {
    year: "2004",
    title: "Hazrat Amanat Shah Spinning Mills Ltd. is born",
    description:
      "With the commissioning of our spinning mills, our endeavor expands into full backward integration, setting a new benchmark for scale and quality.",
    image: "/images/our-history/Hazrat Amanat Shah Spinning Mills Ltd.png",
    imageAlt: "Hazrat Amanat Shah Spinning Mills Ltd. commissioning, 2004",
  },
  {
    year: "2005",
    title: "Farm2Firm (Baikunthapur Tea Estate)",
    description:
      "Standard Lungi produced by M/S Helal& Brothers made it the only Lungi exporter in the country, representing Bangladesh in the KSA, UAE, Malaysia and Indonesia.",
    image: "/images/our-history/Farm2Firm.png",
    imageAlt: "Farm2Firm (Baikunthapur Tea Estate) launch, 2005",
  },
  {
    year: "2007",
    title: "Nodi Bangla Real Estate is born",
    description:
      "With the founding of Nodi Bangla, our endeavor expands into the infrastructure and real estate development sector.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "Nodi Bangla Real Estate inauguration, 2007",
  },
  {
    year: "2009",
    title: "Hazrat Amanat Shah Securities Ltd. is born",
    description:
      "With the launch of this financial entity, our endeavor expands into the capital market, providing strategic investment solutions and expertise.",
    image: "/images/our-history/Hazrat Amanat Shah Securities Ltd.png",
    imageAlt: "Hazrat Amanat Shah Securities Ltd. launch, 2009",
  },
  {
    year: "2009",
    title: "Celestial Securities Limited is born",
    description:
      "With the establishment of this firm, our endeavor further strengthens its footprint in the financial services sector, reinforcing our commitment to professional excellence and market growth.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "Celestial Securities Limited inauguration, 2009",
  },
  {
    year: "2014",
    title: "Amanat Shah Weaving Processing Ltd. is born",
    description:
      "With this dedicated facility, our endeavor enhances textile finishing capabilities, driving superior fabric performance and innovation.",
    image: "/images/our-history/Amanat Shah Weaving Processing Ltd.png",
    imageAlt: "Amanat Shah Weaving Processing Ltd. inauguration, 2014",
  },
  {
    year: "2015",
    title: "Trust Knitwear Industries Ltd. is born",
    description:
      "With the launch of this specialized unit, our endeavor expands into the high-performance knitwear and garments sector, focusing on precision craftsmanship and global standards.",
    image: "/images/our-history/Trust Knitwear Industries Ltd.png",
    imageAlt: "Trust Knitwear Industries Ltd. inauguration, 2015",
  },
  {
    year: "2017",
    title: "Amanat Shah Fabrics Ltd. is born",
    description:
      "With the launch of this unit, our endeavor significantly increases production capacity and technical precision in premium fabric manufacturing.",
    image: "/images/our-history/history-milestone-1.png",
    imageAlt: "Amanat Shah Fabrics Ltd. inauguration, 2017",
  },
  {
    year: "2019",
    title: "Miah is born",
    description:
      "With the launch of this fashion e-commerce platform, our endeavor expands into lifestyle branding and retail, bringing our heritage quality directly to the modern consumer.",
    image: "/images/our-history/Miah.png",
    imageAlt: "Miah inauguration, 2019",
  },
  {
    year: "2019",
    title: "ASG Dynamic is born",
    description:
      "With the establishment of this technology entity, our endeavor expands into the digital space, providing specialized software solutions and driving the group's technological transformation.",
    image: "/images/our-history/ASG Dynamic.png",
    imageAlt: "ASG Dynamic inauguration, 2019",
  },
  {
    year: "2025",
    title: "Amanat Shah Tex Solution is born",
    description:
      "With this strategic addition, our endeavor evolves into advanced specialty chemical manufacturing, providing innovative and sustainable chemical formulations for the textile industry.",
    image: "/images/our-history/history-milestone-1.png",
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
            <span className="font-test-tiempos-fine font-medium text-[2.75rem] sm:text-[5rem] leading-[1.167] text-neutral-800">
              {milestone.year}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="font-test-tiempos-fine font-medium text-xl sm:text-[2rem] leading-8 lg:leading-[1.5] text-neutral-800">
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
     scrolls into the viewport, then smoothly animates to that dot.
     No matter how much you scroll, the line stays put until the next
     dot is visible. */
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
        // Line grows from section top down to each dot center.
        // Only height is animated — no top changes — so the
        // Tailwind translate-x transform is never conflicted.
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
    <section ref={sectionRef} className="relative w-full bg-white">
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

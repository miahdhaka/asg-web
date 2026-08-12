"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const years = [
  "2001", "2002", "2004", "2009", "2011", "2012",
  "2013", "2013", "2013", "2014", "2015", "2016",
  "2017", "2020",
];

export default function OurHistoryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title fades up from below
      tl.fromTo(
        titleRef.current,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        0.2,
      );

      // Subtitle follows shortly after
      tl.fromTo(
        subtitleRef.current,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
        0.45,
      );
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* ── Hero ── */}
      <section ref={sectionRef} className="relative w-full">
        {/* Background image — mobile-only below lg */}
        <Image
          src="/images/our-history/history-hero.png"
          alt="Our History"
          width={1920}
          height={1068}
          priority
          quality={90}
          className="block lg:hidden min-h-[20rem] w-full h-auto object-cover object-[50%_40%]"
        />

        {/* Background image — desktop */}
        <Image
          src="/images/our-history/history-hero.png"
          alt="Our History"
          width={1920}
          height={1068}
          priority
          quality={90}
          className="hidden lg:block lg:h-[31.125rem] w-full object-cover object-[50%_40%]"
        />

        {/* Dark bottom gradient overlay for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,12,12,1) 6%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Title + subtitle — bottom-left */}
        <div className="flex flex-col gap-0.5 absolute left-4 sm:left-8 lg:left-[3.75rem] bottom-6 sm:bottom-10 lg:bottom-[4.5rem] z-10 max-w-[33.625rem]">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl lg:text-[3rem] leading-[1] text-white font-test-tiempos-fine font-normal tracking-wider opacity-0"
          >
            Our History
          </h1>
          <p
            ref={subtitleRef}
            className="text-xs text-white/90 font-neue-montreal font-normal tracking-wide opacity-0"
          >
            At A Glance into The History of Amanat Shah Group
          </p>
        </div>
      </section>

      {/* ── Year navigation bar ── */}
      <div className="w-full border-b border-gray-100 py-3.5 px-2.5">
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {years.map((year, i) => (
            <div key={`${year}-${i}`} className="flex items-center gap-3">
              {i > 0 && (
                <span className="block size-1.5 rounded-full bg-neutral-100" />
              )}
              <span className="text-sm text-neutral-800 font-neue-montreal font-normal">
                {year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

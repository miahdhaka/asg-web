"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LegacyOfLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const portrait = portraitRef.current;
    const glow = glowRef.current;

    if (!section || !panel || !portrait || !glow) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set([portrait, glow], { clearProps: "all" });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          glow,
          { autoAlpha: 0, scale: 0.72 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.45,
            ease: "power2.out",
          },
        )
        .fromTo(
          portrait,
          { autoAlpha: 0, y: 90, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            force3D: true,
          },
          0.12,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legacy-of-leadership"
      className="relative w-full overflow-hidden bg-[#F3F3F1] pt-15"
    >
      <div className="px-6 md:px-12 lg:px-[3.75rem]">
        <div className="flex flex-col gap-7">
          <span className="inline-flex items-center gap-2 font-space-mono text-xs leading-4 text-[#262626] uppercase">
            Leadership
            <span
              aria-hidden
              className="h-1 w-1 rounded-full bg-gradient-to-r from-[#8BC34A] to-[#1AA179]"
            />
          </span>

          <h2 className="max-w-[29.5rem] font-archivo-black text-3xl leading-[1.1] text-[#262626] uppercase sm:text-4xl lg:text-[2.25rem]">
            Legacy of
            <br />
            Leadership
          </h2>
        </div>

        <div
          ref={panelRef}
          className="relative mt-28 min-h-[47rem] md:min-h-[51rem] lg:mt-[7.125rem] lg:h-[27.3125rem] lg:min-h-0"
        >
          <div className="absolute inset-0 overflow-hidden rounded-t-[1.5rem] bg-[#0E2D25]">
            <div ref={glowRef} aria-hidden className="absolute inset-0">
              <Image
                src="/images/home-legacy/lagacy-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) calc(100vw - 7.5rem), calc(100vw - 3rem)"
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

          <div
            ref={portraitRef}
            className="group absolute -top-16 left-1/2 z-20 h-[22rem] w-[86%] max-w-[25rem] -translate-x-1/2 md:-top-20 md:h-[28rem] lg:top-auto lg:bottom-0 lg:left-[25.87%] lg:h-[31.9375rem] lg:w-[30.2%] lg:max-w-[24.875rem] lg:translate-x-0"
          >
            <Image
              src="/images/home-legacy/helal-sir-leadership.png"
              alt="Mohammad Helal Miah, Chairman of Amanat Shah Group"
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 25rem, 86vw"
              className="origin-bottom object-contain object-bottom [transform:scaleX(-1)] transition-transform duration-700 ease-out group-hover:[transform:scaleX(-1)_scale(1.04)]"
              quality={90}
            />
          </div>

          <div className="absolute inset-x-6 top-[18.75rem] z-30 text-white md:inset-x-10 md:top-[23.5rem] lg:inset-x-auto lg:left-[3.5625rem] lg:top-[10.0625rem] lg:w-[18.375rem]">
            <h3 className="font-archivo-black text-2xl leading-[1.08] uppercase">
              Mohammad
              <br />
              Helal Miah
            </h3>
            <p className="mt-4 text-base leading-6">Chairman</p>
            <div className="my-4 h-px w-full bg-[#2B5349]" />
            <p className="font-archivo-black text-sm leading-5 uppercase">
              Amanat Shah Group
            </p>
          </div>

          <div className="absolute inset-x-6 bottom-10 z-30 flex flex-col items-center gap-8 text-white md:inset-x-10 lg:inset-x-auto lg:right-[7.5rem] lg:top-[4.9375rem] lg:bottom-auto lg:w-[27.25rem] lg:gap-[2.375rem]">
            <svg
              aria-hidden
              width="79"
              height="79"
              viewBox="0 0 79 79"
              fill="none"
              className="h-[4.9375rem] w-[4.9375rem] shrink-0"
            >
              <path
                d="M0 45.1438H16.9285L5.64274 67.715H22.5712L33.857 45.1438V11.2868H0V45.1438ZM45.1427 11.2868V45.1438H62.0712L50.7854 67.715H67.7139L78.9996 45.1438V11.2868H45.1427Z"
                fill="#17362E"
              />
            </svg>

            <p className="text-base leading-6 lg:text-xl lg:leading-7">
              ASG&apos;s leadership is rooted in a founding family&apos;s 130-year
              entrepreneurial legacy — carried forward today by a management
              team focused on manufacturing discipline, product innovation and
              long-term partnership with global brands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

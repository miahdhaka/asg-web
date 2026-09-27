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

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const portrait = portraitRef.current;

    if (!section || !panel || !portrait) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(portrait, { clearProps: "all" });
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
          portrait,
          { y: 80, scale: 0.94 },
          {
            y: 0,
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            force3D: true,
          },
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legacy-of-leadership"
      className="relative flex w-full flex-col overflow-hidden bg-[#F3F3F1] py-20 lg:min-h-screen"
    >
      <div className="flex flex-1 flex-col px-6 pb-4 md:px-12 lg:px-20">
        <div className="flex flex-col gap-7">
          <span className="inline-flex items-center gap-1.5 font-space-mono font-medium text-[var(--neutral-800)] uppercase">
            Leadership
            <span className="bg-gradient-to-b from-[#4a9e4a] to-[#2d6b2d] bg-clip-text text-2xl leading-none text-transparent">
              •
            </span>
          </span>

          <h2 className="max-w-[29.5rem] font-archivo-black text-2xl leading-[1.1] text-[var(--neutral-800)] uppercase sm:text-4xl lg:text-[3rem]">
            Legacy of
            <br />
            Leadership
          </h2>
        </div>

        <div
          ref={panelRef}
          className="relative mt-28 min-h-[47rem] flex-1 md:min-h-[51rem] lg:mt-[7.125rem] lg:min-h-0"
        >
          <div className="absolute inset-0 overflow-hidden rounded-t-[1.5rem]">
            <div aria-hidden className="absolute inset-0">
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
            className="group absolute -top-16 left-1/2 z-20 h-[32rem] w-[86%] max-w-[30rem] -translate-x-1/2 md:-top-20 md:h-[38rem] lg:top-auto lg:bottom-0 lg:left-[25.87%] lg:h-[45rem] lg:w-[38%] lg:max-w-[32rem] lg:translate-x-0"
          >
            <Image
              src="/images/home-legacy/helal-sir-leadership.png"
              alt="Mohammad Helal Miah, Chairman of Amanat Shah Group"
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 32rem, 86vw"
              className="origin-bottom object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
              quality={90}
            />
          </div>

          <div className="absolute inset-x-6 top-[18.75rem] z-30 text-white md:inset-x-10 md:top-[23.5rem] lg:inset-x-auto lg:top-1/2 lg:left-[5rem] lg:-translate-y-1/2 lg:w-[18.375rem]">
            <h3 className="font-archivo-black text-3xl leading-[1.08] uppercase lg:text-[2rem]">
              Mohammad
              <br />
              Helal Miah
            </h3>
            <p className="mt-8 text-base leading-6 lg:text-[1.25rem]">Chairman</p>
            <div className="my-6 h-px w-full bg-[#2B5349]" />
            <p className="font-archivo-black text-base lg:text-[1.1rem] leading-5 uppercase">
              Amanat Shah Group
            </p>
          </div>

          <div className="absolute inset-x-6 bottom-10 z-30 flex flex-col items-center gap-8 text-white md:inset-x-10 lg:inset-x-auto lg:right-[5rem] lg:top-1/2 lg:bottom-auto lg:w-[36rem] lg:-translate-y-1/2 lg:gap-[3.5rem]">
            <svg
              aria-hidden
              width="79"
              height="79"
              viewBox="0 0 79 79"
              fill="none"
              className="h-[6.5rem] w-[6.5rem] shrink-0"
            >
              <path
                d="M0 45.1438H16.9285L5.64274 67.715H22.5712L33.857 45.1438V11.2868H0V45.1438ZM45.1427 11.2868V45.1438H62.0712L50.7854 67.715H67.7139L78.9996 45.1438V11.2868H45.1427Z"
                fill="#17362E"
              />
            </svg>

            <p className="text-xl leading-7 lg:text-[1.7rem] lg:leading-9">
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

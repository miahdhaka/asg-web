"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1, force3D: true },
        {
          scale: 0.85,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 15%",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 bg-background w-full px-4 py-14 md:px-12 lg:px-20 lg:py-22">
      <div>
        {/* Top row: label + heading on left, description + CTA on right */}
        <div className="flex flex-col gap-3 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:max-w-[90%]">
          {/* Left column */}
          <div className="flex flex-col gap-2.5 sm:gap-4.5 lg:max-w-[55%]">
            <div className="text-sm inline-flex items-center gap-2.5 sm:gap-1.5 font-space-mono font-medium uppercase tracking-wider">
              <span>About Us</span>
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--primary-gradient)" }} />
            </div>
            <h2 className="font-archivo-black uppercase text-[var(--neutral-800)] text-[1.8rem] sm:text-4xl lg:text-[3rem] leading-[1.2]">
              <span className="hidden md:block">
                One Thread.
                <br />
                Every Stage.
                <br />
                One Group.
              </span>

              <span className="block md:hidden">
                One Thread.
                <br />
                Every Stage. One Group.
              </span>
            </h2>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start gap-5 sm:gap-6 lg:max-w-[35%] lg:pt-2">
            <p className="text-base text-[var(--neutral-800)] md:text-[1.25rem]">
              Amanat Shah Group is a diversified business group with strong concentration in the Textile-to-Fashion value chain supported by Finance, Chemicals, Technology, Agriculture. 
            </p>
            <Link
              href="/about-us"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent px-4 sm:px-6 py-3.5 text-sm font-medium leading-none lg:px-[1.2em] lg:py-[0.8em] lg:text-[1.1em]"
              style={{
                background: 'linear-gradient(#F3F3F1, #F3F3F1) padding-box, linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%) border-box',
              }}
            >
              {/* Invisible spacer — preserves the button's intrinsic width/height */}
              <span className="invisible inline-flex items-center gap-1 whitespace-nowrap lg:gap-[0.33em] tracking-wide">
                More about us
                <ArrowRight className="h-4 w-4" />
              </span>

              {/* Default: gradient text — slides down and out on hover */}
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-full lg:gap-[0.33em]"
              >
                <span
                  className="bg-clip-text text-transparent tracking-wide"
                  style={{ backgroundImage: "var(--primary-gradient)" }}
                >
                  More about us
                </span>
              </span>

              {/* Hover: gradient fill + white text — slides in from the top */}
              <span
                aria-hidden
                className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em] tracking-wide"
                style={{ background: "var(--primary-gradient)" }}
              >
                More about us
              </span>
            </Link>
          </div>
        </div>

        {/* Building video — mobile cut on short 4/3 frame, desktop keeps the tall max-h-[75vh] frame */}
        <div
          ref={imageRef}
          className="mt-10 sm:mt-12 lg:mt-[3em] overflow-hidden rounded-[0.75rem] lg:rounded-[1.2rem]"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <video
            aria-hidden
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="block w-full object-cover aspect-[4/3] lg:hidden"
          >
            <source src="/videos/about-us/mobile.webm" type="video/webm" />
          </video>
          <video
            aria-hidden
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="hidden w-full object-cover lg:block lg:h-auto lg:max-h-[75vh]"
          >
            <source src="/videos/about-us/desktop.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}

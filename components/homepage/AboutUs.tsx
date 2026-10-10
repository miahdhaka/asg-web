"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Only the EXIT phase is animated here. The image sits at full size while the
   section is in view, then smoothly scales back down to its small state as the
   section scrolls out — the way it used to. The old timeline also scaled the
   image on the way IN, which collided with ASGHighlight's cover-rise (that
   transforms this section's parent via aboutRiseRef in app/page.tsx): the scale
   start/end got re-measured against a still-moving bounding rect and bounced on
   arrival. Leaving the section happens well after the cover has settled, so a
   scrubbed scale-down here reads cleanly with no drift. */
export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 0.85,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            // Shrink as the section scrolls out: begins when the section top
            // reaches the viewport top, completes when its bottom clears it.
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 bg-background w-full px-4 py-16 md:px-12 lg:px-20 lg:py-22">
      <div>
        {/* Top row: label + heading on left, description + CTA on right */}
        <div className="flex flex-col gap-6 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:max-w-[90%]">
          {/* Left column */}
          <div className="flex flex-col gap-7 lg:max-w-[55%]">
            <span className="inline-flex items-center gap-1.5 font-space-mono font-medium text-[var(--neutral-800)] uppercase">
              About Us <span className="text-2xl leading-none bg-gradient-to-b from-[#4a9e4a] to-[#2d6b2d] bg-clip-text text-transparent">•</span>
            </span>
            <h2 className="font-archivo-black uppercase text-[1.75rem] sm:text-4xl lg:text-[3rem] leading-[1.2] text-[var(--neutral-800)] word-space-4">
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
          <div className="flex flex-col items-start gap-8 sm:gap-6 lg:max-w-[35%] lg:pt-2">
            <p className="text-base text-[var(--neutral-800)] md:text-[1.25rem]">
              Amanat Shah Group is a diversified business group with strong concentration in the Textile-to-Fashion value chain supported by Finance, Chemicals, Technology, Agriculture. 
            </p>
            <Link
              href="/about-us"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent px-6 py-3 text-sm font-medium leading-none lg:px-[1.2em] lg:py-[0.8em] lg:text-[1.1em]"
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
                <ArrowRight className="h-4 w-4" color="#1AA179" />
              </span>

              {/* Hover: gradient fill + white text — slides in from the top */}
              <span
                aria-hidden
                className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em] tracking-wide"
                style={{ background: "var(--primary-gradient)" }}
              >
                More about us
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Building image */}
        <div
          ref={imageRef}
          className="mt-6 sm:mt-12 lg:mt-[5em] overflow-hidden rounded-[0.75rem] lg:rounded-[1.2rem]"
        >
          <Image
            src="/images/about-us/home-about-us.png"
            alt="Amanat Shah Group building"
            width={1400}
            height={500}
            className="block w-full object-cover aspect-[5/4] lg:aspect-auto lg:h-auto lg:max-h-[75vh]"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}

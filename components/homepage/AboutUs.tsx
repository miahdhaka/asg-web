"use client";

import Image from "next/image";
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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Stay small as section enters viewport
      tl.fromTo(imageRef.current, { scale: 0.85 }, { scale: 0.85, duration: 0.5, ease: "none" });
      // Scale up as section reaches middle
      tl.to(imageRef.current, { scale: 1, duration: 0.5, ease: "power1.inOut" });
      // Brief hold at full size for smooth transition
      tl.to(imageRef.current, { scale: 1, duration: 0.2, ease: "none" });
      // Scale down immediately after reaching full size (same range as scale up)
      tl.to(imageRef.current, { scale: 0.85, duration: 0.5, ease: "power1.inOut" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:px-12 lg:px-20 lg:py-22">
      <div>
        {/* Top row: label + heading on left, description + CTA on right */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:max-w-[90%]">
          {/* Left column */}
          <div className="flex flex-col gap-7 lg:max-w-[55%]">
            <span className="inline-flex items-center gap-1.5 font-space-mono  font-medium text-[var(--neutral-800)] uppercase">
              About Us <span className="text-2xl leading-none bg-gradient-to-b from-[#4a9e4a] to-[#2d6b2d] bg-clip-text text-transparent">•</span>
            </span>
            <h2 className="font-archivo-black uppercase text-2xl sm:text-4xl lg:text-[3rem] leading-[1.1] text-[var(--neutral-800)] word-space-2">
              One Thread.
              <br />
              Every Stage.
              <br />
              One Group.
            </h2>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start gap-6 lg:max-w-[35%] lg:pt-2">
            <p className="text-base  text-[#555] md:text-[1.25rem]">
              Amanat Shah Group is a diversified business group with strong
              concentration in the Textile-to-Fashion value chain supported by
              Finance, Chemicals, Technology, Agriculture.
            </p>
            <Link
              href="/about-us"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent px-6 py-3 text-sm font-medium leading-none lg:px-[1.2em] lg:py-[0.8em] lg:text-[1.1em]"
              style={{
                background: 'linear-gradient(#F3F3F1, #F3F3F1) padding-box, linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 92.01%) border-box',
              }}
            >
              {/* Invisible spacer — preserves the button's intrinsic width/height */}
              <span className="invisible inline-flex items-center gap-1 whitespace-nowrap lg:gap-[0.33em]">
                More about us
                <ArrowRight className="h-4 w-4" />
              </span>

              {/* Default: gradient text — slides down and out on hover */}
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-full lg:gap-[0.33em]"
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--primary-gradient)" }}
                >
                  More about us
                </span>
                <ArrowRight className="h-4 w-4" color="#1AA179" />
              </span>

              {/* Hover: gradient fill + white text — slides in from the top */}
              <span
                aria-hidden
                className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em]"
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
          className="mt-12 lg:mt-[5em]"
          style={{ borderRadius: '1.2rem', overflow: 'hidden' }}
        >
          <Image
            src="/images/about-us/home-about-us.png"
            alt="Amanat Shah Group building"
            width={1400}
            height={500}
            className="block h-auto max-h-[75vh] w-full object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}

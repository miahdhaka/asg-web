"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** External-link glyph shown beside the "Visit website" label */
function LinkArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="lg:h-[1em] lg:w-[1em]"
    >
      <path
        d="M2.5 9.5L9.5 2.5M4 2.5H9.5V8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SisterConcern {
  sector: string;
  description: string;
  logo: string;
  link: string;
}

const sisterConcerns: SisterConcern[] = [
  {
    sector: "TEXTILE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/spinning-mills-clr.png",
    link: "https://www.asg-bd.com/HASSML.php",
  },
  {
    sector: "RETAIL",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/helal-brothers-clr.png",
    link: "https://www.asg-bd.com/H&B",
  },
  {
    sector: "TEXTILE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/fabrics-clr.png",
    link: "https://amanatshahfabrics.com/",
  },
  {
    sector: "GERMANE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/trust-knitwear-clr.png",
    link: "https://www.trustknitwear.com/index.html",
  },
  {
    sector: "FINANCE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/securities-clr.png",
    link: "https://www.hasslbd.com/",
  },
  {
    sector: "AGRICULTURE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/farm2farm-clr.png",
    link: "https://asg-bd.com/Farm2Firm.php",
  },
  {
    sector: "ECOMMERCE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/miah-clr.png",
    link: "https://miahbd.com/",
  },
  {
    sector: "CHEMICAL",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/tex-solution-clr.png",
    link: "#",
  },
  {
    sector: "TEXTILE",
    description: "Ring, open-end and compact yarn spinning across counts and blends.",
    logo: "/logo/sister-concern/weaving-clr.png",
    link: "https://www.asg-bd.com/ASWPL.php",
  },
];

interface HeroProps {
  /** Shared refs connecting WeAreASG's count-up to the stepper */
  waaTriggerRef?: MutableRefObject<(() => void) | null>;
  waaResetRef?: MutableRefObject<(() => void) | null>;
}

export default function Hero({ waaTriggerRef, waaResetRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [activeConcern, setActiveConcern] = useState(0);
  const activeConcernRef = useRef(0);
  const leftSlideRef = useRef<HTMLDivElement>(null);
  const rightSlideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial centered position for video wrapper
      gsap.set(videoWrapRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        height: "100%",
      });

      // Set initial state for side content (hidden below, invisible)
      gsap.set(leftContentRef.current, { y: "250px", opacity: 0 });
      gsap.set(rightContentRef.current, { y: "250px", opacity: 0 });

      // Content animation — plays all at once on first real scroll
      gsap.set(textRef.current, { y: 0, opacity: 1 });
      const contentAnim = gsap.to(textRef.current, {
        y: "-60vh",
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        paused: true,
      });

      // Video animation — tied to scroll (shrinks per pixel)
      const videoAnim = gsap.to(videoWrapRef.current, {
        width: "23%",
        height: "56%",
        borderRadius: "16px",
        paused: true,
      });

      // Side content rise animation
      const sideAnim = gsap.to([leftContentRef.current, rightContentRef.current], {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        paused: true,
        stagger: 0.1,
      });

      // Slide transition for sector/desc when switching concerns
      const slideConcerns = () => {
        const els = [leftSlideRef.current, rightSlideRef.current].filter(Boolean);
        gsap.killTweensOf(els);
        gsap.to(els, {
          y: "-40px",
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            setActiveConcern(activeConcernRef.current);
            requestAnimationFrame(() => {
              gsap.set(els, { y: "40px" });
              gsap.to(els, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: "power3.out",
              });
            });
          },
        });
      };

      // ScrollTrigger: pins section, scrubs video, triggers content once
      let contentTriggered = false;
      let sideTriggered = false;
      let hasScrolled = false;
      let videoTarget = 0;
      let videoCurrent = 0;
      let rafId: number;

      const smoothUpdate = () => {
        videoCurrent += (videoTarget - videoCurrent) * 0.06;
        if (Math.abs(videoTarget - videoCurrent) > 0.001) {
          videoAnim.progress(videoCurrent);
          rafId = requestAnimationFrame(smoothUpdate);
        } else {
          videoAnim.progress(videoTarget);
        }
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + (50 + sisterConcerns.length * 15) + "%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // Only respond to actual user scrolling, not init
          if (window.scrollY > 0) hasScrolled = true;
          if (!hasScrolled) return;

          // Video shrinks in first 40% of scroll, then stays at final size
          videoTarget = Math.min(self.progress / 0.4, 1);
          cancelAnimationFrame(rafId);
          smoothUpdate();

          // Side content rises after video finishes shrinking
          if (self.progress > 0.42 && !sideTriggered) {
            sideTriggered = true;
            sideAnim.play();
          }
          if (self.progress < 0.38 && sideTriggered) {
            sideTriggered = false;
            sideAnim.timeScale(1).reverse();
          }

          // Switch concern dynamically based on scroll progress
          const p = self.progress;
          const concernStart = 0.42;
          const concernRange = 1 - concernStart;
          const segLen = concernRange / sisterConcerns.length;
          const newIdx = p > concernStart
            ? Math.min(sisterConcerns.length - 1, Math.floor((p - concernStart) / segLen))
            : 0;
          if (newIdx !== activeConcernRef.current) {
            activeConcernRef.current = newIdx;
            if (sideTriggered) slideConcerns();
          }

          if (self.progress > 0.01 && !contentTriggered) {
            contentTriggered = true;
            contentAnim.play();
          }
          if (self.progress < 0.01 && contentTriggered) {
            contentTriggered = false;
            contentAnim.timeScale(1).reverse();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden bg-white">
      {/* Video wrapper */}
      <div ref={videoWrapRef} className="absolute inset-0 overflow-hidden">
        {/* Hero Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero/hero-bg-vid.webm" type="video/webm" />
        </video>

        {/* Dark overlay for text readability */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered content — overflow-hidden clips text during rise/fall */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4 pb-14 sm:pb-0">
          <div ref={textRef} className="mt-28 select-none">
          {/* Subtitle — Space Mono */}
          <div className="font-space-mono font-medium uppercase tracking-wider text-xs sm:text-sm lg:text-base text-white flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-[1.5px] bg-white shrink-0" />
            <span>AMANAT SHAH GROUP</span>
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "var(--primary-gradient)" }}
            />
            <span>EST. 1890s</span>
            <span className="w-4 h-[1.5px] bg-white shrink-0" />
          </div>

          {/* Title — Archivo Black, 3 lines */}
          <h1 className="font-archivo-black uppercase text-[28px] sm:text-5xl lg:text-[6rem] leading-[1.05]">
            <span className="block">GENERATIONS OF <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>TRUST.</span></span>
            <span className="block">ENGINEERED FOR</span>
            <span className="block">THE <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>FUTURE.</span></span>
          </h1>
          </div>
        </div>
      </div>

      {/* Left side content — rises from below */}
      <div ref={leftContentRef} className="max-w-[28rem] absolute left-6 lg:left-[4%] top-0 bottom-0 z-20 flex items-center text-[var(--neutral-800)]">
        <div>
          <div className="font-space-mono font-medium uppercase tracking-wider text-xs sm:text-sm lg:text-base flex items-center gap-2 mb-3">
            <span>OUR BUSINESS</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--primary-gradient)" }} />
          </div>
          <h2 className="font-archivo-black uppercase text-lg sm:text-2xl lg:text-[3rem] leading-[1.05]">
            {["AN ECOSYSTEM", "NOT A FACTORY"].map((line, i) => (
              <span className="block" key={i}>{line}</span>
            ))}
          </h2>
          <div className="border-b border-[#EBEBEB] my-4" />
          <div ref={leftSlideRef}>
            <div>
              <span
                className="font-neue-montreal uppercase font-medium text-xs sm:text-sm lg:text-[1.6rem]"
                style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {sisterConcerns[activeConcern]?.sector ?? "TEXTILE"}
              </span>
            </div>
            <p className="w-[90%] font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-2">
              {sisterConcerns[activeConcern]?.description ?? ""}
            </p>
          </div>
        </div>
      </div>

      {/* Right side content — rises from below */}
      <div ref={rightContentRef} className="max-w-[28rem] absolute right-6 lg:right-[4%] top-0 bottom-0 z-20 flex items-center text-[var(--neutral-800)]">
        <div className="text-left">
          <div ref={rightSlideRef}>
            <img
              src={sisterConcerns[activeConcern]?.logo ?? ""}
              alt="Sister concern"
              className="h-9 sm:h-12 lg:h-[4.5rem] w-auto object-contain"
            />
            <p className="w-[90%] font-neue-montreal text-xs sm:text-sm lg:text-[1.15rem] text-[var(--neutral-600)] mt-1">
              {sisterConcerns[activeConcern]?.description ?? ""}
            </p>
          </div>
          <a
            href={sisterConcerns[activeConcern]?.link ?? "#"}
            className="group relative inline-flex w-fit items-center justify-center self-start overflow-hidden border px-5 py-2.5 text-xs font-medium leading-none lg:self-auto lg:px-[1.75em] lg:py-[0.9em] lg:text-[1.08em] mt-10"
            style={{
              borderImage: "var(--primary-gradient) 1",
              borderWidth: 1,
            }}
          >
            <span className="invisible inline-flex items-center gap-1 whitespace-nowrap lg:gap-[0.33em]">
              Visit Website
              <LinkArrow />
            </span>
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center gap-1 whitespace-nowrap text-[#1AA179] transition-transform duration-500 ease-in-out group-hover:translate-y-full lg:gap-[0.33em]"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Visit Website
              </span>
              <SquareArrowOutUpRight className="w-4 h-4" />
            </span>
            <span
              aria-hidden
              className="absolute inset-0 flex -translate-y-full items-center justify-center gap-1 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0 lg:gap-[0.33em]"
              style={{ background: "var(--primary-gradient)" }}
            >
              Visit Website
              <SquareArrowOutUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

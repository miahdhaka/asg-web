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
  /** Ref exposing a function to change the Hero's side content (from ASGHighlight) */
  heroSlideChangeRef?: MutableRefObject<((idx: number) => void) | null>;
}

export default function Hero({ waaTriggerRef, waaResetRef, heroSlideChangeRef }: HeroProps) {
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
    const tickers: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // ─ Initial states ──────────────────────────────────────────
      // Video wrapper: centered, full-size
      gsap.set(videoWrapRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        height: "100%",
      });

      // Side content: hidden below viewport
      gsap.set(leftContentRef.current, { y: "100vh", opacity: 0 });
      gsap.set(rightContentRef.current, { y: "100vh", opacity: 0 });

      // Center text: visible at natural position
      gsap.set(textRef.current, { y: 0, opacity: 1 });

      // Phase boundaries
      const videoEnd = 0.30;   // video fully shrunk at 7th scroll
      // Per-scroll progress unit derived from the video convention (7th scroll
      // = videoEnd). Used to anchor the side content to an exact scroll count.
      const PER_SCROLL = videoEnd / 7; // ≈ 0.042857 progress per scroll
      // Side content rises across a WIDE progress range so it moves only a
      // little per scroll notch (slow, per-scroll rise) while staying tightly
      // tied to scroll position — scroll up reverses it back down.
      const sideStart = PER_SCROLL * 2; // side content starts at exact 2nd scroll
      const sideEnd = 0.55;    // side content fully risen (wide = slow)

      // Smoothing config — a light glide follower keeps motion from snapping
      // on each wheel/trackpad tick while remaining tied to scroll position.
      const SMOOTH = 0.12;
      // power2.out: content lifts noticeably right at sideStart (so the rise is
      // clearly visible from the 4th scroll) then decelerates smoothly to rest.
      const sideEase = gsap.parseEase("power2.out");
      let targetProgress = 0;
      let scrollProgress = 0; // smoothed progress used everywhere

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

      // Text fade boundaries — progressive shrink keeps copy inside the video
      // Scrolls 1-3: text fades equally; scroll 4: fully gone
      const textStart = 0.0;
      const textEnd = 0.2; // fully invisible early

      // Expose function for ASGHighlight to change side content
      if (heroSlideChangeRef) {
        heroSlideChangeRef.current = (idx: number) => {
          if (idx !== activeConcernRef.current) {
            activeConcernRef.current = idx;
            setActiveConcern(idx);
            if (scrollProgress > sideEnd) slideConcerns();
          }
        };
      }

      // Per-frame glide follower — eases scrollProgress toward the raw
      // trigger progress so pinned visuals move smoothly instead of
      // snapping on every wheel/trackpad tick.
      const tick = () => {
        scrollProgress += (targetProgress - scrollProgress) * SMOOTH;
        // Snap when effectively settled to avoid endless sub-pixel drift
        if (Math.abs(targetProgress - scrollProgress) < 0.0005) {
          scrollProgress = targetProgress;
        }
        const p = scrollProgress;

        // Center text: progressive rise + fade + shrink tied to scroll
        // progress so the copy never outruns the shrinking video frame.
        // Fades equally across scrolls 1-3, fully gone by scroll 4.
        if (p <= textStart) {
          gsap.set(textRef.current, { y: 0, opacity: 1, scale: 1 });
        } else if (p >= textEnd) {
          gsap.set(textRef.current, { y: "-35vh", opacity: 0, scale: 0.5 });
        } else {
          const t = (p - textStart) / (textEnd - textStart);
          gsap.set(textRef.current, {
            y: `${-35 * t}vh`,
            opacity: 1 - t,
            scale: 1 - 0.5 * t,
          });
        }

        // Video: directly interpolated 0%→35% (full-size → small)
        // Using direct interpolation guarantees correct values at every
        // scroll position including 0 (no "to() tween not started" issue).
        const vw = p <= videoEnd
          ? 100 - (100 - 23) * (p / videoEnd)
          : 23;
        const vh = p <= videoEnd
          ? 100 - (100 - 56) * (p / videoEnd)
          : 56;
        const br = p <= videoEnd ? 16 * (p / videoEnd) : 16;
        gsap.set(videoWrapRef.current, {
          width: `${vw}%`,
          height: `${vh}%`,
          borderRadius: `${br}px`,
        });

        // Side content: eased interpolation across the wide sideStart–sideEnd
        // range, driven by scroll-tied progress so the panels rise a little
        // per scroll (slow) and reverse straight back down on scroll up.
        if (p <= sideStart) {
          gsap.set([leftContentRef.current, rightContentRef.current], {
            y: "100vh",
            opacity: 0,
          });
        } else if (p >= sideEnd) {
          gsap.set([leftContentRef.current, rightContentRef.current], {
            y: 0,
            opacity: 1,
          });
        } else {
          const rawT = (p - sideStart) / (sideEnd - sideStart);
          const t = sideEase(rawT);
          gsap.set([leftContentRef.current, rightContentRef.current], {
            y: `${100 * (1 - t)}vh`,
            opacity: t,
          });
        }

        // Switch concern dynamically based on scroll progress
        const concernStart = sideEnd;
        const concernRange = 1 - concernStart;
        const segLen = concernRange / sisterConcerns.length;
        const newIdx = p > concernStart
          ? Math.min(sisterConcerns.length - 1, Math.floor((p - concernStart) / segLen))
          : 0;
        if (newIdx !== activeConcernRef.current) {
          activeConcernRef.current = newIdx;
          if (p > sideEnd) slideConcerns();
        }
      };
      tickers.push(tick);
      gsap.ticker.add(tick);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + (80 + sisterConcerns.length * 17) + "%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          targetProgress = self.progress;
        },
      });
    });

    return () => {
      tickers.forEach((t) => gsap.ticker.remove(t));
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[var(--vh)] lg:h-screen overflow-hidden">
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

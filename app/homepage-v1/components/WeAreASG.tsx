"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface StatCard {
  label: string;
  value: number;
  /** Rendered after the animated number, e.g. "+" */
  suffix?: string;
  /** PNG icon path under /public/icon/ */
  icon: string;
}

const stats: StatCard[] = [
  {
    label: "Years Experience",
    value: 130,
    icon: "/icons/employee_experience.png",
  },
  {
    label: "Employee",
    value: 15000,
    suffix: "+",
    icon: "/icons/employee.png",
  },
  {
    label: "Government Award",
    value: 15,
    icon: "/icons/award.png",
  },
  {
    label: "Countries Reached",
    value: 17,
    icon: "/icons/fun-world.png",
  },
];

interface WeAreASGProps {
  /** C2 fix: the homepage scroll stepper calls these when the WeAreASG
      section is fully settled (forward) or reversed away (backward),
      replacing the old ScrollTrigger-based count-up that fired at the
      wrong visual moment during pin/unpin transitions. */
  onReady?: (trigger: () => void, reset: () => void) => void;
}

export default function WeAreASG({ onReady }: WeAreASGProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // C2 fix: count-up is triggered imperatively by the homepage scroll
  // stepper (via onReady callback) instead of ScrollTrigger. This ensures
  // the count-up only fires when the section is fully settled — not while
  // it's still blurred, scaled, or pinned.
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-count]");
    tweensRef.current = els.map((el) => {
      const target = Number(el.dataset.count);
      const counter = { value: 0 };
      return gsap.to(counter, {
        value: target,
        duration: 2.8,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = String(Math.round(counter.value));
        },
      });
    });
  }, { scope: sectionRef });

  // Expose trigger/reset to the parent via the onReady callback
  useEffect(() => {
    if (!onReady) return;
    const trigger = () => {
      tweensRef.current.forEach((t) => {
        t.restart();
      });
    };
    const reset = () => {
      tweensRef.current.forEach((t) => {
        t.pause();
        t.progress(0);
      });
      // Reset displayed values to 0
      const els = gsap.utils.toArray<HTMLElement>("[data-count]");
      els.forEach((el) => {
        el.textContent = "0";
      });
    };
    onReady(trigger, reset);
  }, [onReady]);

  return (
    <section
      ref={sectionRef}
      id="we-are-asg"
      className="relative flex w-full flex-col overflow-hidden h-[calc(var(--vh)-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Aerial background — swap with the real asset once it lands in
          /public/images/we-are-asg/. */}
      <Image
        src="/images/we-are-asg.webp"
        alt=""
        fill
        sizes="100vw"
        draggable={false}
        className="pointer-events-none object-cover"
        quality={80}
      />
      {/* Soft dark tint so the cards and type stay legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/25" />

      {/* Oversized gradient type — behind the cards. The Hero's 9th-scroll
          reveal nudges "WE ARE" in from the right and "ASG" from the left. */}
      <span
        id="waa-we-are"
        aria-hidden
        className="pointer-events-none absolute top-[7%] sm:top-[5%] lg:top-[10%] left-[5%] z-10 font-serif text-[4rem] sm:text-[6rem] lg:text-[10rem] leading-none uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
      >
        We Are
      </span>
      <span
        id="waa-asg"
        aria-hidden
        className="pointer-events-none absolute bottom-[9.5%] sm:bottom-[5%] lg:bottom-[10%] right-[5%] z-10 font-serif text-[4rem] sm:text-[6rem] lg:text-[10rem] leading-none uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
      >
        ASG
      </span>

      {/* Stat cards */}
      <div className="relative z-20 flex min-h-0 flex-1 items-center px-4 lg:px-20">
        <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 xl:gap-8 mb-6 sm:mb-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex h-[min(calc(var(--vh)*0.3),16rem)] lg:h-[min(46vh,420px)] flex-col bg-white"
            >
              {/* Top part — icon + label, own padding */}
              <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-3 lg:p-5">
                <div className="relative size-[2.5rem] sm:size-[3rem] lg:size-[4.6875rem] transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <Image
                    src={stat.icon}
                    alt=""
                    width={75}
                    height={75}
                    draggable={false}
                    className="size-[2.5rem] sm:size-[3rem] lg:size-[4.6875rem] object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[image:var(--primary-gradient)] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                    style={{
                      maskImage: `url(${stat.icon})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskImage: `url(${stat.icon})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </div>

                <span className="font-neue-montreal text-xs sm:text-sm lg:text-xl tracking-wider text-neutral-800 uppercase">
                  {stat.label}
                </span>
              </div>

              {/* Divider — spans the full card width, darkens on card hover */}
              <div
                aria-hidden
                className="h-px bg-[#F3F4F6] transition-colors duration-500 ease-in-out group-hover:bg-black"
              />

              {/* Bottom part — count pinned to the card bottom, own padding */}
              <p className="font-serif text-3xl sm:text-4xl lg:text-7xl font-semibold leading-none text-neutral-900 px-2.5 sm:px-3 py-4 sm:py-6 lg:px-5 lg:py-10">
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

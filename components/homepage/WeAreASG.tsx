"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
    icon: "/icon/employee_experience.png",
  },
  {
    label: "Employee",
    value: 15000,
    suffix: "+",
    icon: "/icon/employee.png",
  },
  {
    label: "Government Award",
    value: 15,
    icon: "/icon/award.png",
  },
  {
    label: "Countries Reached",
    value: 17,
    icon: "/icon/fun-world.png",
  },
];

export default function WeAreASG() {
  const sectionRef = useRef<HTMLElement>(null);

  // Count each card's number up from 0 whenever the section scrolls into
  // view; leaving the section (either direction) resets the numbers to 0
  // so the count-up replays on every visit.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          paused: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="we-are-asg"
      className="relative flex w-full flex-col overflow-hidden"
      style={{ height: "calc(100vh - var(--header-height, 4.55rem))" }}
    >
      {/* Aerial background — swap with the real asset once it lands in
          /public/images/we-are-asg/. */}
      <Image
        src="/images/we-are-asg.png"
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
        className="pointer-events-none absolute top-[10%] left-[10%] z-10 font-serif text-[160px] leading-none uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
      >
        We Are
      </span>
      <span
        id="waa-asg"
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[19%] z-10 font-serif text-[160px] leading-none uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
      >
        ASG
      </span>

      {/* Stat cards */}
      <div className="relative z-20 flex min-h-0 flex-1 items-center px-20">
        <div className="grid w-full grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex h-[min(46vh,420px)] flex-col bg-white"
            >
              {/* Top part — icon + label, own padding */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="relative size-[75px] transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <Image
                    src={stat.icon}
                    alt=""
                    width={75}
                    height={75}
                    draggable={false}
                    className="size-[75px] object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
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

                <span className="font-neue-montreal text-xl tracking-wider text-neutral-800 uppercase">
                  {stat.label}
                </span>
              </div>

              {/* Divider — spans the full card width, darkens on card hover */}
              <div
                aria-hidden
                className="h-px bg-[#F3F4F6] transition-colors duration-500 ease-in-out group-hover:bg-black"
              />

              {/* Bottom part — count pinned to the card bottom, own padding */}
              <p className="font-serif text-7xl font-semibold leading-none text-neutral-900 px-5 py-10">
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

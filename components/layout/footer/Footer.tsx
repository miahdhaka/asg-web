"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface LinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface OfficeCard {
  title: string;
  address: string;
}

const linkColumns: LinkColumn[] = [
  {
    title: "About",
    links: [
      { label: "About US", href: "/about-us" },
      { label: "FAQ's", href: "/faqs" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact US", href: "/contact-us" },
      { label: "ASG Career", href: "/careers" },
    ],
  },
  {
    title: "Sistern Concern",
    links: [
      { label: "M/s Helal & Brothers Ltd.", href: "/concerns/helal-brothers" },
      { label: "Amanat Shah Fabrics Ltd.", href: "/concerns/amanat-shah-fabrics" },
      { label: "Hazrat Amanat Shah Spinnings Mills Ltd.", href: "/concerns/hazrat-amanat-shah-spinning-mills" },
      { label: "Miah & Miah Enterprise", href: "/concerns/miah" },
      // { label: "Farm2Firm Management Ltd.", href: "/concerns/farm2firm" },
      // { label: "Hazrat Amanat Shah Securities Ltd.", href: "/concerns/hazrat-amanat-shah-securities" },
      // { label: "Amanat Shah Weaving Processing Ltd.", href: "/concerns/amanat-shah-weaving-processing" },
      // { label: "Trust Knitwear Industries Ltd.", href: "/concerns/trust-knitwear-industries" },
      // { label: "Amanat Shah Tex Solution", href: "/concerns/amanat-shah-tex-solution" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

const offices: OfficeCard[] = [
  {
    title: "Head Office",
    address: "House-232, Lane-03, DOHS, Baridhara, Dhaka-1206, Bangladesh",
  },
  {
    title: "Corporate Head Office",
    address: "City Center (level-24), 90/1 Motijheel C/A, Dhaka-1000, Bangladesh.",
  },
  {
    title: "Head Office : Distribution",
    address: "Amanat Shah Tower Shekherchar, Baburhat Narsingdi, Bangladesh",
  },
  {
    title: "Showroom",
    address: "Amanullah Complex 87, Islampur, Dhaka-1100 Bangladesh",
  },
  {
    title: "Showroom",
    address: "Nawab Ali Market 1st floor Darsapur Bazar Shajadpur, Shirazganj Bangladesh",
  },
  {
    title: "Factory",
    address: "Bhatpara, Madhabdi Road 1603, Pachdona, Narsindi, Bangladesh",
  },
  {
    title: "Baikanthapur Tea Estate",
    address: "Noapara Bazar Modhabpur-3330, Hobiganj Bangladesh",
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: "/icons/social-icon/linkedin.png",
  },
  {
    label: "Facebook",
    href: "#",
    icon: "/icons/social-icon/facebook.png",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "/icons/social-icon/instagram.png",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const locationContentRef = useRef<HTMLDivElement>(null);
  const locationTweenRef = useRef<gsap.core.Tween | null>(null);

  // Animate location dropdown open/close on mobile
  useEffect(() => {
    const content = locationContentRef.current;
    if (!content) return;

    locationTweenRef.current?.kill();

    if (locationOpen) {
      gsap.set(content, { height: "auto" });
      const full = content.offsetHeight;
      gsap.set(content, { height: 0 });
      locationTweenRef.current = gsap.to(content, {
        height: full,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => gsap.set(content, { height: "auto" }),
      });
    } else {
      gsap.set(content, { height: content.offsetHeight });
      locationTweenRef.current = gsap.to(content, {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [locationOpen]);

  /* The oversized wordmark hides parked down behind the opaque offices
     block and slides up into place when the footer scrolls into view —
     deliberately unhurried (1.4s) — and drops back behind the block a
     bit quicker (0.8s) when the footer leaves. Mid-flight reversals
     (fast scrolling) scale the duration to the distance left, so the
     tween redirects at a consistent speed instead of crawling. */
  useGSAP(
    () => {
      const wordmark = wordmarkRef.current;
      const footer = footerRef.current;
      if (!wordmark || !footer) return;

      // Park it fully under the offices block (which paints above it)
      const PARKED = 140;
      gsap.set(wordmark, { yPercent: PARKED });

      const observer = new IntersectionObserver(
        ([entry]) => {
          const target = entry.isIntersecting ? 0 : PARKED;
          const base = entry.isIntersecting ? 1.4 : 0.8;
          // Fraction of the full travel still ahead of us (1 = full run)
          const current = Number(gsap.getProperty(wordmark, "yPercent"));
          const dist = Math.abs(current - target) / PARKED;
          gsap.to(wordmark, {
            yPercent: target,
            duration: Math.max(0.3, base * dist),
            ease: "power2.inOut",
            overwrite: "auto",
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(footer);
      return () => observer.disconnect();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full shrink-0 overflow-hidden bg-primary-black text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_100%_100%,rgba(139,195,74,0.28),transparent_65%)]"
      />

      <div className="relative z-10">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 px-4 pt-11 pb-10 sm:grid-cols-[1fr_1fr_1.4fr_1fr] sm:px-20">
          {linkColumns.map((column) => {
            const isFullWidth = column.title === "Sistern Concern" || column.title === "Legal";
            return (
              <div key={column.title} className={isFullWidth ? "col-span-2 sm:col-span-1" : ""}>
                <h3 className="font-neue-montreal text-base sm:text-lg tracking-wider text-white uppercase">
                  {column.title}
                </h3>
                <ul className="mt-2 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-neue-montreal text-sm sm:text-[0.9375rem] tracking-wider text-neutral-400 transition-colors duration-300 hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Oversized gradient wordmark — rises from behind the offices
            block below when the footer enters the viewport */}
        <p
          ref={wordmarkRef}
          aria-hidden
          className="pointer-events-none my-0 text-center font-serif font-semibold text-[clamp(1.5rem,4.5vw,4.5rem)] leading-[0.8] tracking-[0.1em] [word-spacing:0.02em] whitespace-nowrap uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent opacity-70 px-0 sm:px-20"
        >
          Amanat Shah Group
        </p>

        {/* Office addresses — dropdown on mobile, grid on desktop */}
        <div className="relative z-10 border-t border-white/10 bg-[var(--neutral-900)]">
          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setLocationOpen((v) => !v)}
            className="flex w-full cursor-pointer items-center justify-between px-6 py-5 lg:hidden"
          >
            <span className="font-neue-montreal text-base sm:text-lg font-medium tracking-wider text-white uppercase">
              Our Locations
            </span>
            <svg
              className={`size-4 text-neutral-400 transition-transform duration-300 ${locationOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Content: animated dropdown on mobile */}
          <div
            ref={locationContentRef}
            className="overflow-hidden lg:hidden"
            style={{ height: 0 }}
          >
            <div className="grid grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 sm:px-20">
              {offices.map((office) => (
                <div key={`${office.title}-${office.address}`}>
                  <h3 className="font-neue-montreal text-[15px] sm:text-lg font-medium tracking-wider text-white uppercase">
                    {office.title}
                  </h3>
                  <p className="text-sm sm:text-base font-neue-montreal sm:leading-tight text-neutral-400 mt-2">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: always visible, outside the animated container */}
          <div className="hidden grid-cols-7 gap-8 px-20 py-10 lg:grid" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
            {offices.map((office) => (
              <div key={`${office.title}-${office.address}`}>
                <h3 className="font-neue-montreal text-lg font-medium tracking-wider text-white uppercase">
                  {office.title}
                </h3>
                <p className="font-neue-montreal leading-tight text-neutral-400 mt-2">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright + socials */}
        <div className="relative flex flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between sm:px-20">
          <Image
            src="/images/footer-copywrite-bg.webp"
            alt=""
            fill
            sizes="100vw"
            draggable={false}
            className="pointer-events-none object-cover opacity-50"
            quality={80}
          />
          <p className="text-sm sm:text-base relative z-10 font-neue-montreal text-white">
            Copyright &copy; 2026 ASG Group. All Rights Reserved.
          </p>
          
          <div className="relative z-10 flex items-center gap-4">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="relative flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={20}
                  height={20}
                  quality={100}
                  draggable={false}
                  className="size-5 object-contain brightness-0 invert"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

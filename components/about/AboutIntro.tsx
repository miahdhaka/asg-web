"use client";

import { useState } from "react";
import Link from "next/link";

const paragraphs = [
  "One of the most reputable and diverse corporate empires in Bangladesh, Amanat Shah Group has been proudly upholding a tradition of excellence, integrity and entrepreneurship for almost 130 years. With operations in textiles, manufacturing, agriculture, financial services, real estate, information technology, industrial solutions, and other new sectors, the Group has developed from its traditional roots into a contemporary multi-sector Organization.",
  "Amanat Shah Group is committed to delivering sustainable growth through innovation, operational excellence, advanced technology and responsible business practices with a clear strategic vision and strong leadership.",
  "Built on the pillars of Quality, Reliability, Talent, System, Innovation and worldwide Responsibility, the Group continuously creates long-term value for customers, employees, shareholders and society. Today, ASG stands as a symbol of trust, resilience and sustainable business success, serving both local and international markets while shaping a stronger future for generations to come.",
];

const quickLinks = [
  { label: "OUR CONCERNS", href: "#" },
  { label: "LEADERSHIP", href: "#" },
  { label: "OUR HISTORY", href: "#" },
];

export default function AboutIntro() {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((prev) => !prev);

  return (
    <section id="about-intro" className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-6 sm:py-10 sm:py-12 lg:py-[5em]">
      {/* Lead statement */}
      <h2 className="text-xl sm:text-3xl lg:text-[2.5rem] sm:leading-[1.3] lg:leading-[1.2] text-neutral-800 max-w-full lg:max-w-[56.25rem] font-test-tiempos-fine">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Body copy — indented column */}
      <div className="relative flex flex-col gap-0 sm:gap-6 w-full lg:w-[55rem] lg:mx-auto mt-6 sm:mt-8 lg:mt-11">
        {/* Paragraphs — truncated on mobile, full on desktop */}
        <div
          className={`overflow-hidden transition-[max-height] duration-700 ease-in-out lg:overflow-visible ${
            expanded ? "max-h-[50rem]" : "max-h-48"
          } lg:max-h-none`}
        >
          <p
            className={`text-sm sm:text-base lg:text-lg text-neutral-800 text-justify tracking-wide leading-[1.6] line-clamp-animate ${expanded ? "clamp-expanded" : "clamp-collapsed"}`}
          >
            {paragraphs.map((text, i) => (
              <span key={text.slice(0, 24)}>
                {i > 0 && <><br /><br /></>}
                {text}
              </span>
            ))}
          </p>

          {/* Quick links — visible when expanded or on desktop */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out lg:max-h-[10rem] lg:opacity-100 mt-4"
            style={{
              maxHeight: expanded ? "10rem" : "0",
              opacity: expanded ? 1 : 0,
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-6 gap-y-3 lg:gap-8">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm sm:text-base lg:text-lg text-neutral-800 tracking-wide underline underline-offset-2 gradient-text-hover"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* "Read more" / "Show less" — mobile only */}
        <button
          onClick={toggle}
          className="gradient-text-showmore group ml-auto flex lg:hidden cursor-pointer items-center gap-1.5 tracking-wider text-sm sm:text-[0.95rem] font-medium transition-opacity duration-500 ease-in-out"
          style={{ opacity: expanded ? 0 : 1, pointerEvents: expanded ? "none" : "auto" }}
        >
          <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:origin-right after:bg-[var(--primary-gradient)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
            Read more
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">&#8594;</span>
        </button>
        <button
          onClick={toggle}
          className="gradient-text-showmore group ml-auto flex lg:hidden cursor-pointer items-center gap-1.5 tracking-wider text-sm sm:text-[0.95rem] font-medium transition-opacity duration-500 ease-in-out"
          style={{ opacity: expanded ? 1 : 0, pointerEvents: expanded ? "auto" : "none", visibility: expanded ? "visible" : "hidden", height: expanded ? "auto" : 0, overflow: "hidden" }}
        >
          <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:origin-right after:bg-[var(--primary-gradient)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
            Show less
          </span>
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">&#8593;</span>
        </button>
      </div>
    </section>
  );
}

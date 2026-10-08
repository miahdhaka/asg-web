"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, Search as SearchIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navCategories } from "./navData";
import type { NavCategory } from "./types";

gsap.registerPlugin(useGSAP);

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Accordion menu item with smooth subcategory expand/collapse ─── */
function SidebarMenuItem({
  category,
  isExpanded,
  onToggle,
  onClose,
}: {
  category: NavCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const subListRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const itemsWrapRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const items = category.megaItems ?? category.children ?? [];

  // Animate whenever isExpanded changes (controlled from parent)
  useEffect(() => {
    const subList = subListRef.current;
    const chevron = chevronRef.current;
    const itemsWrap = itemsWrapRef.current;
    if (!subList || !chevron) return;

    tweenRef.current?.kill();

    if (isExpanded) {
      // Expand: measure natural height, then animate
      gsap.set(subList, { height: "auto" });
      const fullHeight = subList.offsetHeight;
      gsap.set(subList, { height: 0 });
      tweenRef.current = gsap.to(subList, {
        height: fullHeight,
        duration: 0.4,
        ease: "power3.out",
        onComplete: () => gsap.set(subList, { height: "auto" }),
      });
      // Chevron points right when collapsed, rotates down when expanded
      gsap.to(chevron, { rotation: 90, duration: 0.3, ease: "power2.out" });

      // Stagger children in
      if (itemsWrap) {
        const kids = itemsWrap.children;
        gsap.fromTo(
          kids,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power2.out", delay: 0.08 },
        );
      }
    } else {
      // Collapse: animate height to 0
      gsap.set(subList, { height: subList.offsetHeight });
      tweenRef.current = gsap.to(subList, {
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(chevron, { rotation: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [isExpanded]);

  // Plain link (no subcategories) — e.g. "Contact"
  if (items.length === 0 && category.href) {
    return (
      <Link
        href={category.href}
        onClick={onClose}
        className="flex items-center justify-between border-b border-neutral-200 py-5 font-neue-montreal text-base font-medium text-neutral-900 transition-colors duration-200 active:bg-neutral-50"
      >
        {category.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-neutral-200">
      {/* Label row — click to expand/collapse */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between py-5 font-neue-montreal text-base font-medium text-neutral-900 transition-colors duration-200"
      >
        <span>{category.label}</span>
        <span ref={chevronRef} className="flex items-center">
          <ChevronRight className="size-5 text-neutral-500" />
        </span>
      </button>

      {/* Subcategory list — animated height, plain text rows with dividers */}
      <div
        ref={subListRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div
          ref={itemsWrapRef}
          className="flex flex-col pb-1"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="border-b border-neutral-100 py-3.5 font-neue-montreal text-[15px] text-neutral-700 transition-colors duration-200 last:border-b-0 active:bg-neutral-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Sidebar ─── */
export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Track which menu is currently expanded — only one at a time
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Reset expanded menu when sidebar closes
  useEffect(() => {
    if (!isOpen) setActiveMenu(null);
  }, [isOpen]);

  // Lock body scroll while sidebar is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Animate the full-screen panel in/out
  useGSAP(
    () => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      tweenRef.current?.kill();

      if (isOpen) {
        tweenRef.current = gsap.fromTo(
          sidebar,
          { x: "-100%" },
          { x: "0%", duration: 0.35, ease: "power3.out" },
        );
      } else {
        tweenRef.current = gsap.to(sidebar, {
          x: "-100%",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isOpen] },
  );

  if (!isOpen) return null;

  return (
    <div
      ref={sidebarRef}
      className="fixed inset-0 z-[70] flex w-full flex-col bg-white"
      style={{ transform: "translateX(-100%)" }}
    >
      {/* Top bar — close (left) · logo (center) · search (right) */}
      <div className="relative flex shrink-0 items-center justify-between border-b border-neutral-200 px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full p-1 transition-colors hover:bg-neutral-100"
          aria-label="Close menu"
        >
          <X className="size-6 text-neutral-800" />
        </button>

        <Link
          href="/"
          onClick={onClose}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="ASG Home"
        >
          <Image
            src="/logo/asg-icon.png"
            alt="Amanat Shah Group"
            width={48}
            height={48}
            className="h-9 w-9 object-contain"
            priority
          />
        </Link>

        <button
          type="button"
          className="cursor-pointer rounded-full p-1 transition-colors hover:bg-neutral-100"
          aria-label="Search"
        >
          <SearchIcon className="size-6 text-neutral-800" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto px-5">
        {navCategories.map((category) => (
          <SidebarMenuItem
            key={category.label}
            category={category}
            isExpanded={activeMenu === category.label}
            onToggle={() =>
              setActiveMenu((prev) =>
                prev === category.label ? null : category.label,
              )
            }
            onClose={onClose}
          />
        ))}
      </nav>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
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
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const subListRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const items = category.megaItems ?? category.children ?? [];

  const toggle = useCallback(() => {
    const subList = subListRef.current;
    const chevron = chevronRef.current;
    if (!subList || !chevron) return;

    tweenRef.current?.kill();
    const next = !expanded;
    setExpanded(next);

    if (next) {
      // Expand: measure natural height, then animate
      gsap.set(subList, { height: "auto" });
      const fullHeight = subList.offsetHeight;
      gsap.set(subList, { height: 0 });
      tweenRef.current = gsap.to(subList, {
        height: fullHeight,
        duration: 0.35,
        ease: "power3.out",
        onComplete: () => gsap.set(subList, { height: "auto" }),
      });
      gsap.to(chevron, { rotation: 90, duration: 0.3, ease: "power2.out" });
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
  }, [expanded]);

  // Plain link (no subcategories)
  if (items.length === 0 && category.href) {
    return (
      <Link
        href={category.href}
        onClick={onClose}
        className="flex items-center justify-between py-4 text-base font-medium uppercase tracking-wider text-neutral-800 transition-colors duration-200 hover:text-neutral-600"
      >
        {category.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-100">
      {/* Label row — click to expand/collapse */}
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between py-4 text-base font-medium uppercase tracking-wider text-neutral-800 transition-colors duration-200 hover:text-neutral-600"
      >
        <span>{category.label}</span>
        <span ref={chevronRef} className="flex items-center">
          <ChevronRight className="size-4 text-neutral-400" />
        </span>
      </button>

      {/* Subcategory list — animated height */}
      <div
        ref={subListRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="flex flex-col gap-1 pb-3 pl-3">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="rounded-md px-2 py-2 text-sm text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-900"
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const overlayTweenRef = useRef<gsap.core.Tween | null>(null);

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

  // Animate sidebar + overlay in/out
  useGSAP(
    () => {
      const sidebar = sidebarRef.current;
      const overlay = overlayRef.current;
      if (!sidebar || !overlay) return;

      tweenRef.current?.kill();
      overlayTweenRef.current?.kill();

      if (isOpen) {
        tweenRef.current = gsap.fromTo(
          sidebar,
          { x: "-100%" },
          { x: "0%", duration: 0.35, ease: "power3.out" },
        );
        overlayTweenRef.current = gsap.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        );
      } else {
        tweenRef.current = gsap.to(sidebar, {
          x: "-100%",
          duration: 0.3,
          ease: "power2.in",
        });
        overlayTweenRef.current = gsap.to(overlay, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isOpen] },
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black/50"
        style={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        ref={sidebarRef}
        className="fixed inset-y-0 left-0 z-[70] flex w-[280px] flex-col bg-white shadow-xl"
        style={{ transform: "translateX(-100%)" }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo/ASG-logo.png"
              alt="Amanat Shah Group"
              width={80}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1.5 transition-colors hover:bg-neutral-100"
            aria-label="Close menu"
          >
            <X className="size-5 text-neutral-700" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          {navCategories.map((category) => (
            <SidebarMenuItem
              key={category.label}
              category={category}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

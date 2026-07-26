"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { navCategories } from "./navData";
import type { NavCategory } from "./types";
import MegaMenu from "./MegaMenu";

/* Gradient bottom-border shown on hover, pinned to the header's bottom edge */
const GRADIENT_BORDER = "linear-gradient(97.37deg, #8BC34A 1.29%, #1AA179 88.53%)";

function HoverBorder({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -bottom-[25px] left-0 h-0.5 w-full origin-left transition-transform duration-300 ease-in-out ${
        active ? "scale-x-100" : "scale-x-0 group-hover/navitem:scale-x-100"
      }`}
      style={{ background: GRADIENT_BORDER }}
    />
  );
}

/* ─── Nav item ─── */
function NavItem({ category }: { category: NavCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Plain link
  if (category.href && !category.megaMenu && !category.children) {
    return (
      <Link
        href={category.href}
        className="group/navitem relative px-2 text-base font-medium uppercase text-nowrap cursor-pointer text-[var(--neutral-800)] transition-colors duration-200 ease-in-out font-neue-montreal"
      >
        {category.label}
        <HoverBorder />
      </Link>
    );
  }

  // Mega menu or dropdown
  const hasDropdown = category.megaMenu || (category.children && category.children.length > 0);

  return (
    <div
      className="group/navitem relative"
      onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
      onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
    >
      <button
        type="button"
        className="px-2 text-base font-medium uppercase text-nowrap cursor-pointer text-[var(--neutral-800)] transition-colors duration-200 ease-in-out font-neue-montreal"
      >
        {category.label}
      </button>

      <HoverBorder active={isOpen} />

      {/* Mega menu */}
      {category.megaMenu && category.megaItems && (
        <MegaMenu items={category.megaItems} isOpen={isOpen} variant={category.megaVariant} />
      )}

      {/* Simple dropdown */}
      {category.children && !category.megaMenu && isOpen && (
        <div className="absolute top-full left-0 z-50 min-w-48 pt-2">
          <div className="rounded-lg border border-border bg-background p-2 shadow-lg">
            {category.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Navigation ─── */
export default function Navigation() {
  return (
    <nav className="flex items-center gap-4">
      {navCategories.map((category) => (
        <NavItem key={category.label} category={category} />
      ))}
    </nav>
  );
}

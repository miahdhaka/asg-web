"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { navCategories } from "./navData";
import type { NavCategory } from "./types";
import MegaMenu from "./MegaMenu";

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
        className="text-xs font-medium uppercase cursor-pointer text-[var(--text-primary)] transition-colors duration-200 ease-in-out font-neue-montreal
        "
      >
        {category.label}
      </Link>
    );
  }

  // Mega menu or dropdown
  const hasDropdown = category.megaMenu || (category.children && category.children.length > 0);

  return (
    <div
      className="relative"
      onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
      onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
    >
      <button
        type="button"
        className="text-xs font-medium uppercase cursor-pointer text-[var(--text-primary)] transition-colors duration-200 ease-in-out font-neue-montreal"
      >
        {category.label}
      </button>

      {/* Mega menu */}
      {category.megaMenu && category.megaItems && (
        <MegaMenu items={category.megaItems} isOpen={isOpen} />
      )}

      {/* Simple dropdown */}
      {category.children && !category.megaMenu && isOpen && (
        <div className="absolute top-full left-0 z-50 min-w-48 pt-2">
          <div className="rounded-lg border border-border bg-background p-2 shadow-lg">
            {category.children.map((child) => (
              <Link
                key={child.href}
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
    <nav className="flex items-center gap-6">
      {navCategories.map((category) => (
        <NavItem key={category.label} category={category} />
      ))}
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navCategories } from "./navData";
import type { NavCategory, MegaMenuItem } from "./types";

/* ─── Shared label + green gradient bottom border ───
   Hovering (or the mega menu being open on) an item draws a gradient border
   line under it. Plain direct links (e.g. Contact) skip the underline —
   only mega-menu categories get it. */
function NavLabel({
  label,
  active,
  underline = true,
}: {
  label: string;
  active: boolean;
  underline?: boolean;
}) {
  return (
    <span className="relative inline-block">
      {label}
      {underline && (
        <span
          className={`absolute -bottom-[28px] left-0 right-0 z-10 h-[3px] origin-left bg-[image:var(--primary-gradient)] transition-transform duration-300 ease-out ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
        />
      )}
    </span>
  );
}

/* ─── Nav item ─── */
function NavItem({
  category,
  activeLabel,
  onMenuChange,
  ready,
}: {
  category: NavCategory;
  /** The mega menu currently open (drives the green underline). */
  activeLabel: string | null;
  /** Report the hovered category up so the pill expands downward. */
  onMenuChange?: (label: string | null, items: MegaMenuItem[] | null) => void;
  /** Pill is fully open — mega menu may only open once this is true. */
  ready?: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  const pathname = usePathname();

  const hasMega = !!(category.megaMenu && category.megaItems);
  const active = activeLabel === category.label;

  /* Open the mega menu on hover, but only once the pill is FULLY open.
     We never close from here — the Header closes when the cursor leaves the
     whole pill, so moving down into the mega keeps it open. Depending on
     [hovering, ready] means if the cursor is already resting on the item when
     `ready` flips true, the menu still opens (no need to re-hover). */
  useEffect(() => {
    if (hasMega && hovering && ready) {
      onMenuChange?.(category.label, category.megaItems!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, ready]);

  // Reset on route change
  useEffect(() => {
    setHovering(false);
  }, [pathname]);

  // Plain direct link (no mega menu) — preserves normal navigation
  if (category.href && !hasMega) {
    return (
      <Link
        href={category.href}
        onMouseEnter={() => onMenuChange?.(null, null)}
        className="group/navitem relative cursor-pointer text-lg font-medium text-nowrap text-neutral-800 transition-colors duration-200 ease-in-out font-neue-montreal hover:text-neutral-950"
      >
        <NavLabel label={category.label} active={false} underline={false} />
      </Link>
    );
  }

  // Mega-menu trigger — hovering opens the pill's downward expansion
  return (
    <div
      className="group/navitem relative"
      onMouseEnter={hasMega ? () => setHovering(true) : undefined}
      onMouseLeave={hasMega ? () => setHovering(false) : undefined}
    >
      <button
        type="button"
        className={`relative cursor-pointer text-lg font-medium text-nowrap transition-colors duration-200 ease-in-out font-neue-montreal ${
          active ? "text-neutral-950" : "text-neutral-800 hover:text-neutral-950"
        }`}
      >
        <NavLabel label={category.label} active={active} />
      </button>
    </div>
  );
}

/* ─── Main Navigation ─── */
export default function Navigation({
  activeLabel,
  onMenuChange,
  ready,
}: {
  activeLabel: string | null;
  onMenuChange?: (label: string | null, items: MegaMenuItem[] | null) => void;
  ready?: boolean;
}) {
  return (
    <nav className="flex items-center gap-10">
      {navCategories.map((category) => (
        <NavItem
          key={category.label}
          category={category}
          activeLabel={activeLabel}
          onMenuChange={onMenuChange}
          ready={ready}
        />
      ))}
    </nav>
  );
}

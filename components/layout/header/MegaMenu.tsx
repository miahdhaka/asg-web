"use client";

import Link from "next/link";
import type { MegaMenuItem } from "./types";

interface MegaMenuProps {
  items: MegaMenuItem[];
  /** Rendered inline inside the navbar pill now — kept for API compatibility. */
  isOpen?: boolean;
  variant?: "photo" | "logo";
  onNavigate?: () => void;
}

/**
 * The hovered category's links, rendered INLINE inside the navbar pill:
 * the pill itself expands vertically (GSAP height tween in Header) so the
 * menu is not a separate panel — it's the same surface growing downwards,
 * with the pill's border radius kept identical on all sides.
 * No pathname-based highlight here — every item uses the same neutral color
 * so navigating into a page doesn't leave its mega-menu entry tinted green
 * when the user reopens the same category.
 */
export default function MegaMenu({ items, onNavigate }: MegaMenuProps) {
  return (
    <div className="flex flex-col items-start gap-0 px-8 pt-4 pb-6">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onNavigate}
          className="py-3 text-[length:var(--mega-font-size)] font-normal tracking-wide font-neue-montreal bg-[image:var(--primary-gradient)] bg-clip-text [-webkit-text-fill-color:#262626] [transition-property:-webkit-text-fill-color,translate] [transition-duration:300ms] [transition-timing-function:ease-in-out] hover:translate-x-1.5 hover:[-webkit-text-fill-color:transparent]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

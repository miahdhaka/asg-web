"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MegaMenuItem } from "./types";

interface MegaMenuProps {
  items: MegaMenuItem[];
  /** Rendered inline inside the navbar pill now — kept for API compatibility. */
  isOpen?: boolean;
  variant?: "photo" | "logo";
  onNavigate?: () => void;
}

/* A link is the current page on an exact match or when the path nests under it
   (e.g. /board-of-directors/chairman is active for /board-of-directors). */
function isRouteActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * The hovered category's links, rendered INLINE inside the navbar pill:
 * the pill itself expands vertically (GSAP height tween in Header) so the
 * menu is not a separate panel — it's the same surface growing downwards,
 * with the pill's border radius kept identical on all sides.
 * The entry matching the current page keeps its gradient text lit (the same
 * treatment as the mobile sidebar); every other item stays neutral until hovered.
 */
export default function MegaMenu({ items, onNavigate }: MegaMenuProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-start gap-0 px-8 pt-4 pb-6">
      {items.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={`py-3 text-[length:var(--mega-font-size)] font-normal tracking-wide font-neue-montreal bg-[image:var(--primary-gradient)] bg-clip-text [transition-property:translate] [transition-duration:300ms] [transition-timing-function:ease-in-out] hover:translate-x-1.5 ${
              active ? "[-webkit-text-fill-color:transparent]" : "[-webkit-text-fill-color:#262626]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

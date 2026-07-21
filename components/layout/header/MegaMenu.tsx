"use client";

import Image from "next/image";
import Link from "next/link";
import type { MegaMenuItem } from "./types";

interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
}

export default function MegaMenu({ items, isOpen }: MegaMenuProps) {
  return (
    <div
      className={`fixed left-0 z-50 w-screen bg-white shadow-lg transition-all duration-150 ease-out ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{ top: "var(--header-height, 3.25rem)" }}
    >
          <div className="px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="mt-3 text-sm font-medium text-gray-900 transition-colors group-hover:text-gray-600">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
    </div>
  );
}

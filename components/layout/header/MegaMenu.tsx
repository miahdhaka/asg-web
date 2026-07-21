"use client";

import Image from "next/image";
import Link from "next/link";
import type { MegaMenuItem } from "./types";

interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
  variant?: "photo" | "logo";
}

export default function MegaMenu({ items, isOpen, variant = "photo" }: MegaMenuProps) {
  const isLogo = variant === "logo";

  return (
    <div
      className={`fixed left-0 z-50 w-screen bg-white shadow-lg transition-all duration-150 ease-out ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{ top: "var(--header-height, 4.55rem)" }}
    >
          <div className="px-6 py-8">
            <div className={`grid grid-cols-5 ${isLogo ? "gap-x-4 gap-y-8" : "gap-4"}`}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-start text-left"
                >
                  <div
                    className={`relative aspect-[5/3] w-full overflow-hidden ${
                      isLogo ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className={isLogo ? "object-contain p-14" : "object-cover"}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {item.hoverImage && (
                      <Image
                        src={item.hoverImage}
                        alt={item.label}
                        fill
                        className={`${
                          isLogo ? "object-contain p-14" : "object-cover"
                        } opacity-0 transition-opacity duration-600 ease-in-out group-hover:opacity-100`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    {!isLogo && (
                      <div className="overlay-image-hover pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />
                    )}
                  </div>
                  {item.label && (
                    <span className="relative inline-block text-sm text-gray-900 tracking-wider mt-3 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out group-hover:after:scale-x-100">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
    </div>
  );
}

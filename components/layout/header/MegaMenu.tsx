"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { MegaMenuItem } from "./types";

interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
  variant?: "photo" | "logo";
  onNavigate?: () => void;
}

export default function MegaMenu({ items, isOpen, variant = "photo", onNavigate }: MegaMenuProps) {
  const isLogo = variant === "logo";
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleClick = (href: string) => {
    onNavigate?.();
    router.push(href);
  };

  return createPortal(
    <div
      className={`fixed left-0 w-screen bg-white shadow-lg transition-[opacity,transform] duration-150 ease-out ${
        isOpen ? "opacity-100 translate-y-0 z-[70]" : "opacity-0 translate-y-2 pointer-events-none z-[60]"
      }`}
      style={{ top: "var(--header-height)" }}
    >
          <div className="px-6 py-8">
            <div className={`grid ${isLogo ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8" : "grid-cols-6 gap-4"}`}>
              {items.map((item) => (
                <div
                  key={item.label}
                  role="link"
                  tabIndex={0}
                  onClick={() => handleClick(item.href)}
                  className="group flex flex-col items-start text-left cursor-pointer"
                >
                  <div
                    className={`relative aspect-[5/3] w-full overflow-hidden ${
                      isLogo ? "bg-gray-100" : "bg-gray-100"
                    }`}
                  >
                    <Image
                      src={item.hoverImage || item.image}
                      alt={item.label}
                      fill
                      loading="eager"
                      className={`${isLogo ? "object-contain p-[20%]" : "object-cover"} grayscale transition-[filter] duration-500 ease-in-out group-hover:grayscale-0`}
                      sizes={isLogo ? "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" : "(max-width: 768px) 100vw, 33vw"}
                      quality={90}
                    />
                    {!isLogo && (
                      <div className="overlay-image-hover pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />
                    )}
                  </div>
                  
                  {item.label && (
                    <span className="relative inline-block text-sm tracking-wider text-[var(--neutral-800)] gradient-text-hover mt-3">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
    </div>,
    document.body,
  );
}

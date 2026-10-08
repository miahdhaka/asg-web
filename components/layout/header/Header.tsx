"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, Search as SearchIcon } from "lucide-react";
import Navigation from "./Navigation";
import MegaMenu from "./MegaMenu";
import type { MegaMenuItem } from "./types";
import Search from "./Search";
import MobileSidebar from "./MobileSidebar";

gsap.registerPlugin(useGSAP);

/* Which mega menu is currently open (by category label + its items) */
interface ActiveMenu {
  label: string;
  items: MegaMenuItem[];
}

/* Short-form labels for individual concern pages (shown in the compact pill) */
const CONCERN_LABELS: Record<string, string> = {
  "helal-brothers": "H&B",
  "hazrat-amanat-shah-spinning-mills": "HASSML",
  "amanat-shah-weaving-processing": "ASWPL",
  "amanat-shah-fabrics": "ASFL",
  "miah": "MIAH",
  "trust-knitwear-industries": "TRUST",
  "hazrat-amanat-shah-securities": "HASSL",
  "farm2firm": "F2F",
  "amanat-shah-tex-solution": "TEX SOLUTION",
  "asg-dynamic": "ASG DYNAMIC",
};

/* Short-form labels for individual sustainability pages (shown in the compact pill) */
const SUSTAINABILITY_LABELS: Record<string, string> = {
  "environmental-social-governance": "ESG",
  "corporate-social-responsibility": "CSR",
  "women-empowerment": "Empowerment",
};

/* Derive the current page label from pathname (shown in the compact pill) */
function getCurrentPageLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/about-us")) return "About";
  if (pathname.startsWith("/board-of-directors")) return "Management";
  if (pathname.startsWith("/our-history")) return "History";
  if (pathname.startsWith("/concerns")) {
    const slug = pathname.split("/").filter(Boolean)[1];
    return (slug && CONCERN_LABELS[slug]) || "Concerns";
  }
  if (pathname.startsWith("/sustainability")) {
    const slug = pathname.split("/").filter(Boolean)[1];
    return (slug && SUSTAINABILITY_LABELS[slug]) || "Sustainability";
  }
  if (pathname.startsWith("/newsroom")) return "Media & Press";
  if (pathname.startsWith("/media-galleries")) return "Media & Press";
  if (pathname.startsWith("/contact-us")) return "Contact";
  if (pathname.startsWith("/careers")) return "Careers";
  if (pathname.startsWith("/faqs")) return "FAQs";
  if (pathname.startsWith("/privacy-policy")) return "Privacy";
  if (pathname.startsWith("/terms-of-use")) return "Terms";
  return "ASG";
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const megaWrapRef = useRef<HTMLDivElement>(null);
  const megaContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /* Bumped on viewport resize — nav font sizes are fluid (vw-based), so the
     cached px widths in the swap timeline go stale and must be re-measured. */
  const [resizeTick, setResizeTick] = useState(0);
  /* Pill radius: stays 30px while the mega zone is visible and only snaps back
     to full-round once the collapse (rise-up) tween has fully finished. */
  const [megaRadius, setMegaRadius] = useState(false);
  const pathname = usePathname();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const currentPageLabel = getCurrentPageLabel(pathname);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(id);
      id = setTimeout(() => setResizeTick((t) => t + 1), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(id);
    };
  }, []);

  /* The pill is "expanded" (full nav shown) while hovered, while search is
     open, or while a mega menu is open — mega keeps it wide so the submenu
     has room and the header never collapses mid-interaction. */
  const expanded = hovered || searchOpen || activeMenu !== null;

  /* Publish the collapsed header-row height as --header-height so other
     sections (search panel, page offsets) stay stable regardless of whether
     the mega menu is expanded. */
  useEffect(() => {
    const desktop = rowRef.current;
    const mobile = mobileBarRef.current;
    if (!desktop && !mobile) return;
    const publish = () => {
      // Use whichever bar is visible — the floating desktop pill (hidden below
      // lg) or the full-width mobile top bar (hidden at lg+). A display:none
      // element measures 0, so the visible bar always wins.
      const h =
        desktop?.getBoundingClientRect().height ||
        mobile?.getBoundingClientRect().height ||
        0;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    };
    publish();
    const observer = new ResizeObserver(publish);
    if (desktop) observer.observe(desktop);
    if (mobile) observer.observe(mobile);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while search is open
  useEffect(() => {
    if (searchOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [searchOpen]);

  // Close overlays whenever the route changes
  useEffect(() => {
    setSearchOpen(false);
    setSearchText("");
    setActiveMenu(null);
  }, [pathname]);

  // Focus the in-pill search input as soon as search opens
  useEffect(() => {
    if (!searchOpen) return;
    const id = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [searchOpen]);

  /* Click-outside + Escape close the mega menu (desktop). */
  useEffect(() => {
    if (!activeMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [activeMenu]);

  /* Hovering a nav item (once the pill is fully open) opens its mega menu;
     lifting null closes it. Opening one closes search. */
  const handleMenuChange = useCallback(
    (label: string | null, items: MegaMenuItem[] | null) => {
      if (label && items) {
        setSearchOpen(false);
        setActiveMenu({ label, items });
      } else {
        setActiveMenu(null);
      }
    },
    []
  );

  const handleSearchChange = useCallback((open: boolean) => {
    setSearchOpen(open);
    if (open) setActiveMenu(null);
    else setSearchText("");
  }, []);

  /* Compact → expand width animation: the pill starts small showing the
     current-page label, and smoothly grows to reveal the full nav on hover.
     One persistent paused timeline plays forward on expand and reverses on
     collapse, so mid-flight direction changes stay perfectly smooth. */
  const swapTlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const wrap = navWrapRef.current;
      const label = labelRef.current;
      const nav = navInnerRef.current;
      if (!wrap || !label || !nav) return;

      const labelW = label.offsetWidth;
      const navW = nav.offsetWidth;

      // Rebuild only if the measured widths changed (new page label, resize)
      const cached = swapTlRef.current?.vars.data as
        | { lw: number; nw: number }
        | undefined;
      if (!swapTlRef.current || cached?.lw !== labelW || cached?.nw !== navW) {
        swapTlRef.current?.kill();
        const tl = gsap.timeline({
          paused: true,
          data: { lw: labelW, nw: navW },
        });
        tl.fromTo(wrap, { width: labelW }, {
          width: navW,
          duration: 0.8,
          ease: "power3.inOut",
        }, 0)
          .fromTo(label, { opacity: 1 }, {
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
        }, 0)
          .fromTo(nav, { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        }, 0.4);
        // Always start a rebuilt timeline CLOSED. If the rebuild fires on the
        // same tick that expanded turned true (web fonts finishing late change
        // the measured widths right when the first hover happens), jumping it
        // to progress(1) would SNAP the pill open — starting at 0 lets the
        // expand branch below play the fresh timeline smoothly.
        tl.progress(0);
        swapTlRef.current = tl;
      }

      if (expanded) {
        // Nav items stay inert until the pill is FULLY open — hovering an item
        // mid-animation must not pop the mega menu under the cursor.
        const tl = swapTlRef.current;
        if (tl.progress() === 1) setNavReady(true);
        else {
          tl.eventCallback("onComplete", () => setNavReady(true));
          tl.play();
        }
      } else {
        setNavReady(false);
        swapTlRef.current.eventCallback("onComplete", null);
        swapTlRef.current.reverse();
      }
    },
    { dependencies: [expanded, currentPageLabel, resizeTick] }
  );

  /* Mega menu = the SAME pill expanding downward. Height is measured from the
     content and tweened px↔px (open / switch / close all smooth); the submenu
     fades + slides up on open and cross-fades when switching categories. */
  const megaTlRef = useRef<gsap.core.Timeline | null>(null);
  const wasOpenRef = useRef(false);
  const prevLabelRef = useRef<string | null>(null);

  useGSAP(
    () => {
      const wrap = megaWrapRef.current;
      const content = megaContentRef.current;
      if (!wrap || !content) return;

      const open = activeMenu !== null || searchOpen;
      if (!open && !wasOpenRef.current) return; // first mount while closed

      // One pseudo-key for the panel content: the mega category's label, or
      // a fixed id for the search results — lets open/switch/close all be
      // measured the same way regardless of which mode drove the change.
      const key = activeMenu?.label ?? (searchOpen ? "__search__" : null);

      const comingFromClosed = !wasOpenRef.current;
      const switching =
        open &&
        prevLabelRef.current !== null &&
        prevLabelRef.current !== key;

      wasOpenRef.current = open;
      prevLabelRef.current = key;

      megaTlRef.current?.kill();
      const tl = gsap.timeline();

      if (open) {
        setMegaRadius(true);
        const target = content.scrollHeight;
        tl.to(wrap, { height: target, duration: 0.5, ease: "power3.out" }, 0);
        if (comingFromClosed) {
          tl.fromTo(
            content,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.12
          );
        } else if (switching) {
          // Gentle crossfade (no full opacity flash) so switching between
          // categories reads as the SAME panel smoothly morphing its content.
          tl.fromTo(
            content,
            { opacity: 0.35, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0
          );
        }
      } else {
        tl.to(content, { opacity: 0, y: 10, duration: 0.25, ease: "power2.in" }, 0);
        tl.to(wrap, { height: 0, duration: 0.5, ease: "power3.inOut" }, 0.05);
        // Only restore the full-round pill after the panel has fully risen.
        tl.call(() => setMegaRadius(false));
      }
      megaTlRef.current = tl;
    },
    { dependencies: [activeMenu, searchOpen] }
  );

  /* Hover-out grace: wait briefly before collapsing so edge jitter doesn't
     start/abort the shrink animation. Leaving the WHOLE pill closes the mega
     (the mega lives inside the pill, so moving into it never fires this). */
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(true);
  };
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false);
      setActiveMenu(null);
    }, 150);
  };

  /* Safety net: if the mega-close tween is ever killed externally (e.g. by a
     global gsap kill on route change), the wrap would be stuck at a non-zero
     height. Force-collapse after the 500 ms animation window. */
  useEffect(() => {
    if (activeMenu || searchOpen) return;
    const id = setTimeout(() => {
      const wrap = megaWrapRef.current;
      if (wrap && !activeMenu && !searchOpen && wrap.getBoundingClientRect().height > 1) {
        gsap.set(wrap, { height: 0 });
      }
    }, 600);
    return () => clearTimeout(id);
  }, [activeMenu, searchOpen]);

  return (
    <>
      {/* Soft blurred backdrop behind search — click to close */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/10 backdrop-blur-md cursor-pointer transition-opacity duration-300"
          onClick={() => handleSearchChange(false)}
        />
      )}

      {/* Mobile top bar — full-width (hamburger · centered logo · search).
          Replaces the floating desktop pill below lg so mobile matches the
          reference design; hidden at lg+ where the pill takes over. */}
      <div
        ref={mobileBarRef}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between rounded-b-[1.4rem] border-b border-neutral-200 bg-white/85 px-4 py-4 shadow-[0px_8px_24px_0px_#0000001a] backdrop-blur-[15px] lg:hidden"
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="cursor-pointer rounded-full p-1 transition-colors hover:bg-neutral-100"
          aria-label="Open menu"
        >
          <Menu className="size-6 text-neutral-800" strokeWidth={1.8} />
        </button>

        <Link
          href="/"
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

      <header
        ref={headerRef}
        className="fixed top-5 left-0 right-0 z-50 hidden justify-center pointer-events-none lg:flex"
      >
        {/* One floating capsule: compact pill that grows HORIZONTALLY on hover
            (nav) and DOWNWARD on click (mega). Full round while collapsed AND
            while hover-expanded; only the mega/search drop takes the 30px. */}
        <div
          ref={pillRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className={`pointer-events-auto flex flex-col overflow-hidden bg-white/80 backdrop-blur-[15px] shadow-[0px_12px_32px_0px_#00000026] border border-white/60 ${
            megaRadius ? "rounded-[30px]" : "rounded-full"
          }`}
        >
          {/* Header row: logo · nav (swap zone) · right icons. Height is fluid
              (--header-row-h) so the pill scales with viewport width. */}
          <div ref={rowRef} className="flex items-center gap-4 px-8 h-[var(--header-row-h)]">
            <Link
              href="/"
              id="header-logo"
              className="flex items-center shrink-0 relative z-10"
              aria-label="ASG Home"
            >
              <Image
                src="/logo/asg-icon.png"
                alt="Amanat Shah Group"
                width={44}
                height={44}
                priority
                className="h-11 w-11 object-contain"
              />
            </Link>

            {/* Desktop swap zone: page label (compact) ↔ full nav (expanded).
                Width animated by GSAP; label stays in flow, nav overlays it. */}
            <div
              ref={navWrapRef}
              className="relative z-20 hidden lg:flex items-center self-stretch overflow-clip [overflow-clip-margin:8px]"
            >
              <span
                ref={labelRef}
                className="inline-block whitespace-nowrap px-1 text-[length:var(--nav-font-size)] font-medium text-neutral-800 font-neue-montreal"
              >
                {currentPageLabel}
              </span>

              <div
                ref={navInnerRef}
                className={`absolute left-0 top-1/2 -translate-y-1/2 px-32 ${
                  expanded ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <Navigation
                  activeLabel={activeMenu?.label ?? null}
                  onMenuChange={handleMenuChange}
                  ready={navReady}
                />
              </div>

              {/* Search mode: gradient-bordered input overlays the same zone
                  the nav occupies — the pill is already fully expanded. */}
              {searchOpen && (
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="flex h-12 w-full items-center rounded-full bg-[image:var(--primary-gradient)] p-[2px]">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="How can we help you today?"
                      className="block h-full w-full rounded-full border-0 bg-white px-5 text-base md:text-lg font-neue-montreal text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mobile spacer pushes the right controls to the edge */}
            <div className="flex-1 lg:hidden" />

            {/* Right icons: compact pill shows the hamburger (3-line) icon,
                which opens the sidebar; expanding the pill crossfades to
                search so the corner is never empty mid-animation. */}
            <div className="grid shrink-0 z-10 place-items-center">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className={`col-start-1 row-start-1 cursor-pointer rounded-full p-1.5 transition-opacity duration-300 ${
                  expanded ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
                aria-label="Open menu"
              >
                <Menu className="size-6 text-neutral-700" strokeWidth={1.8} />
              </button>

              <div
                className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                  expanded ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <Search isOpen={searchOpen} onOpenChange={handleSearchChange} />
              </div>
            </div>
          </div>

          {/* Mega menu zone — the pill growing DOWNWARDS */}
          <div
            ref={megaWrapRef}
            className="hidden lg:block overflow-hidden"
            style={{ height: 0 }}
          >
            <div ref={megaContentRef}>
              {/* Subtle divider under the header */}
              <div className="mx-8 border-t border-[#E9E9E9]/70" />
              {activeMenu && (
                <MegaMenu
                  items={activeMenu.items}
                  onNavigate={() => setActiveMenu(null)}
                />
              )}
              {searchOpen && !activeMenu && (
                <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pb-12 text-center">
                  <h2 className="font-archivo-black text-4xl tracking-tight text-[#1F1F1F] md:text-6xl">
                    No Results Found
                  </h2>
                  <p className="mt-4 text-base md:text-lg font-neue-montreal text-neutral-700">
                    Please try again with a different search query.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar navigation */}
      <MobileSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollTriggerRefresh } from "./layoutRefresh";

gsap.registerPlugin(ScrollTrigger);

type MatchMediaInstance = ReturnType<typeof gsap.matchMedia>;

/**
 * Site-wide scroll animations, driven purely by classes — pages do not
 * import any animation component or pass any props; they just put one of
 * these classes on a plain element:
 *
 *   .rv        block fade + rise (optional data-delay="0.25" for cascade
 *              rhythm between sibling blocks)
 *   .rv-items  children stagger in — marks [data-card] / [data-member-card]
 *              descendants when present, otherwise the `.grid > div` cells
 *   .rv-split  heading words rise out of masks (text becomes spans client-side;
 *              the SSR HTML stays plain text)
 *   .rv-img    clip-path mask opens while the first child settles from a zoom;
 *              corner radius is read from the element's own computed
 *              border-radius, so it follows responsive rounded-* classes
 *   .rv-lit    short statement whose words light up with scroll progress
 *   .rv-rise   LOAD-TIME entrance (no scroll trigger): element rises from
 *              below while growing from small to full size — for hero
 *              imagery that is already in view when the page opens
 *
 * A [data-rv-scope] ancestor (usually the flex row holding a heading beside
 * a grid) makes every reveal inside it fire from ONE shared trigger, so
 * side-by-side blocks appear together instead of one-by-one. Grids can also
 * set data-stagger="0" to drop the per-item wave.
 *
 * Every speed lives in TOKENS below — the single source of truth shared by
 * all pages, so nothing can drift per section.
 */
const TOKENS = {
  start: "top 78%",
  block: { y: 26, duration: 1.0 },
  items: { y: 26, duration: 1.0, stagger: 0.06 },
  split: { duration: 1.0, stagger: 0.045 },
  image: { clip: 1.5, zoom: 1.9 },
  rise: { y: 64, scale: 0.9, duration: 1.2 },
  lit: { dim: 0.2 },
};

/* Split word masks — identical shape to SplitReveal's markup. The class
 * strings also exist in SplitReveal.tsx, so Tailwind keeps them in the build. */
const MASK = "inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]";

function splitWords(el: HTMLElement, masked: boolean) {
  const words = (el.textContent || "").trim().split(/\s+/);
  el.dataset.rvText = el.textContent || "";
  el.textContent = "";
  words.forEach((word, i) => {
    const text = i < words.length - 1 ? `${word}\u00A0` : word;
    const piece = document.createElement("span");
    piece.textContent = text;
    if (masked) {
      const mask = document.createElement("span");
      mask.className = MASK;
      piece.className = "inline-block";
      piece.dataset.rvPiece = "";
      mask.appendChild(piece);
      el.appendChild(mask);
    } else {
      piece.className = "inline-block";
      piece.dataset.rvLit = "";
      el.appendChild(piece);
    }
  });
}

function itemTargets(el: HTMLElement) {
  const marked = el.querySelectorAll("[data-card], [data-member-card]");
  return marked.length ? marked : el.querySelectorAll(".grid > div");
}

function bind(): MatchMediaInstance {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    /* Nearest [data-rv-scope] ancestor becomes the measurement trigger, so
     * side-by-side blocks inside one scoped row all start at the same moment
     * instead of one-by-one as each element's own top crosses the line. */
    const triggerOf = (el: HTMLElement) =>
      el.closest<HTMLElement>("[data-rv-scope]") ?? el;

    /* .rv blocks and .rv-items grids — same blur+rise tween, staggered targets
     * for item mode. data-stagger="0" plays all grid items at once. */
    document
      .querySelectorAll<HTMLElement>(".rv:not([data-rv-bound]), .rv-items:not([data-rv-bound])")
      .forEach((el) => {
        el.dataset.rvBound = "1";
        const isItems = el.classList.contains("rv-items");
        const cfg = TOKENS.block;
        gsap.fromTo(
          isItems ? itemTargets(el) : el,
          { autoAlpha: 0, y: isItems ? TOKENS.items.y : cfg.y, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: isItems ? TOKENS.items.duration : cfg.duration,
            ease: "power3.out",
            ...(isItems
              ? {
                  stagger:
                    el.dataset.stagger !== undefined
                      ? parseFloat(el.dataset.stagger)
                      : TOKENS.items.stagger,
                }
              : { delay: parseFloat(el.dataset.delay || "0") }),
            scrollTrigger: { trigger: triggerOf(el), start: TOKENS.start, once: true },
          }
        );
      });

    /* .rv-split headings — word-by-word rise out of masks. */
    document
      .querySelectorAll<HTMLElement>(".rv-split:not([data-rv-bound])")
      .forEach((el) => {
        el.dataset.rvBound = "1";
        splitWords(el, true);
        gsap.fromTo(
          el.querySelectorAll<HTMLElement>("[data-rv-piece]"),
          { yPercent: 105, rotation: 4 },
          {
            yPercent: 0,
            rotation: 0,
            transformOrigin: "0 100%",
            duration: TOKENS.split.duration,
            ease: "power3.out",
            stagger: TOKENS.split.stagger,
            delay: parseFloat(el.dataset.delay || "0"),
            scrollTrigger: { trigger: triggerOf(el), start: TOKENS.start, once: true },
          }
        );
      });

    /* .rv-img — clip mask opens, first child settles from zoomed-in. */
    document
      .querySelectorAll<HTMLElement>(".rv-img:not([data-rv-bound])")
      .forEach((el) => {
        el.dataset.rvBound = "1";
        const radius = getComputedStyle(el).borderTopLeftRadius || "0px";
        const tl = gsap.timeline({
          scrollTrigger: { trigger: triggerOf(el), start: TOKENS.start, once: true },
        });
        tl.fromTo(
          el,
          { clipPath: `inset(14% 10% 14% 10% round ${radius})` },
          {
            clipPath: `inset(0% 0% 0% 0% round ${radius})`,
            duration: TOKENS.image.clip,
            ease: "power3.out",
          },
          0
        );
        const inner = el.firstElementChild;
        if (inner) {
          tl.fromTo(
            inner,
            { scale: 1.22 },
            { scale: 1, duration: TOKENS.image.zoom, ease: "power3.out" },
            0
          );
        }
      });

    /* .rv-rise — plays immediately on page load (no ScrollTrigger): the
     * element slides up from below and grows from small to full size,
     * anchored at its bottom edge so it "stands up" into place. */
    document
      .querySelectorAll<HTMLElement>(".rv-rise:not([data-rv-bound])")
      .forEach((el) => {
        el.dataset.rvBound = "1";
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            y: TOKENS.rise.y,
            scale: TOKENS.rise.scale,
            transformOrigin: "50% 100%",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: TOKENS.rise.duration,
            ease: "power3.out",
            delay: parseFloat(el.dataset.delay || "0.1"),
          }
        );
      });

    /* .rv-lit — words illuminate on scroll progress (scrubbed). */
    document
      .querySelectorAll<HTMLElement>(".rv-lit:not([data-rv-bound])")
      .forEach((el) => {
        el.dataset.rvBound = "1";
        splitWords(el, false);
        const pieces = el.querySelectorAll<HTMLElement>("[data-rv-lit]");
        gsap.fromTo(
          pieces,
          { opacity: TOKENS.lit.dim },
          {
            opacity: 1,
            ease: "none",
            duration: 0.15,
            stagger: 0.85 / pieces.length,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 38%",
              scrub: true,
            },
          }
        );
      });
  });
  return mm;
}

/** Undo DOM splits so a re-scan (or StrictMode double-run) starts clean. */
function unbind() {
  document.querySelectorAll<HTMLElement>("[data-rv-bound]").forEach((el) => {
    if (el.dataset.rvText !== undefined) {
      el.textContent = el.dataset.rvText;
      delete el.dataset.rvText;
    }
    delete el.dataset.rvBound;
  });
}

/**
 * Re-run the scanner over the current DOM. Components that inject NEW
 * rv-classed markup after the initial navigation bind (e.g. a "Load more"
 * button appending cards) call this once the nodes are mounted — the
 * data-rv-bound guard means only the fresh elements get animated.
 */
export function requestRevealRescan() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("rv-rescan"));
}

export default function RevealRunner() {
  const pathname = usePathname();

  useEffect(() => {
    const instances: MatchMediaInstance[] = [];
    // One frame of slack so the freshly navigated page is committed before
    // we scan and measure trigger positions.
    const raf = requestAnimationFrame(() => {
      instances.push(bind());
      scheduleScrollTriggerRefresh();
    });
    const rescan = () => {
      instances.push(bind());
      scheduleScrollTriggerRefresh();
    };
    window.addEventListener("rv-rescan", rescan);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("rv-rescan", rescan);
      instances.forEach((i) => i.revert());
      unbind();
    };
  }, [pathname]);

  return null;
}

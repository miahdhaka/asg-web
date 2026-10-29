import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger positions are measured when reveals bind — but some client
 * components mutate layout right after hydration (e.g. ConcernIntro's
 * `isDesktop` effect swapping the collapsed mobile copy for the full desktop
 * paragraphs), pushing everything below further down the page. Triggers
 * measured against the shorter pre-effect layout fire a few hundred pixels
 * too early, so reveals finish while their section is still off screen.
 * One refresh after effects and font swaps settle re-measures every trigger
 * on the page. Called per binding pass (once per navigation by RevealRunner),
 * so each newly mounted page gets its own measurement — not just the first
 * page of the session.
 */
let timer = 0;

export function scheduleScrollTriggerRefresh() {
  if (typeof window === "undefined") return;
  // Debounce: many components may schedule at once during one mount burst
  // (or one navigation) — collapse them into a single re-measure.
  if (timer) window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    timer = 0;
    ScrollTrigger.refresh();
  }, 300);
}

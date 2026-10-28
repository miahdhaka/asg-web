import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let scheduled = false;

/**
 * ScrollTrigger positions are measured when a reveal component mounts — but
 * some client components mutate layout right after hydration (e.g.
 * ConcernIntro's `isDesktop` effect swapping the collapsed mobile copy for
 * the full desktop paragraphs), pushing everything below further down the
 * page. Triggers measured against the shorter pre-effect layout fire a few
 * hundred pixels too early, so reveals finish while their section is still
 * off screen. One refresh after effects and font swaps settle re-measures
 * every trigger on the page. Safe to call from every reveal component: a
 * module flag makes it run at most once per page load.
 */
export function scheduleScrollTriggerRefresh() {
  if (scheduled || typeof window === "undefined") return;
  scheduled = true;
  window.setTimeout(() => ScrollTrigger.refresh(), 300);
}

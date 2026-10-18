/* eslint-disable react-hooks/set-state-in-effect -- one-time client capability checks + typing animation */
"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { HERO, TOUR, type CardIcon, type GlobeCard } from "./content";
import { mulberry32 } from "./geo";
import type { Anchor, OrderEvent } from "./GlobeScene";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

/* ───────────────────────────────── icons ───────────────────────────────── */

function Icon({ name }: { name: CardIcon }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "flag")
    return (
      <svg {...common}>
        <path d="M5 21V4" />
        <path d="M5 4h11l-2 4 2 4H5" />
      </svg>
    );
  if (name === "cash")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.8 9.2c-.5-.9-1.5-1.4-2.8-1.4-1.6 0-2.7.8-2.7 2 0 3 5.6 1.4 5.6 4.3 0 1.2-1.2 2.1-2.9 2.1-1.4 0-2.5-.6-3-1.6M12 6v1.8m0 8.6V18" />
      </svg>
    );
  if (name === "partypopper")
    return (
      <svg {...common}>
        {/* cone body pointing to the upper-right */}
        <path d="M3 21l4-9 5 5-9 4z" />
        {/* confetti streamers + dots bursting out of the opening */}
        <path d="M13.5 4l2 1.5M18.5 3l.8 2.4M21 8.5l-2.6.6M16 9l1.2 2" />
        <circle cx="12.5" cy="7.5" r="0.6" />
        <circle cx="20" cy="13" r="0.6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 20l3-9 6 6-9 3z" />
      <path d="M13 4l1 2.5M18 8l2.5-1M19 14l-2.4-.8M9 5.5L10.5 7" />
    </svg>
  );
}

/* ───────────────────────────────── stars ───────────────────────────────── */

function Stars() {
  const stars = useMemo(() => {
    const r = mulberry32(42);
    const list: { x: number; y: number; s: number; d: number; t: number }[] = [];
    while (list.length < 46) {
      const x = r();
      const y = r();
      // keep clear of the globe disc on desktop (framed right, vertically centred)
      const inGlobe = ((x - 0.69) / 0.2) ** 2 + ((y - 0.5) / 0.43) ** 2 < 1;
      if (inGlobe) continue;
      list.push({ x, y, s: 3 + r() * r() * 9, d: r() * 6, t: 3 + r() * 4 });
    }
    return list;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] max-md:opacity-50" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="gstar"
          style={{
            left: `${(s.x * 100).toFixed(2)}%`,
            top: `${(s.y * 100).toFixed(2)}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
            animationDuration: `${s.t}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────── DOM cards / toast ───────────────────────────── */

type Register = (id: string, a: Anchor | null) => void;

function StatCard({ card, active, interactive, hover, register, onSpin }: { card: GlobeCard; active: boolean; interactive: boolean; hover: React.MutableRefObject<boolean>; register: Register; onSpin: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    register(card.id, { el, lat: card.anchor.lat, lon: card.anchor.lon, dx: card.offset.x, dy: card.offset.y });
    return () => register(card.id, null);
  }, [card, register]);

  // Only the designated card is interactive: it alone reacts to the pointer and
  // shows the glossy hover border. The rest stay static.
  const interactiveCard = interactive && active;

  // Hover only lights up the border; the globe spins on click. The time lock
  // ignores extra clicks fired while a 2.4s turn is still running.
  const lastSpin = useRef(0);
  const handleClick = () => {
    if (!interactiveCard) return;
    const now = performance.now();
    if (now - lastSpin.current < 2600) return;
    lastSpin.current = now;
    onSpin();
  };

  // Hovering the interactive box drives the same `hover` flag the globe's own
  // surface sets: it parks the auto-rotation and nudges the zoom in. Only this
  // box does it — the other cards stay inert.
  const handleEnter = () => {
    if (interactiveCard) hover.current = true;
  };
  const handleLeave = () => {
    if (interactiveCard) hover.current = false;
  };

  return (
    <div ref={ref} className="gcard" data-active={active} data-facing="0">
      <div className="gcard-inner">
        <div
          className={`gcard-box items-start text-left ${interactiveCard ? "gcard-hover gcard-live" : ""}`}
          onPointerEnter={handleEnter}
          onPointerLeave={handleLeave}
          onClick={handleClick}
        >
          <span className="mt-[1px] text-[#3ddc97]">
            <Icon name={card.icon} />
          </span>
          <p className="text-left">
            <span className="block text-[#cfdad5]">{card.lead}</span>
            <span className="block text-[#3ddc97]">{card.text}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 38);
    return () => window.clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}

function OrderToast({ order, register }: { order: OrderEvent | null; register: Register }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const lastId = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !order) return;

    const place = () => {
      // Re-anchor to the destination while the card is invisible, so moving from
      // the previous point never teleports an opaque card across the globe.
      register("toast", { el, lat: order.lat, lon: order.lon, dx: 14, dy: -60 });
      setShow(true);
    };

    const FADE = 360; // matches the inline transitionDuration below
    let swap = 0;
    let hide = 0;
    if (lastId.current !== null && lastId.current !== order.id) {
      // A different card is on screen: dissolve it at the old point first, then
      // fade the new one in beside its own point.
      setShow(false);
      swap = window.setTimeout(() => {
        place();
        hide = window.setTimeout(() => setShow(false), 3200);
      }, FADE);
    } else {
      place();
      hide = window.setTimeout(() => setShow(false), 3200);
    }
    lastId.current = order.id;

    return () => {
      window.clearTimeout(swap);
      window.clearTimeout(hide);
    };
  }, [order, register]);

  return (
    <div ref={ref} className="gcard" style={{ transitionDuration: "360ms" }} data-active={show} data-facing="0">
      <div className="gcard-inner">
        <div className="gcard-box min-w-[170px] items-center">
          <span className="text-[#3ddc97]">
            <MapPin size={14} strokeWidth={2} />
          </span>
          <p className="text-[#3ddc97]">
            {order && <Typed key={order.id} text={`${order.region.toUpperCase()} · ${order.city.toUpperCase()}`} />}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── hub label: the Bangladesh origin pin ───────────────────── */

function HubLabel({ hub, register }: { hub: { name: string; lat: number; lon: number }; register: Register }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Push the pill to the right and above the hub point so the origin (where
    // the arc ribbons depart) stays visible to the left of the box.
    register("hub", { el, lat: hub.lat, lon: hub.lon, dx: 40, dy: -54 });
    return () => register("hub", null);
  }, [hub, register]);

  // Always active: the rig flips data-facing as Dhaka rotates in/out of view, so
  // the badge fades in over the hub and hides on the far side — same as the cards.
  return (
    <div ref={ref} className="gcard" data-active="true" data-facing="0">
      <div className="gcard-inner">
        <div className="gcard-box items-start text-left">
          <span className="mt-[1px] text-[#3ddc97]">
            {/* Bangladesh flag drawn inline (green field + red disc offset to the
                hoist). Flag emoji render as bare "BD" letters on Windows, so a real
                shape is the reliable choice. */}
            <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden className="block overflow-hidden rounded-[1px]">
              <rect width="15" height="10" fill="#006a4e" />
              <circle cx="6" cy="5" r="3.6" fill="#f42a41" />
            </svg>
          </span>
          <p className="text-left">
            <span className="block text-[#cfdad5]">Bangladesh</span>
            <span className="block text-[#3ddc97]">Where every order begins</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────── hero ───────────────────────────────────── */

export default function GlobeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const anchors = useRef<Map<string, Anchor>>(new Map());
  // Set by the earth mesh's own raycast; read every frame by the camera rig.
  const hover = useRef(false);
  // When a stat card is clicked we drop the target longitude here; the camera
  // rig consumes it once, swinging the globe horizontally to that point.
  const spinTo = useRef<number | null>(null);

  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [stop, setStop] = useState(0);
  const [order, setOrder] = useState<OrderEvent | null>(null);

  const register = useCallback<Register>((id, a) => {
    if (a) anchors.current.set(id, a);
    else anchors.current.delete(id);
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!c.getContext("webgl2"));
    } catch {
      setWebgl(false);
    }
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      /* Mobile gets ~15% more height so the globe, which is framed low (cy 0.68
         of the section height), drops clear of the top-anchored description copy.
         Desktop keeps the plain full-viewport box. */
      className="relative isolate min-h-[100svh] max-md:min-h-[105svh] w-full overflow-hidden bg-[#04130f] text-white"
      aria-label="ASG Corporate — global reach"
    >
      {/* static fallback / loading backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d3a2c_0%,#07201a_55%,#030f0c_100%)]" />

      {/* Short reveal: the globe is already at full spin rate behind this, so a
          long fade just reads as "static for a moment, then it starts". */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
        {webgl && (
          <GlobeScene
            tour={TOUR}
            hub={HERO.hub}
            anchors={anchors}
            hover={hover}
            spinTo={spinTo}
            running={inView && tabVisible}
            reducedMotion={reduced}
            onStop={setStop}
            onOrder={setOrder}
            onReady={onReady}
          />
        )}
      </div>

      <Stars />

      {/* Bottom fade: buries the globe's lower limb in black and stops there.
          Deliberately short and steep rather than tall and gentle — the upper
          hemisphere and the terminator stay at full brightness, only the bottom
          edge dissolves. The band tops out at the globe's vertical centre
          (cy 0.5, diameter 0.68H → limb at 84%) so the upper half is never dimmed.
          Sits above the canvas and the stars, below the cards, marquee and copy.
          On mobile the globe drops low (cy 0.68) and shrinks, so the band is
          shortened to 32% — its transparent top now lands at the mobile globe's
          centre instead of near its top, keeping the whole disc from going dark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[50%] max-md:h-[32%] bg-[linear-gradient(0deg,#030f0cff_0%,#030f0cfe_28%,#030f0cf2_46%,#030f0cb0_62%,#030f0c7a_76%,#030f0c2e_89%,#030f0c00_100%)]"
      />

      {/* Extra weight over the lower-right, where the globe's limb sits (framed at
          cx 0.69, cy 0.5 → the 45° point of the lower-right edge lands near 80% /
          78% of the section). The horizontal band above fades evenly across the
          full width, so it cannot bias one side; this elliptical layer does.
          On mobile the globe is centred (cx 0.5), so the ellipse is re-centred
          under it — otherwise the right-biased blob reads as an off-centre patch. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(48%_44%_at_80%_80%,#030f0ce6_0%,#030f0cab_48%,#030f0c52_75%,#030f0c00_100%)] max-md:bg-[radial-gradient(58%_36%_at_50%_86%,#030f0ce6_0%,#030f0cab_48%,#030f0c52_75%,#030f0c00_100%)]"
      />

      {/* floating stat cards pinned to the globe */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {TOUR.map((s, i) =>
          s.cards.map((c) => (
            <StatCard
              key={c.id}
              card={c}
              active={stop === i}
              interactive={c.id === "eu-1"}
              hover={hover}
              register={register}
              onSpin={() => {
                spinTo.current = HERO.hub.lon;
              }}
            />
          )),
        )}
        <HubLabel hub={HERO.hub} register={register} />
        <OrderToast order={order} register={register} />
      </div>

      {/* Copy: the DESKTOP layout is exactly as committed (left column, vertically
          centred, 12px wide-tracked mono eyebrow) — every mobile tweak below is
          scoped to max-md, so nothing at ≥768px changes. On mobile the copy sits
          at the top, left aligned, with the globe centred beneath it; the top
          offset is anchored to the fixed header (--header-height) so the eyebrow
          never hides behind it on short viewports. */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[16%] z-10 text-center max-md:top-[calc(var(--header-height)+1.25rem)] max-md:bottom-auto max-md:text-left md:inset-x-auto md:bottom-auto md:left-[6%] md:top-1/2 md:w-[min(34rem,42vw)] md:-translate-y-1/2 md:text-left">

        <div className="text-sm inline-flex items-center gap-2.5 sm:gap-1.5 font-space-mono font-medium uppercase tracking-wider mb-4.5">
          <span>Global Reach</span>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--primary-gradient)" }} />
        </div>

        <h1 className="mb-6 font-archivo-black text-[1.75rem] uppercase leading-[1.1] text-white sm:text-4xl md:text-[2.6rem] lg:text-[3rem]">
          {HERO.heading.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h1>
        <p className="mx-auto max-w-[33rem] text-base leading-[1.6] text-[#99B3AD] md:text-lg max-md:leading-[1.4] md:mx-0 md:text-base lg:text-[1.05rem]">
          {HERO.sub}
        </p>
      </div>

      {/* Brand logo marquee along the bottom. z-30 puts it above the bottom fade,
          so the logos stay crisp while the globe's lower limb sinks into it. */}
      <BrandMarquee />
    </section>
  );
}

/* ─────────────────────────── brand logo marquee ─────────────────────────── */

// Exactly the logos in /public/images/global-footprint/. Each entry carries its
// true intrinsic width (all share a 264px height) so the aspect-ratio box matches
// the decoded image, meaning no mid-animation reflow or jump.
const brands: { src: string; width: number }[] = [
  { src: "/images/global-footprint/c&a.png", width: 660 },
  { src: "/images/global-footprint/celio.png", width: 648 },
  { src: "/images/global-footprint/kiabi.png", width: 724 },
  { src: "/images/global-footprint/levis.png", width: 552 },
  { src: "/images/global-footprint/next.png", width: 676 },
  { src: "/images/global-footprint/premark.png", width: 660 },
  { src: "/images/global-footprint/walmart.png", width: 956 },
];
const LOGO_HEIGHT = 264;
const AUTO_PX_PER_SEC = 30; // gentle drift; a full brand list scrolls past in ~a minute

function BrandMarquee() {
  /* Auto-scrolling logo strip that can also be dragged, matching the other
     homepage carousels (GreenerFuture): a scrollLeft track nudged forward every
     frame and wrapped by one full brand list, so the loop seam is invisible. A
     pointer drag (mouse or touch) scrubs it 1:1. The drift parks the instant a
     pointer hovers the strip and restarts the instant it leaves, so a slide
     never keeps coasting on its own. `overflow-hidden` still scrolls via script,
     so no scrollbar ever appears. */
  const [copies, setCopies] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const metrics = useRef({ perCopy: 0 });
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });
  // Pointer sitting on the strip parks the drift; leaving lets it start again.
  const hover = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const apply = () => {
      const viewport = container.clientWidth;
      // The logos are different widths, so a copy's real span is NOT one tile's
      // stride × the list length (that mis-measure made the loop jump once per
      // round). Measure it directly: the distance from the start of the first
      // list to the start of the second is the exact wrap distance, so completing
      // a round is seamless.
      const first = track.children[0] as HTMLElement | undefined;
      const next = track.children[brands.length] as HTMLElement | undefined;
      if (!first || !next || viewport === 0) return;
      const perCopy = next.offsetLeft - first.offsetLeft;
      if (perCopy <= 0) return;
      metrics.current.perCopy = perCopy;
      // Enough copies that the visible window stays covered even right before the
      // scroll wraps at the end of the first list.
      const needed = Math.max(3, Math.ceil(viewport / perCopy) * 3);
      setCopies((c) => (c === needed ? c : needed));
    };

    apply();
    // Re-check whenever the track's own layout changes, e.g. when the
    // aspect-ratio boxes of not-yet-decoded logos resolve to their real widths.
    const ro = new ResizeObserver(apply);
    ro.observe(container);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // Gentle constant drift, wrapped into the first list so it runs forever.
  // Uses a float accumulator because browsers round scrollLeft to an integer:
  // at 30px/sec each frame is ~0.5px which never crosses the 1px threshold on
  // Mac (consistent rAF timing), leaving the strip visually frozen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft; // carry over any drag-applied offset
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const { perCopy } = metrics.current;
      if (perCopy > 0 && !drag.current.down && !hover.current) {
        pos += (dt / 1000) * AUTO_PX_PER_SEC;
        if (pos >= perCopy) pos -= perCopy;
        el.scrollLeft = pos;
      } else {
        // Keep in sync when user drags or hovers
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = containerRef.current;
    if (!track || drag.current.down) return;
    drag.current.down = true;
    drag.current.startX = e.clientX;
    drag.current.startScroll = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = containerRef.current;
    if (!track || !drag.current.down) return;
    const { perCopy } = metrics.current;
    if (perCopy <= 0) return;
    const dx = e.clientX - drag.current.startX;
    const next = drag.current.startScroll - dx;
    // Wrap into [0, perCopy); shift the drag base by the same amount so a scrub
    // that crosses the seam keeps moving 1:1 with the pointer.
    let wrapped = next;
    while (wrapped < 0) wrapped += perCopy;
    while (wrapped >= perCopy) wrapped -= perCopy;
    track.scrollLeft = wrapped;
    drag.current.startScroll += wrapped - next;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = containerRef.current;
    if (!track || !drag.current.down) return;
    drag.current.down = false;
    try {
      track.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const loopedBrands = Array.from({ length: copies }, () => brands).flat();

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 pb-6 lg:pb-10">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => {
          hover.current = true;
        }}
        onPointerLeave={() => {
          hover.current = false;
        }}
        className="no-scrollbar cursor-grab overflow-hidden select-none active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
      >
        <div ref={trackRef} className="flex w-max">
          {loopedBrands.map((brand, index) => (
            <div
              key={`globe-${brand.src}-${index}`}
              className="mr-2 flex h-14 shrink-0 items-center justify-center sm:mr-3 sm:h-16 lg:mr-4 lg:h-24"
            >
              <Image
                src={brand.src}
                alt=""
                width={brand.width}
                height={LOGO_HEIGHT}
                draggable={false}
                className="pointer-events-none h-12 w-auto sm:h-16 lg:h-20"
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

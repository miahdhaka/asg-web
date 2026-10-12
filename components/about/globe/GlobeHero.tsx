/* eslint-disable react-hooks/set-state-in-effect -- one-time client capability checks + typing animation */
"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

function StatCard({ card, active, register }: { card: GlobeCard; active: boolean; register: Register }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    register(card.id, { el, lat: card.anchor.lat, lon: card.anchor.lon, dx: card.offset.x, dy: card.offset.y });
    return () => register(card.id, null);
  }, [card, register]);

  return (
    <div ref={ref} className="gcard" data-active={active} data-facing="0">
      <div className="gcard-inner">
        <div className="gcard-box">
          <span className="mt-[1px] text-[#3ddc97]">
            <Icon name={card.icon} />
          </span>
          <p>
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

  useEffect(() => {
    const el = ref.current;
    if (!el || !order) return;
    register("toast", { el, lat: order.lat, lon: order.lon, dx: 14, dy: -34 });
    setShow(true);
    const id = window.setTimeout(() => setShow(false), 3200);
    return () => window.clearTimeout(id);
  }, [order, register]);

  return (
    <div ref={ref} className="gcard" data-active={show} data-facing="0">
      <div className="gcard-inner">
        <div className="gcard-box min-w-[170px] items-center">
          <span className="text-[#3ddc97]">
            <Icon name="cash" />
          </span>
          <p className="text-[#3ddc97]">
            {order && <Typed key={order.id} text={`ORDER · ${order.city.toUpperCase()}`} />}
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
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#04130f] text-white"
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
            hubRate={HERO.hubRate}
            anchors={anchors}
            hover={hover}
            running={inView && tabVisible}
            reducedMotion={reduced}
            onStop={setStop}
            onOrder={setOrder}
            onReady={onReady}
          />
        )}
      </div>

      <Stars />

      {/* Bottom fade: drops the globe's lower limb into the scene so it dissolves
          instead of ending on a hard circular edge. Sits above the canvas and the
          stars (so arcs and city lights dim with the surface, which a shader-side
          fade on the sphere alone could not do), but below the cards and copy so
          the type stays crisp. Colour matches the backdrop shader's bottom stop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[42%] bg-[linear-gradient(0deg,#030f0cf5_0%,#030f0c9e_28%,#030f0c2e_62%,#030f0c00_100%)]"
      />

      {/* floating stat cards pinned to the globe */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {TOUR.map((s, i) =>
          s.cards.map((c) => <StatCard key={c.id} card={c} active={stop === i} register={register} />),
        )}
        <OrderToast order={order} register={register} />
      </div>

      {/* Copy sits on the left on desktop; the globe is framed to the right. */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[12%] z-10 text-center md:inset-x-auto md:bottom-auto md:left-[6%] md:top-1/2 md:w-[min(30rem,40vw)] md:-translate-y-1/2 md:text-left">
        <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
          <span className="inline-flex items-center gap-1.5 font-space-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white md:text-xs">
            {HERO.eyebrow}
            <span className="bg-gradient-to-b from-[#4a9e4a] to-[#2d6b2d] bg-clip-text text-2xl leading-none text-transparent">
              •
            </span>
          </span>
        </div>
        <h1 className="mb-4 font-archivo-black text-[1.75rem] uppercase leading-[1.1] text-white sm:text-4xl md:mb-5 md:text-[2.6rem] lg:text-[3rem]">
          {HERO.heading.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h1>
        <p className="mx-auto max-w-[26rem] text-sm leading-[1.6] text-[#99B3AD] md:mx-0 md:text-base lg:text-[1.05rem]">
          {HERO.sub}
        </p>
      </div>
    </section>
  );
}

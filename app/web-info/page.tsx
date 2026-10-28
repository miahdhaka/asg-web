import type { Metadata } from "next";
import ScrollProgress from "@/components/web-info/ScrollProgress";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import SplitReveal from "@/components/web-info/SplitReveal";
import ImageReveal from "@/components/web-info/ImageReveal";
import StrokeDraw from "@/components/web-info/StrokeDraw";
import BarGrow from "@/components/web-info/BarGrow";
import LitText from "@/components/web-info/LitText";

export const metadata: Metadata = {
  title: "Scroll Animations | ASG - Amanat Shah Group",
  description: "Animation methods only — abstract demo blocks, no page content.",
};

/* Small technical label above each example — names the reference technique. */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-6 font-space-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
    {children}
  </p>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="mx-auto max-w-5xl px-6 py-20">{children}</section>
);

export default function WebInfoPage() {
  return (
    <main className="bg-background">
      <ScrollProgress />

      {/* 01 — .rv : fade + rise + un-blur */}
      <RevealOnScroll>
        <Section>
          <Label>01 · section reveal — fade + rise + un-blur (.rv)</Label>
          <div className="h-40 w-full rounded-2xl bg-[image:var(--primary-gradient)] opacity-90" />
        </Section>
      </RevealOnScroll>

      {/* 02 — [data-split] : word-by-word mask rise */}
      <RevealOnScroll>
        <Section>
          <Label>02 · heading word-by-word mask rise ([data-split])</Label>
          <SplitReveal
            text="Words rise one by one"
            className="font-archivo-black text-4xl uppercase leading-[1.1] text-neutral-800 sm:text-6xl"
          />
        </Section>
      </RevealOnScroll>

      {/* 03 — .f-word : letter-by-letter rise */}
      <RevealOnScroll>
        <Section>
          <Label>03 · letter-by-letter rise (.f-word)</Label>
          <SplitReveal
            by="char"
            text="Characters"
            className="font-archivo-black text-6xl uppercase leading-[0.9] text-neutral-800 sm:text-8xl"
          />
        </Section>
      </RevealOnScroll>

      {/* 04 — .rv-img : clip-path open + zoom-out (plain block stands in for a picture) */}
      <RevealOnScroll>
        <Section>
          <Label>04 · picture clip + zoom (.rv-img)</Label>
          <ImageReveal radius="1.25rem" className="h-64 w-full max-w-3xl rounded-[1.25rem]">
            <div className="h-full w-full bg-[image:var(--primary-gradient)]" />
          </ImageReveal>
        </Section>
      </RevealOnScroll>

      {/* 05 — .ring / hero underline : SVG stroke draw */}
      <RevealOnScroll>
        <Section>
          <Label>05 · SVG stroke draw-in (.ring / hero underline)</Label>
          <StrokeDraw>
            <svg viewBox="0 0 240 120" className="h-32 w-auto">
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#1AA179"
                strokeWidth="8"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                transform="rotate(-90 60 60)"
              />
              <path
                d="M130 92 C 155 70, 190 70, 225 88"
                fill="none"
                stroke="#8BC34A"
                strokeWidth="6"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
              />
            </svg>
          </StrokeDraw>
        </Section>
      </RevealOnScroll>

      {/* 06 — .energy-bars : bars grow staggered */}
      <RevealOnScroll>
        <Section>
          <Label>06 · bars grow from bottom (.energy-bars)</Label>
          <BarGrow
            values={[20, 45, 30, 60, 80, 55, 90, 70, 40, 65, 85, 50, 75, 95, 60, 35, 70, 88, 42, 66]}
            className="h-28 max-w-2xl"
          />
        </Section>
      </RevealOnScroll>

      {/* 07 — .drops / .forest : staggered children pop */}
      <RevealOnScroll selector=".tiles > div" stagger={0.06}>
        <Section>
          <Label>07 · staggered children pop (.drops / .forest / grids)</Label>
          <div className="tiles grid max-w-2xl grid-cols-8 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-full bg-[image:var(--primary-gradient)]"
              />
            ))}
          </div>
        </Section>
      </RevealOnScroll>

      {/* 08 — .lw [data-lit] : words light up with scroll */}
      <Section>
        <Label>08 · scroll-lit text (.lw — scrubbed, words brighten as you pass)</Label>
        <LitText
          text="Words light up one by one while you scroll through this line"
          className="max-w-3xl font-archivo-black text-3xl uppercase leading-[1.25] text-neutral-800 sm:text-5xl"
        />
      </Section>
    </main>
  );
}

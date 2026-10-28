import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import WeVision from "@/components/sustainability/WeVision";
import WeGrowthBanner from "@/components/sustainability/WeGrowthBanner";
import WeFeatureCard from "@/components/sustainability/WeFeatureCard";
import WeCommunity from "@/components/sustainability/WeCommunity";
import WeCta from "@/components/sustainability/WeCta";
import { weHero, weWellbeing, weCapacity } from "@/components/sustainability/weData";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Women Empowerment | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's women empowerment initiatives — championing gender equality, safe workplaces, career growth, and skills development for women across Bangladesh.",
};

export default function WomenEmpowermentPage() {
  return (
    <main>
      <ScrollProgress />
      <PageHeroFull
        title={weHero.title}
        subtitle={weHero.subtitle}
        mobileSrc={weHero.image}
        desktopSrc={weHero.image}
        alt={weHero.alt}
      />
      <RevealOnScroll>
        <WeVision />
      </RevealOnScroll>
      <RevealOnScroll>
        <WeGrowthBanner />
      </RevealOnScroll>
      <RevealOnScroll>
        <WeFeatureCard data={weWellbeing} side="right" />
      </RevealOnScroll>
      <RevealOnScroll>
        <WeFeatureCard data={weCapacity} side="left" divider />
      </RevealOnScroll>
      <RevealOnScroll>
        <WeCommunity />
      </RevealOnScroll>
      <RevealOnScroll>
        <WeCta />
      </RevealOnScroll>
    </main>
  );
}

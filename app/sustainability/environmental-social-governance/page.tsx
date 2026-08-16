import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import EsgIntro from "@/components/sustainability/EsgIntro";
import EsgCertifications from "@/components/sustainability/EsgCertifications";
import EsgInitiatives from "@/components/sustainability/EsgInitiatives";

export const metadata: Metadata = {
  title: "Environmental & Social Governance | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's ESG commitments — 7MW renewable energy, water recycling, zero liquid discharge, and internationally certified sustainable manufacturing.",
};

export default function EnvironmentalSocialGovernancePage() {
  return (
    <main>
      <PageHero
        title="Environmental & Social Governance"
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/sustainability/esg/hero.webp"
        desktopSrc="/images/sustainability/esg/hero.webp"
        alt="Aerial view of lush green forest near Amanat Shah Group premises"
        emblemSrc="/images/sustainability/esg/hero-emblem.webp"
      />
      <EsgIntro />
      <EsgCertifications />
      <EsgInitiatives />
    </main>
  );
}

import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import EsgRenewable from "@/components/sustainability/EsgRenewable";
import EsgWater from "@/components/sustainability/EsgWater";
import EsgStatCards from "@/components/sustainability/EsgStatCards";
import EsgZld from "@/components/sustainability/EsgZld";
import { esgHero } from "@/components/sustainability/esgData";
import CertificationsCompliance from "@/components/homepage/CertificationsCompliance";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Environmental & Social Governance | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's ESG commitments — 7MW renewable energy, water recycling, zero liquid discharge, and internationally certified sustainable manufacturing.",
};

export default function EnvironmentalSocialGovernancePage() {
  return (
    <main>
      <ScrollProgress />
      <PageHeroFull
        title={esgHero.title}
        subtitle={esgHero.subtitle}
        mobileSrc={esgHero.image}
        desktopSrc={esgHero.image}
        alt={esgHero.alt}
      />
      <RevealOnScroll>
        <EsgRenewable />
      </RevealOnScroll>
      <RevealOnScroll>
        <EsgWater />
      </RevealOnScroll>
      <RevealOnScroll>
        <EsgStatCards />
      </RevealOnScroll>
      <RevealOnScroll>
        <EsgZld />
      </RevealOnScroll>
      <RevealOnScroll>
        <CertificationsCompliance />
      </RevealOnScroll>
    </main>
  );
}

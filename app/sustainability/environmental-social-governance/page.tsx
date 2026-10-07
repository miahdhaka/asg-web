import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import EsgRenewable from "@/components/sustainability/EsgRenewable";
import EsgWater from "@/components/sustainability/EsgWater";
import EsgStatCards from "@/components/sustainability/EsgStatCards";
import EsgZld from "@/components/sustainability/EsgZld";
import { esgHero } from "@/components/sustainability/esgData";
import CertificationsCompliance from "@/components/homepage/CertificationsCompliance";

export const metadata: Metadata = {
  title: "Environmental & Social Governance | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's ESG commitments — 7MW renewable energy, water recycling, zero liquid discharge, and internationally certified sustainable manufacturing.",
};

export default function EnvironmentalSocialGovernancePage() {
  return (
    <main>
      <PageHeroFull
        title={esgHero.title}
        subtitle={esgHero.subtitle}
        mobileSrc={esgHero.image}
        desktopSrc={esgHero.image}
        alt={esgHero.alt}
      />
      <EsgRenewable />
      <EsgWater />
      <EsgStatCards />
      <EsgZld />
      <CertificationsCompliance />
    </main>
  );
}

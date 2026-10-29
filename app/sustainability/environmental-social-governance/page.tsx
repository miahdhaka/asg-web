import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import EsgRenewable from "@/components/sustainability/EsgRenewable";
import EsgWater from "@/components/sustainability/EsgWater";
import EsgStatCards from "@/components/sustainability/EsgStatCards";
import EsgZld from "@/components/sustainability/EsgZld";
import { esgHero } from "@/components/sustainability/esgData";
import CertificationsCompliance from "@/components/homepage/CertificationsCompliance";
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
      {/* Section internals animate themselves (rv classes inside each
          component); only CertificationsCompliance — shared with the homepage
          and untouched internally — keeps a page-level reveal wrapper. */}
      <EsgRenewable />
      <EsgWater />
      <EsgStatCards />
      <EsgZld />
      <div className="rv">
        <CertificationsCompliance />
      </div>
    </main>
  );
}

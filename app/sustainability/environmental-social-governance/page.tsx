import type { Metadata } from "next";
import EsgHero from "@/components/sustainability/EsgHero";
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
      <EsgHero />
      <EsgIntro />
      <EsgCertifications />
      <EsgInitiatives />
    </main>
  );
}

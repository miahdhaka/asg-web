import type { Metadata } from "next";
import SustainabilitySections from "@/components/sustainability/SustainabilitySections";

export const metadata: Metadata = {
  title: "Environmental & Social Governance | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's ESG commitments — 7MW renewable energy, water recycling, zero liquid discharge, and internationally certified sustainable manufacturing.",
};

export default function SustainabilityPage() {
  return (
    <main>
      <SustainabilitySections />
    </main>
  );
}

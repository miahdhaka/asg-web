import type { Metadata } from "next";
import Farm2FirmHero from "@/components/concerns/farm2firm/Farm2FirmHero";
import Farm2FirmIntro from "@/components/concerns/farm2firm/Farm2FirmIntro";
import Farm2FirmCapabilities from "@/components/concerns/farm2firm/Farm2FirmCapabilities";

export const metadata: Metadata = {
  title: "Farm2Firm Management Ltd | ASG - Amanat Shah Group",
  description:
    "Farm2Firm Management Ltd — a premier tea estate entity under Amanat Shah Group, dedicated to sustainable agriculture and high-quality tea production since 1955.",
};

export default function Farm2FirmPage() {
  return (
    <main>
      <Farm2FirmHero />
      <Farm2FirmIntro />
      <Farm2FirmCapabilities />
    </main>
  );
}

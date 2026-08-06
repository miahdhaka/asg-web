import type { Metadata } from "next";
import TrustKnitwearHero from "@/components/concerns/trust-knitwear-industries/TrustKnitwearHero";
import TrustKnitwearIntro from "@/components/concerns/trust-knitwear-industries/TrustKnitwearIntro";
import TrustKnitwearCapabilities from "@/components/concerns/trust-knitwear-industries/TrustKnitwearCapabilities";
import TrustKnitwearProcessing from "@/components/concerns/trust-knitwear-industries/TrustKnitwearProcessing";

export const metadata: Metadata = {
  title: "Trust Knitwear Industries Ltd. | ASG - Amanat Shah Group",
  description:
    "Trust Knitwear Industries Ltd. — a vertically integrated knit composite facility under Amanat Shah Group, producing premium knit fabrics, dyeing, finishing, and export-oriented garments since 2003.",
};

export default function TrustKnitwearPage() {
  return (
    <main>
      <TrustKnitwearHero />
      <TrustKnitwearIntro />
      <TrustKnitwearCapabilities />
      <TrustKnitwearProcessing />
    </main>
  );
}

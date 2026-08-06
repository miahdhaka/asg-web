import type { Metadata } from "next";
import WeavingHero from "@/components/concerns/amanat-shah-weaving-processing/WeavingHero";
import WeavingIntro from "@/components/concerns/amanat-shah-weaving-processing/WeavingIntro";
import WeavingCapabilities from "@/components/concerns/amanat-shah-weaving-processing/WeavingCapabilities";
import WeavingProcessing from "@/components/concerns/amanat-shah-weaving-processing/WeavingProcessing";

export const metadata: Metadata = {
  title: "Amanat Shah Weaving Processing Ltd. | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Weaving Processing Ltd., the weaving arm of the Amanat Shah Group — producing high-quality greige fabrics through advanced weaving technology, rigorous quality control, and generations of textile craftsmanship.",
};

export default function AmanatShahWeavingProcessingPage() {
  return (
    <main>
      <WeavingHero />
      <WeavingIntro />
      <WeavingCapabilities />
      <WeavingProcessing />
    </main>
  );
}

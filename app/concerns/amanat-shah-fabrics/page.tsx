import type { Metadata } from "next";
import FabricsHero from "@/components/concerns/amanat-shah-fabrics/FabricsHero";
import FabricsIntro from "@/components/concerns/amanat-shah-fabrics/FabricsIntro";
import FabricsCapabilities from "@/components/concerns/amanat-shah-fabrics/FabricsCapabilities";
import FabricsProcessing from "@/components/concerns/amanat-shah-fabrics/FabricsProcessing";

export const metadata: Metadata = {
  title: "Amanat Shah Fabrics Ltd. | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Fabrics Ltd. (ASFL), a vertically integrated textile manufacturer of the Amanat Shah Group — producing high-quality dyed, printed, and finished woven fabrics with cutting-edge European technology.",
};

export default function AmanatShahFabricsPage() {
  return (
    <main>
      <FabricsHero />
      <FabricsIntro />
      <FabricsCapabilities />
      <FabricsProcessing />
    </main>
  );
}

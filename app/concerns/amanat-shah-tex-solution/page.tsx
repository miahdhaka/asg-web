import type { Metadata } from "next";
import TexSolutionHero from "@/components/concerns/amanat-shah-tex-solution/TexSolutionHero";
import TexSolutionIntro from "@/components/concerns/amanat-shah-tex-solution/TexSolutionIntro";
import TexSolutionCapabilities from "@/components/concerns/amanat-shah-tex-solution/TexSolutionCapabilities";

export const metadata: Metadata = {
  title: "Amanat Shah Tex Solution | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Tex Solution, a sister concern of the Amanat Shah Group — a specialized manufacturer and supplier of surfactants, emulsifiers, and specialty chemicals for the textile industry.",
};

export default function AmanatShahTexSolutionPage() {
  return (
    <main>
      <TexSolutionHero />
      <TexSolutionIntro />
      <TexSolutionCapabilities />
    </main>
  );
}

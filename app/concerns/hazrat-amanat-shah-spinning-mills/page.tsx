import type { Metadata } from "next";
import SpinningHero from "@/components/concerns/hazrat-amanat-shah-spinning-mills/SpinningHero";
import SpinningIntro from "@/components/concerns/hazrat-amanat-shah-spinning-mills/SpinningIntro";
import SpinningCapabilities from "@/components/concerns/hazrat-amanat-shah-spinning-mills/SpinningCapabilities";
import SpinningProcessing from "@/components/concerns/hazrat-amanat-shah-spinning-mills/SpinningProcessing";

export const metadata: Metadata = {
  title: "Hazrat Amanat Shah Spinning Mills Ltd. | ASG - Amanat Shah Group",
  description:
    "Hazrat Amanat Shah Spinning Mills Ltd. (HASSML), the spinning arm of the Amanat Shah Group — delivering world-class yarn solutions through advanced machinery, rigorous quality control, and over two decades of expertise.",
};

export default function HazratAmanatShahSpinningMillsPage() {
  return (
    <main>
      <SpinningHero />
      <SpinningIntro />
      <SpinningCapabilities />
      <SpinningProcessing />
    </main>
  );
}

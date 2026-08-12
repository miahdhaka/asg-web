import type { Metadata } from "next";
import MiahHero from "@/components/concerns/miah/MiahHero";
import MiahIntro from "@/components/concerns/miah/MiahIntro";
import MiahCoreValues from "@/components/concerns/miah/MiahCoreValues";
import MiahProcessing from "@/components/concerns/miah/MiahProcessing";

export const metadata: Metadata = {
  title: "MIAH | ASG - Amanat Shah Group",
  description:
    "MIAH — a contemporary fashion brand by the Amanat Shah Group that transforms passion into timeless style, delivering premium clothing experiences through thoughtfully designed collections.",
};

export default function MiahPage() {
  return (
    <main>
      <MiahHero />
      <MiahIntro />
      <MiahCoreValues />
      <MiahProcessing />
    </main>
  );
}

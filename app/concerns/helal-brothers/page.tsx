import type { Metadata } from "next";
import HelalHero from "@/components/concerns/helal-brothers/HelalHero";
import HelalIntro from "@/components/concerns/helal-brothers/HelalIntro";
import HelalSocialModel from "@/components/concerns/helal-brothers/HelalSocialModel";
import HelalBrands from "@/components/concerns/helal-brothers/HelalBrands";
import HelalProcessing from "@/components/concerns/helal-brothers/HelalProcessing";

export const metadata: Metadata = {
  title: "M/s Helal & Brothers Ltd. | ASG - Amanat Shah Group",
  description:
    "M/s Helal & Brothers Ltd., the flagship concern of the Amanat Shah Group — pioneering Bangladesh's textile heritage through a community-focused social business model.",
};

export default function HelalBrothersPage() {
  return (
    <main>
      <HelalHero />
      <HelalIntro />
      <HelalSocialModel />
      <HelalBrands />
      <HelalProcessing />
    </main>
  );
}

import type { Metadata } from "next";
import WeHero from "@/components/sustainability/WeHero";
import WeIntro from "@/components/sustainability/WeIntro";
import WeImageRow from "@/components/sustainability/WeImageRow";
import WeInitiatives from "@/components/sustainability/WeInitiatives";

export const metadata: Metadata = {
  title: "Women Empowerment | ASG - Amanat Shah Group",
  description:
    "Amanat Shah Group's women empowerment initiatives — championing financial independence, zero tolerance to harassment, and flexible work opportunities for women across Bangladesh.",
};

export default function WomenEmpowermentPage() {
  return (
    <main>
      <WeHero />
      <WeIntro />
      <WeImageRow />
      <WeInitiatives />
    </main>
  );
}

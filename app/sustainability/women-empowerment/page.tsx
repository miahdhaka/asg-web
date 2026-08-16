import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
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
      <PageHero
        title="Women Empowerment"
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/sustainability/we/hero.png"
        desktopSrc="/images/sustainability/we/hero.png"
        alt="Women Empowerment — Amanat Shah Group"
        emblemSrc="/images/sustainability/csr/hero-emblem.png"
      />
      <WeIntro />
      <WeImageRow />
      <WeInitiatives />
    </main>
  );
}

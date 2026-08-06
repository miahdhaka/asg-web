import type { Metadata } from "next";
import HasslHero from "@/components/concerns/hazrat-amanat-shah-securities/HasslHero";
import HasslIntro from "@/components/concerns/hazrat-amanat-shah-securities/HasslIntro";
import HasslCapabilities from "@/components/concerns/hazrat-amanat-shah-securities/HasslCapabilities";

export const metadata: Metadata = {
  title: "Hazrat Amanat Shah Securities Ltd. | ASG - Amanat Shah Group",
  description:
    "Hazrat Amanat Shah Securities Limited (HASSL) — a licensed stock brokerage house under Amanat Shah Group, providing capital market services through DSE and CSE since 2009.",
};

export default function HasslPage() {
  return (
    <main>
      <HasslHero />
      <HasslIntro />
      <HasslCapabilities />
    </main>
  );
}

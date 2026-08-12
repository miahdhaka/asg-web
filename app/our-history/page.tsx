import type { Metadata } from "next";
import OurHistoryHero from "@/components/our-history/OurHistoryHero";
import HistoryTimeline from "@/components/our-history/HistoryTimeline";

export const metadata: Metadata = {
  title: "Our History | ASG - Amanat Shah Group",
  description:
    "At A Glance into The History of Amanat Shah Group — a 130-year legacy of excellence, integrity and entrepreneurship.",
};

export default function OurHistoryPage() {
  return (
    <main>
      <OurHistoryHero />
      <HistoryTimeline />
    </main>
  );
}

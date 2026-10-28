import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import HistoryTimeline from "@/components/our-history/HistoryTimeline";
import HistoryYearNav from "@/components/our-history/HistoryYearNav";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Our History | ASG - Amanat Shah Group",
  description:
    "At A Glance into The History of Amanat Shah Group — a 130-year legacy of excellence, integrity and entrepreneurship.",
};

export default function OurHistoryPage() {
  return (
    <main>
      <ScrollProgress />
      <PageHero
        title="Our History"
        subtitle="At A Glance into The History of Amanat Shah Group"
        mobileSrc="/images/our-history/history-mobile-hero.avif"
        desktopSrc="/images/our-history/history-desktop-hero.avif"
        alt="Our History"
      />
      <HistoryYearNav />
      <div id="history-timeline" className="pb-10 sm:pb-0 lg:pl-[10em]">
        <HistoryTimeline />
      </div>
    </main>
  );
}

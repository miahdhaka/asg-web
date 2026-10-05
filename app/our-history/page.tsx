import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import HistoryTimeline from "@/components/our-history/HistoryTimeline";
import HistoryYearNav from "@/components/our-history/HistoryYearNav";

export const metadata: Metadata = {
  title: "Our History | ASG - Amanat Shah Group",
  description:
    "At A Glance into The History of Amanat Shah Group — a 130-year legacy of excellence, integrity and entrepreneurship.",
};

export default function OurHistoryPage() {
  return (
    <main>
      <PageHero
        title="Our History"
        subtitle={'At A Glance into The History of\nAmanat Shah Group'}
        mobileSrc="/images/our-history/history-hero.jpg"
        desktopSrc="/images/our-history/history-hero.jpg"
        alt="Our History"
      />
      <HistoryYearNav />
      <div className="pb-10 sm:pb-0">
        <HistoryTimeline />
      </div>
    </main>
  );
}

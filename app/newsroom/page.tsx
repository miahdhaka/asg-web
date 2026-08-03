import type { Metadata } from "next";
import NewsHero from "@/components/newsroom/NewsHero";
import NewsGrid from "@/components/newsroom/NewsGrid";

export const metadata: Metadata = {
  title: "News Releases | ASG - Amanat Shah Group",
  description: "Stay in the know with the latest news from ASG Group.",
};

export default function NewsroomPage() {
  return (
    <main>
      <NewsHero />
      <NewsGrid />
    </main>
  );
}

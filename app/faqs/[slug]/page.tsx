import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/common/PageHero";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqCategories, getFaqCategory } from "@/components/faq/faqData";
import RevealOnScroll from "@/components/web-info/RevealOnScroll";
import ScrollProgress from "@/components/web-info/ScrollProgress";

/** Pre-render one page per category at build time */
export function generateStaticParams() {
  return faqCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/faqs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getFaqCategory(slug);

  if (!category) return { title: "FAQ's | ASG - Amanat Shah Group" };

  return {
    title: `${category.title} FAQ's | ASG - Amanat Shah Group`,
    description: category.description,
  };
}

export default async function FaqCategoryPage({
  params,
}: PageProps<"/faqs/[slug]">) {
  const { slug } = await params;
  const category = getFaqCategory(slug);

  if (!category) notFound();

  return (
    <main>
      <ScrollProgress />
      <PageHero
        title="FAQ's"
        subtitle="Family business legacy for more than 130 years."
        mobileSrc="/images/faq/hero.webp"
        desktopSrc="/images/faq/hero.webp"
        alt="ASG Group shipping and logistics operations"
      />
      <RevealOnScroll>
        <FaqAccordion title={category.title} items={category.faqs} />
      </RevealOnScroll>
    </main>
  );
}

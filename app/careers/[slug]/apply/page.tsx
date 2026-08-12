import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob } from "@/components/career/careerData";
import CareerApplicationForm from "@/components/career/CareerApplicationForm";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) return { title: "Apply | ASG - Amanat Shah Group" };

  return {
    title: `Apply for ${job.title} | ASG - Amanat Shah Group`,
    description: `Apply for ${job.title} — ${job.department} · ${job.location}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) notFound();

  return (
    <main className="w-full max-w-[85rem] mx-auto mt-[6rem] px-5 pb-16 pt-4">
      <CareerApplicationForm jobTitle={job.title} />
    </main>
  );
}

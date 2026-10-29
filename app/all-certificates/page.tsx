import type { Metadata } from "next";
import PageHeroFull from "@/components/common/PageHeroFull";
import CertificateGallery from "@/components/certificates/CertificateGallery";
import ScrollProgress from "@/components/web-info/ScrollProgress";

export const metadata: Metadata = {
  title: "Certifications and Compliance | ASG - Amanat Shah Group",
  description:
    "Every certification and compliance standard held across the Amanat Shah Group — click any certificate to view the full document.",
};

export default function CertificatesPage() {
  return (
    <main className="w-full">
      <ScrollProgress />
      {/* ── Full-screen hero ────────────────────────────────────────── */}
      {/* Currently the same cover image is used for mobile and desktop;
          pass distinct mobileSrc/desktopSrc assets here when they're ready. */}
      <PageHeroFull
        title={"Certifications\nand Compliance"}
        subtitle="130 Years of Legacy, Continuing into the Fourth Generation of Success"
        mobileSrc="/images/certification/all-certificate-cover-photo.png"
        desktopSrc="/images/certification/all-certificate-cover-photo.png"
        alt="ASG Group certifications and compliance"
      />

      {/* ── Certificate grid ────────────────────────────────────────── */}
      <section className="px-4 pt-10 pb-16 sm:px-6 md:px-12 lg:px-20 lg:pt-[6rem] lg:pb-[10rem]">
        <CertificateGallery />
      </section>
    </main>
  );
}

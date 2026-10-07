import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ContactInfo from "@/components/contact-us/ContactInfo";
import ContactForm from "@/components/contact-us/ContactForm";
import AllLocationsSection from "@/components/contact-us/AllLocationsSection";

export const metadata: Metadata = {
  title: "Contact Us | ASG - Amanat Shah Group",
  description:
    "Get in touch with ASG Group — reach our corporate headquarters, explore our sister concerns, or send us a message.",
};

export default function ContactUsPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="We welcome your inquiries, business proposals, partnerships, and opportunities for collaboration."
        mobileSrc="/images/contact-us/hero-bg.png"
        desktopSrc="/images/contact-us/hero-bg.png"
        alt="ASG Group contact us"
      />

      {/* Contact info + form section — split by a vertical divider */}
      <section className="lg:grid lg:grid-cols-[36.4rem_1fr]">
        {/* Left column — HQ info + hours */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-200 pl-4 sm:pl-8 lg:pl-[5rem] pt-6 sm:pt-10 lg:pt-[5rem] pb-6 sm:pb-16 lg:pb-[4.5rem]">
          <ContactInfo />
        </div>

        {/* Right column — form */}
        <div className="px-4 sm:px-8 lg:px-[5rem] pt-6 sm:pt-10 lg:pt-[5rem] pb-10 sm:pb-16 lg:pb-[5.5rem]">
          <ContactForm />
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-gray-200" />

      {/* ASG All Location section */}
      <AllLocationsSection />
    </main>
  );
}

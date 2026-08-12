import type { Metadata } from "next";
import ContactHero from "@/components/contact-us/ContactHero";
import ContactInfo from "@/components/contact-us/ContactInfo";
import ContactForm from "@/components/contact-us/ContactForm";
import OfficeSection from "@/components/contact-us/OfficeSection";
import { sisterConcernCards, salesPointCards } from "@/components/contact-us/contactData";

export const metadata: Metadata = {
  title: "Contact Us | ASG - Amanat Shah Group",
  description:
    "Get in touch with ASG Group — reach our corporate headquarters, explore our sister concerns, or send us a message.",
};

export default function ContactUsPage() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth">
      <ContactHero />

      {/* Contact info + form section — split by a vertical divider */}
      <section className="snap-start h-screen lg:grid lg:grid-cols-[36.4rem_1fr]">
        {/* Left column — HQ info + hours (divider runs full column height) */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-100 px-4 sm:px-8 lg:px-[5rem] pt-10 lg:pt-[5rem] pb-16 lg:pb-[4.5rem]">
          <ContactInfo />
        </div>

        {/* Right column — form */}
        <div className="px-4 sm:px-8 lg:px-[5rem] pt-10 lg:pt-[5rem] pb-16 lg:pb-[6.5rem]">
          <ContactForm />
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-gray-100" />

      {/* Sister Concerns Office — ends with a trailing divider */}
      <OfficeSection
        heading="Sister Concerns Office"
        cards={sisterConcernCards}
        trailingDivider
        className="snap-start h-screen"
      />

      {/* Sales Point */}
      <OfficeSection
        heading="Sales Point"
        cards={salesPointCards}
        className="snap-start h-screen pb-[3.75rem]"
      />
    </main>
  );
}

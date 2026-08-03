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
    <main>
      <ContactHero />

      {/* Contact info + form section */}
      <section className="px-[3.75rem] py-[4rem]">
        <div className="grid grid-cols-1 gap-[3rem] lg:grid-cols-3 lg:gap-[4rem]">
          {/* Left column — HQ info + hours (col-span-1) */}
          <div className="border-r border-gray-100 pr-[3rem] lg:col-span-1">
            <ContactInfo />
          </div>

          {/* Right column — form (col-span-2) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-gray-100" />

      {/* Sister Concerns Office */}
      <section className="flex flex-col px-[3.75rem] py-[3rem]">
        <OfficeSection heading="Sister Concerns Office" cards={sisterConcernCards} />
      </section>

      {/* Divider */}
      <hr className="border-t border-gray-100" />

      {/* Sales Point */}
      <section className="flex flex-col px-[3.75rem] py-[3rem]">
        <OfficeSection heading="Sales Point" cards={salesPointCards} />
      </section>
    </main>
  );
}

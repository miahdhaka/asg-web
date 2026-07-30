import Link from "next/link";

const paragraphs = [
  "One of the most reputable and diverse corporate empires in Bangladesh, Amanat Shah Group has been proudly upholding a tradition of excellence, integrity and entrepreneurship for almost 130 years. With operations in textiles, manufacturing, agriculture, financial services, real estate, information technology, industrial solutions, and other new sectors, the Group has developed from its traditional roots into a contemporary multi-sector Organization.",
  "Amanat Shah Group is committed to delivering sustainable growth through innovation, operational excellence, advanced technology and responsible business practices with a clear strategic vision and strong leadership.",
  "Built on the pillars of Quality, Reliability, Talent, System, Innovation and worldwide Responsibility, the Group continuously creates long-term value for customers, employees, shareholders and society. Today, ASG stands as a symbol of trust, resilience and sustainable business success, serving both local and international markets while shaping a stronger future for generations to come.",
];

const quickLinks = [
  { label: "OUR CONCERNS", href: "#" },
  { label: "LEADERSHIP", href: "#" },
  { label: "OUR HISTORY", href: "#" },
];

export default function AboutIntro() {
  return (
    <section id="about-intro" className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-10 sm:py-12 lg:py-[5em]">
      {/* Lead statement */}
      <h2 className="text-xl sm:text-3xl lg:text-[2.5rem] sm:leading-[1.3] lg:leading-[1.2] text-neutral-800 max-w-full lg:max-w-[56.25rem] font-test-tiempos-fine">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Body copy — indented column */}
      <div className="flex flex-col gap-6 w-full lg:w-[55rem] lg:mx-auto mt-6 sm:mt-8 lg:mt-11">
        <div className="flex flex-col gap-4">
          {paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="text-sm sm:text-base lg:text-lg text-neutral-800 text-justify tracking-wide">
              {text}
            </p>
          ))}
        </div>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-6 gap-y-3 lg:gap-8">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm sm:text-base lg:text-lg text-neutral-800 tracking-wide underline underline-offset-2 gradient-text-hover"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

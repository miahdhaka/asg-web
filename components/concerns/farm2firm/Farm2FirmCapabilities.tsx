import Image from "next/image";

const cards = [
  {
    title: "Sustainable Farming",
    body: "Implementing environmentally responsible practices that protect the land and promote biodiversity.",
    icon: "/images/concerns/farm2firm/icon-farm2firm-1.svg",
  },
  {
    title: "Quality Excellence",
    body: "A rigorous commitment to consistency and premium standards throughout the harvesting and manufacturing stages.",
    icon: "/images/concerns/farm2firm/icon-farm2firm-2.svg",
  },
  {
    title: "Community Empowerment",
    body: "Fostering local growth and social responsibility through ethical supply chain management.",
    icon: "/images/concerns/farm2firm/icon-farm2firm-3.svg",
  },
  {
    title: "Heritage & Innovation",
    body: "Combining traditional agricultural expertise with modern industrial efficiency.",
    icon: "/images/concerns/farm2firm/icon-farm2firm-4.svg",
  },
];

function CapabilityCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <div className="card-gradient-hover relative flex flex-col border border-[#F5F5F5] bg-white p-5 lg:w-[29.33em] lg:p-[2em]">
      <Image
        src={card.icon}
        alt=""
        width={50}
        height={50}
        className="relative h-auto w-10 lg:w-[4.17em]"
      />
      <h3 className="relative mt-4 font-test-tiempos-fine text-base font-medium text-neutral-800 lg:mt-[0.89em] lg:w-[9.11em] lg:text-[1.5em] lg:leading-[1.56]">
        {card.title}
      </h3>
      <p className="relative mt-2 text-xs text-neutral-800 sm:text-sm lg:mt-[0.57em] lg:w-[20.5em] lg:text-[1.17em] lg:leading-[1.43]">
        {card.body}
      </p>
    </div>
  );
}

/**
 * "Core Strengths & Competencies" — light-gray band with a staggered 2×2
 * capability card grid on the left and the section copy on the right
 * (Figma node 2604-32706).
 */
export default function Farm2FirmCapabilities() {
  return (
    <section
      id="farm2firm-capabilities"
      className="w-full bg-[rgb(249,250,251)] px-4 py-10 sm:px-6 lg:px-[10em] lg:py-[5em]"
    >
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[5em]">
        {/* Staggered card grid — right column sits 63px lower than the left */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0 lg:flex lg:w-[58.67em] lg:shrink-0">
          <div className="flex flex-col gap-4 sm:gap-0">
            <CapabilityCard card={cards[0]} />
            <CapabilityCard card={cards[2]} />
          </div>
          <div className="flex flex-col gap-4 sm:gap-0 lg:mt-[5.25em]">
            <CapabilityCard card={cards[1]} />
            <CapabilityCard card={cards[3]} />
          </div>
        </div>

        {/* Section copy */}
        <div className="lg:w-[35.25em]">
          <h2 className="font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[10.53em] lg:text-[3em] lg:leading-[1.11]">
            Core Strengths &amp; Competencies
          </h2>
          <p className="mt-3 text-sm text-neutral-800 lg:mt-[1.14em] lg:w-[27.79em] lg:text-[1.17em] lg:leading-[1.43]">
            Our strength lies in a holistic approach to tea manufacturing
          </p>
        </div>
      </div>
    </section>
  );
}

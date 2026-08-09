import Image from "next/image";

const cards = [
  {
    title: "Specialty Chemical Manufacturing",
    body: "Expert in producing high-quality surfactants and emulsifiers tailored for textile applications.",
  },
  {
    title: "Customized Formulations",
    body: "Dedicated to understanding unique client requirements and delivering tailored solutions quickly and reliably.",
  },
  {
    title: "Innovation & R&D",
    body: "Driven by a robust focus on research and development to offer cost-effective and high-performance products.",
  },
  {
    title: "Quality Assurance",
    body: "Backed by state-of-the-art facilities and a dedicated team, we ensure the highest standards of quality across all production batches.",
  },
];

function CapabilityCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <div className="card-gradient-hover relative flex flex-col border border-[#F5F5F5] bg-white p-5 lg:w-[29.33em] lg:p-[2em]">
      <Image
        src="/images/concerns/amanat-shah-tex-solution/icon-tex-solution.svg"
        alt=""
        width={50}
        height={50}
        className="relative h-auto w-10 lg:w-[4.17em]"
      />
      <h3 className="relative mt-4 font-test-tiempos-fine text-base font-medium text-neutral-800 lg:mt-[0.89em] lg:w-[13em] lg:text-[1.5em] lg:leading-[1.56]">
        {card.title}
      </h3>
      <p className="relative mt-2 text-xs text-neutral-800 sm:text-sm lg:mt-[0.57em] lg:w-[20.5em] lg:text-[1.17em] lg:leading-[1.43]">
        {card.body}
      </p>
    </div>
  );
}

/**
 * "Core Capabilities & Services" — light-gray band with a staggered 2×2
 * capability card grid on the left and the section copy on the right
 * (Figma node 1692-10970).
 */
export default function TexSolutionCapabilities() {
  return (
    <section
      id="tex-solution-capabilities"
      className="w-full bg-[rgb(249,250,251)] px-4 py-10 sm:px-6 lg:px-[10em] lg:py-[5em]"
    >
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[5em]">
        {/* Staggered card grid — right column sits lower than the left */}
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
          <h2 className="font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[12em] lg:text-[3em] lg:leading-[1.11]">
            Core Capabilities &amp; Services
          </h2>
          <p className="mt-3 text-sm text-neutral-800 lg:mt-[1.14em] lg:w-[29.58em] lg:text-[1.17em] lg:leading-[1.43]">
            We offer a comprehensive range of chemical solutions designed to
            meet the rigorous demands of modern textile processing
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const cards = [
  {
    title: "Advanced Warping & Sizing",
    body: "We utilize state-of-the-art machinery sourced from Germany and Switzerland to ensure efficient, high-precision operations.",
    tall: true,
    gradient: true,
  },
  {
    title: "High-Performance Weaving",
    body: "Operating state-of-the-art Rapier and Airjet looms from Belgium.",
    tall: false,
    gradient: false,
  },
  {
    title: "Computerized Processing",
    body: "Featuring advanced dyeing and finishing lines equipped with computerized Color Kitchen and auto-dosing systems from Europe.",
    tall: true,
    gradient: false,
  },
  {
    title: "Printing & Dyeing Excellence",
    body: "Implementing cutting-edge rotary screen and digital printing technology from Italy.",
    tall: false,
    gradient: false,
  },
];

function CapabilityCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <div
      className={`relative flex flex-col p-5 lg:w-[29.33em] lg:p-[2em] ${
        card.tall ? "lg:h-[19.83em]" : "lg:h-[18.17em]"
      } ${card.gradient ? "" : "border border-[#F5F5F5] bg-white"}`}
    >
      {card.gradient && (
        <span
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{ background: "var(--primary-gradient)" }}
        />
      )}
      <div className="relative flex h-12 w-12 items-center justify-center bg-white lg:h-[4.17em] lg:w-[4.17em]">
        <Image
          src="/images/concerns/amanat-shah-fabrics/icon-yarn.svg"
          alt=""
          width={32}
          height={39}
          className="h-auto w-6 lg:w-[2.67em]"
        />
      </div>
      <h3 className="relative mt-4 font-test-tiempos-fine text-base font-medium text-neutral-800 lg:mt-[1.33em] lg:max-w-[13.67em] lg:text-[1.5em] lg:leading-[1.56]">
        {card.title}
      </h3>
      <p className="relative mt-2 text-xs text-neutral-800 sm:text-sm lg:mt-[0.67em] lg:max-w-[23.92em] lg:text-[1.17em] lg:leading-[1.43]">
        {card.body}
      </p>
    </div>
  );
}

/**
 * "Core Capabilities & Technology" — light-gray band with a staggered 2×2
 * capability card grid on the left and the section copy on the right
 * (Figma node 2604-30541).
 */
export default function FabricsCapabilities() {
  return (
    <section
      id="fabrics-capabilities"
      className="w-full bg-[rgb(249,250,251)] px-4 py-10 sm:px-6 lg:px-[10em] lg:py-[5em]"
    >
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[5em]">
        {/* Staggered card grid — right column sits 69px lower than the left */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0 lg:flex lg:w-[58.67em] lg:shrink-0">
          <div className="flex flex-col gap-4 sm:gap-0">
            <CapabilityCard card={cards[0]} />
            <CapabilityCard card={cards[2]} />
          </div>
          <div className="flex flex-col gap-4 sm:gap-0 lg:mt-[5.75em]">
            <CapabilityCard card={cards[1]} />
            <CapabilityCard card={cards[3]} />
          </div>
        </div>

        {/* Section copy */}
        <div className="lg:w-[35.92em]">
          <h2 className="font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[9.75em] lg:text-[3em] lg:leading-[1.11]">
            Core Capabilities &amp; Technology
          </h2>
          <p className="mt-3 text-sm text-neutral-800 lg:mt-[1.33em] lg:w-[29.58em] lg:text-[1.17em] lg:leading-[1.43]">
            At Amanat Shah Fabrics Ltd. (ASFL), we employ state-of-the-art
            European and advanced machinery across our entire production chain
            to ensure superior quality, efficiency, and consistency.
          </p>
        </div>
      </div>
    </section>
  );
}

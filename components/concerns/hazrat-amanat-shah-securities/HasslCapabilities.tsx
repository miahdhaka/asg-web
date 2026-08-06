import Image from "next/image";

const cards = [
  {
    title: "Advanced Trading Platforms",
    body: "We utilize modern web-based online trading platforms that integrate real-time market data and automated order execution.",
  },
  {
    title: "Comprehensive Systems",
    body: "Our infrastructure includes secure BO account management integrated with CDBL, along with automated client notification systems for real-time trade updates and SMS alerts.",
  },
  {
    title: "Analytical Tools",
    body: "Clients have access to basic charting and professional market analysis tools to support informed investment decision-making.",
  },
  {
    title: "Rigorous Quality Control",
    body: "Every process, from fiber to finished garment, is governed by stringent quality controls and international compliance standards.",
  },
];

function CapabilityCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <div className="card-gradient-hover relative flex flex-col border border-[#F5F5F5] bg-white p-5 lg:w-[29.33em] lg:p-[2em]">
      <Image
        src="/images/concerns/hazrat-amanat-shah-securities/icon-hassl.svg"
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
 * "Technical Infrastructure & Trading Excellence" — light-gray band
 * with a staggered 2×2 capability card grid on the left and the section copy
 * on the right (Figma node 2604-32050).
 */
export default function HasslCapabilities() {
  return (
    <section
      id="hassl-capabilities"
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
            Technical Infrastructure &amp; Trading Excellence
          </h2>
          <p className="mt-3 text-sm text-neutral-800 lg:mt-[1.14em] lg:w-[27.79em] lg:text-[1.17em] lg:leading-[1.43]">
            HASSL leverages modern technology to provide a seamless and
            efficient trading experience for our clients
          </p>
        </div>
      </div>
    </section>
  );
}

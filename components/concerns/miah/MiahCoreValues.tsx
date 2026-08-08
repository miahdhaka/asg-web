import Image from "next/image";

const cards = [
  {
    title: "Heritage Meets Modern Fashion",
    body: "We celebrate Bangladesh's cultural identity by creating designs that honor tradition while embracing contemporary lifestyles.",
    icon: "/images/concerns/miah/icon-value-1.svg",
  },
  {
    title: "Commitment to Quality",
    body: "We focus on premium materials, refined craftsmanship, and consistent quality to deliver products customers can trust.",
    icon: "/images/concerns/miah/icon-value-2.svg",
  },
  {
    title: "Customer-Focused Experience",
    body: "Customer satisfaction is at the heart of MIAH, ensuring a seamless online shopping experience with reliable service and value-driven products.",
    icon: "/images/concerns/miah/icon-value-3.svg",
  },
  {
    title: "Innovation & Creativity",
    body: "We continuously explore new designs, trends, and technologies to stay ahead in the changing fashion landscape.",
    icon: "/images/concerns/miah/icon-value-4.svg",
  },
];

function ValueCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <div className="card-gradient-hover relative flex flex-col border border-[#F5F5F5] bg-white p-5 lg:w-[29.33em] lg:p-[2em]">
      <div className="relative flex h-12 w-12 items-center justify-center lg:h-[4.17em] lg:w-[4.17em]">
        <Image
          src={card.icon}
          alt=""
          width={50}
          height={50}
          className="h-auto w-full object-contain"
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
 * "Core Values & Philosophy" — light-gray band with a staggered 2×2
 * value card grid on the left and the section heading on the right
 * (Figma node 1631-8349).
 */
export default function MiahCoreValues() {
  return (
    <section
      id="miah-core-values"
      className="w-full bg-[rgb(249,250,251)] px-4 py-10 sm:px-6 lg:px-[10em] lg:py-[5em]"
    >
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[5em]">
        {/* Staggered card grid — right column sits 69px lower than the left */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0 lg:flex lg:w-[58.67em] lg:shrink-0">
          <div className="flex flex-col gap-4 sm:gap-0">
            <ValueCard card={cards[0]} />
            <ValueCard card={cards[2]} />
          </div>
          <div className="flex flex-col gap-4 sm:gap-0 lg:mt-[5.75em]">
            <ValueCard card={cards[1]} />
            <ValueCard card={cards[3]} />
          </div>
        </div>

        {/* Section heading */}
        <div className="lg:w-[35.92em]">
          <h2 className="font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[9.75em] lg:text-[3em] lg:leading-[1.11]">
            Core Values &amp; Philosophy
          </h2>
          <p className="mt-3 text-sm text-neutral-800 lg:mt-[1.33em] lg:w-[29.58em] lg:text-[1.17em] lg:leading-[1.43]">
            Our brand identity is built upon five foundational pillars
          </p>
        </div>
      </div>
    </section>
  );
}

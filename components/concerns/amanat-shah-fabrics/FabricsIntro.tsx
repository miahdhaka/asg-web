const paragraphs = [
  "Amanat Shah Fabrics Ltd. (ASFL), a sister concern of the Amanat Shah Group, is a modern, vertically integrated textile manufacturer established in 2017. The company specializes in producing high-quality dyed, printed, and finished woven fabrics using cutting-edge European technology, including advanced looms from Belgium and digital printing systems from Italy",
  "ASFL stands for innovation, reliability, and excellence, serving global fashion brands across Europe, the USA, the Middle East, and Australia. The company maintains rigorous quality control at every stage, from raw material selection to final finishing, ensuring products meet international standards for performance and color fastness.",
  "Committed to sustainability and ethical practices, ASFL is a trusted partner for major global retailers, including Ralph Lauren, H&M, and Zara. Beyond its global reach, the company continues to play a vital role in supporting the domestic Bangladeshi apparel sector with high-quality textile solutions.",
];

const stats = [
  { value: "1,900", unit: "Tons", label: "Yarn" },
  { value: "1.8", unit: "Million meters", label: "Weaving" },
  { value: "3.2", unit: "Million yards", label: "Dyeing / Printing / Finishing" },
  { value: "1200", unit: "", label: "Employees" },
];

/**
 * Intro copy and the four-up production stat cards that sit between the
 * hero image and the capabilities band (Figma node 2604-30541).
 */
export default function FabricsIntro() {
  return (
    <section
      id="fabrics-intro"
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-[5em] lg:py-[5em]"
    >
      <h2 className="max-w-3xl font-test-tiempos-fine text-2xl text-neutral-800 sm:text-3xl lg:max-w-[58.9em] lg:text-[2.5em] lg:leading-[1.2]">
        One of the most reputable and diverse corporate empires in Bangladesh,
        Amanat Shah Group has been Family business legacy.
      </h2>

      {/* Copy block — pushed toward the right column on desktop */}
      <div className="mt-6 flex flex-col gap-4 lg:mt-[3em] lg:ml-[23.83em] lg:w-[53.08em] lg:gap-[1.33em]">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 24)}
            className="text-sm text-neutral-800 lg:text-[1.17em] lg:leading-[1.43]"
          >
            {text}
          </p>
        ))}
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-[5em] lg:grid-cols-4 lg:gap-[1.33em]">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="flex items-baseline gap-2 border border-gray-100 bg-gray-50 px-4 pt-6 pb-4 lg:h-[11.17em] lg:gap-[0.67em] lg:px-[1.33em] lg:pt-[2.67em] lg:pb-0">
              <span className="font-test-tiempos-fine text-4xl font-medium text-neutral-800 lg:text-[5em] lg:leading-[1.17]">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-xs text-neutral-800 sm:text-sm lg:text-[1.17em] lg:leading-[1.43]">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="flex items-center border border-t-0 border-gray-100 bg-gray-50 px-4 py-3 lg:h-[4.67em] lg:px-[1.33em] lg:py-0">
              <span className="text-xs uppercase text-neutral-800 sm:text-sm lg:text-[1.33em] lg:leading-[1.5]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

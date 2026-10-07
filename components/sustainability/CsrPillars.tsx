import { csrPillars, csrPillarsHeading, type CsrPillar } from "./csrData";

/* One staggered commitment column; the 2nd and 3rd carry a left divider
   and sit progressively lower (Figma y 2764 / 2824 / 2922). */
function PillarColumn({
  pillar,
  offsetClass,
  divider,
}: {
  pillar: CsrPillar;
  offsetClass: string;
  divider: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${divider ? "lg:border-l lg:border-gray-200 lg:pl-8" : ""} ${offsetClass}`}
    >
      <h3 className="font-archivo-black text-neutral-800 text-[2rem] leading-[1.15] sm:text-[2.375rem] lg:text-[3.125rem] lg:leading-[1.1]">
        {pillar.value && (
          <span className="lg:text-[3.75rem] lg:leading-[4.375rem]">
            {pillar.value}{" "}
          </span>
        )}
        {pillar.value ? (
          <span className="text-[1.375rem] lg:text-[1.875rem] lg:leading-[2.25rem]">
            {pillar.title}
          </span>
        ) : (
          pillar.title
        )}
      </h3>
      <p className="font-neue-montreal text-base leading-6 text-neutral-800">
        {pillar.description}
      </p>
    </div>
  );
}

/* Impact & Community Initiatives — divider line, uppercase heading and
   three staggered commitment columns (Figma 7740:50477–7740:50489) */
export default function CsrPillars() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pt-8 lg:pt-[3.75rem]">
      <div className="mx-auto w-full max-w-[66rem]">
        <hr className="border-0 border-t border-gray-200" />

        <h2 className="mt-8 max-w-[25.125rem] font-archivo-black uppercase text-[#1A1A1A] text-xl sm:text-2xl lg:mt-[3.75rem] lg:text-[1.875rem] lg:leading-[2.25rem]">
          {csrPillarsHeading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-0">
          <PillarColumn pillar={csrPillars[0]} offsetClass="" divider={false} />
          <PillarColumn
            pillar={csrPillars[1]}
            offsetClass="lg:mt-[3.75rem]"
            divider
          />
          <PillarColumn
            pillar={csrPillars[2]}
            offsetClass="lg:mt-[9.875rem]"
            divider
          />
        </div>
      </div>
    </section>
  );
}

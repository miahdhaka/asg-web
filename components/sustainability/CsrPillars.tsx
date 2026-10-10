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
      <h3 className="font-archivo-black text-neutral-800 text-xl sm:text-[1.75rem] leading-[1.15] md:text-[3rem] lg:text-[4rem] lg:leading-[1.1]">
        {pillar.value ? (
          <>
            {/* Keep the big value + first word of the title on the same line */}
            <span className="whitespace-nowrap">
              <span className="text-[42px] lg:text-[4.75rem] lg:leading-[5.375rem]">
                {pillar.value}{" "}
              </span>
              <span className="text-[1.3rem] sm:text-[1.75rem] lg:text-[2.5rem] lg:leading-[2.875rem]">
                {(pillar.title ?? "").split(" ")[0]}
              </span>
            </span>
            {(pillar.title ?? "").split(" ").slice(1).length > 0 && (
              <>
                {" "}
                <span className="text-[1.3rem] sm:text-[1.75rem] lg:text-[2.5rem] lg:leading-[2.875rem]">
                  {(pillar.title ?? "").split(" ").slice(1).join(" ")}
                </span>
              </>
            )}
          </>
        ) : (
          pillar.title
        )}
      </h3>
      <p className="font-neue-montreal text-base leading-6 text-neutral-800 sm:text-lg sm:leading-7 lg:text-xl lg:leading-8">
        {pillar.description}
      </p>
    </div>
  );
}

/* Impact & Community Initiatives — divider line, uppercase heading and
   three staggered commitment columns (Figma 7740:50477–7740:50489) */
export default function CsrPillars() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 pb-10 lg:pb-[4.8rem]">
      <div className="mx-auto w-full max-w-[80rem]">
        <hr className="border-0 border-t border-gray-200" />

        <h2 className="mt-8 max-w-[36rem] font-archivo-black uppercase text-[#1A1A1A] text-xl sm:text-4xl lg:mt-[4.8rem] lg:text-[2.75rem] lg:leading-[3.25rem]">
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

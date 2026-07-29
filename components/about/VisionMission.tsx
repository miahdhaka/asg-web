import Image from "next/image";

export default function VisionMission() {
  return (
    <>
      {/* ============ VISION — light ============ */}
      <section id="about-vision" className="w-full bg-gray-50 px-[5em] py-[5em]">
        <div className="relative flex items-start gap-[2.5em]">
          {/* Eyebrow + faded word */}
          <div className="flex w-[38%] shrink-0 flex-col gap-6">
            <div className="flex items-center gap-3.5">
              <span className="font-test-tiempos-fine text-[26px] font-medium text-neutral-800">
                VISION
              </span>
              <span aria-hidden className="size-1.5 bg-neutral-800" />
            </div>
            <Image
              src="/images/about/vision-fade.png"
              alt=""
              aria-hidden
              width={483}
              height={107}
              quality={100}
              className="w-full h-auto"
            />
          </div>

          {/* Photo — own aspect ratio, fills the remaining width */}
          <div className="relative flex-1">
            <Image
              src="/images/about/vision-mission.png"
              alt="ASG vision"
              width={1100}
              height={668}
              quality={90}
              className="w-full h-auto"
            />
            <div aria-hidden className="absolute inset-0 overlay-black-linear" />
          </div>
        </div>

        {/* Copy panel — notches into the photo's bottom-left corner */}
        <div className="relative z-10 -mt-[14em] w-[55%] bg-gray-50 py-[5em] pl-[10em] pr-[4em]">
          <p className="text-[28px] tracking-wider text-neutral-800">
            Be the Benchmark and create sustainable value through Quality, System,
            Talent Empowerment, Innovation and Sustainability.
          </p>
        </div>
      </section>

      {/* ============ MISSION — dark ============ */}
      <section
        id="about-mission"
        className="relative w-full overflow-hidden bg-[var(--primary-black)] px-[5em] py-[5em]"
      >
        {/* Decorative pattern — pinned to the top-right corner */}
        <Image
          src="/images/about/mission-decor.svg"
          alt=""
          aria-hidden
          width={581}
          height={548}
          quality={100}
          className="absolute right-0 top-0 w-[36em] h-auto opacity-70"
        />

        <div className="flex items-start gap-[2.5em]">
          {/* Eyebrow + faded word */}
          <div className="flex w-[38%] shrink-0 flex-col gap-6">
            <div className="flex items-center gap-3.5">
              <span className="font-test-tiempos-fine text-[26px] font-medium text-white">
                OUR MISSION
              </span>
              <span aria-hidden className="size-1.5 bg-white" />
            </div>
            <Image
              src="/images/about/mission-fade.png"
              alt=""
              aria-hidden
              width={489}
              height={90}
              quality={100}
              className="w-full h-auto"
            />
          </div>

          {/* Photo — own aspect ratio, fills the remaining width */}
          <div className="relative flex-1">
            <Image
              src="/images/about/vision-mission.png"
              alt="ASG mission"
              width={1100}
              height={668}
              quality={90}
              className="w-full h-auto"
            />
            <div aria-hidden className="absolute inset-0 overlay-black-linear" />
          </div>
        </div>

        {/* Copy panel — notches into the photo's bottom-left corner */}
        <div className="relative z-10 -mt-[14em] w-[54%] bg-[var(--primary-black)] py-[5em] pl-[10em] pr-[4em]">
          <p className="text-[28px] tracking-wider text-neutral-400">
            To deliver excellent products and after-sales services through smart
            solutions and lean operations, talent attraction, Collaboration,
            Continuous Improvement and while driving sustainable global growth.
          </p>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";

export default function VisionMission() {
  return (
    <>
      {/* ============ VISION — light ============ */}
      <section id="about-vision" className="w-full bg-gray-50 px-4 sm:px-6 lg:px-[5em] py-6 sm:py-12 lg:py-[5em]">
        <div className="relative flex flex-col gap-0 sm:gap-6 lg:flex-row lg:items-start lg:gap-[2.5em]">
          {/* Eyebrow + faded word */}
          <div className="flex flex-col gap-0 sm:gap-4 lg:gap-6 w-full lg:w-[38%] shrink-0">
            <div className="flex items-center gap-3.5">
              <span className="text-xl lg:text-[26px] text-neutral-800 font-test-tiempos-fine font-medium">
                VISION
              </span>
              <span aria-hidden className="size-1 sm:size-1.5 bg-neutral-800" />
            </div>
            <Image
              src="/images/about-us/vision-fade.png"
              alt=""
              aria-hidden
              width={483}
              height={107}
              quality={100}
              className="w-full h-auto lg:w-auto lg:h-[7.7em]"
            />
          </div>

          {/* Photo — own aspect ratio, fills the remaining width */}
          <div className="order-3 relative w-full lg:order-none lg:flex-1 mt-4">
            <Image
              src="/images/about-us/vision-mission.png"
              alt="ASG vision"
              width={1100}
              height={668}
              quality={90}
              className="w-full h-auto"
            />
            <div aria-hidden className="absolute inset-0 overlay-black-linear" />
          </div>

          {/* Copy panel — sits between the fade word and photo on mobile, overlays the photo on desktop */}
          <div className="order-2 w-full bg-gray-50 lg:order-none lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:w-[55%] lg:py-[5em] lg:pl-[10em] lg:pr-[4em] sm:pt-2 lg:pt-[5em]">
            <p className="text-sm sm:text-lg lg:text-2xl xl:text-3xl tracking-wide lg:tracking-wider text-neutral-800">
              Be the Benchmark and create sustainable value through Quality, System,
              Talent Empowerment, Innovation and Sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* ============ MISSION — dark ============ */}
      <section id="about-mission" className="w-full bg-[var(--primary-black)] px-4 sm:px-6 lg:px-[5em] py-6 sm:py-12 lg:py-[5em]">
        <div className="relative flex flex-col gap-0 sm:gap-6 lg:flex-row lg:items-start lg:gap-[2.5em]">
          {/* Eyebrow + faded word */}
          <div className="flex flex-col gap-0 sm:gap-4 lg:gap-6 w-full lg:w-[38%] shrink-0">
            <div className="flex items-center gap-3.5">
              <span className="text-xl lg:text-[26px] text-white font-test-tiempos-fine font-medium">
                OUR MISSION
              </span>
              <span aria-hidden className="size-1 sm:size-1.5 bg-white" />
            </div>
            <Image
              src="/images/about-us/mission-fade.png"
              alt=""
              aria-hidden
              width={489}
              height={90}
              quality={100}
              className="w-full h-auto lg:w-auto lg:h-[7.7em]"
            />
          </div>

          {/* Photo — own aspect ratio, fills the remaining width */}
          <div className="order-3 relative w-full lg:order-none lg:flex-1 mt-4">
            <Image
              src="/images/about-us/vision-mission.png"
              alt="ASG mission"
              width={1100}
              height={668}
              quality={90}
              className="w-full h-auto"
            />
            <div aria-hidden className="absolute inset-0 overlay-black-linear" />
          </div>

          {/* Copy panel — sits between the fade word and photo on mobile, overlays the photo on desktop */}
          <div className="order-2 w-full bg-[var(--primary-black)] lg:order-none lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:w-[55%] lg:py-[5em] lg:pl-[10em] lg:pr-[4em] sm:pt-2 lg:pt-[5em]">
            <p className="text-sm sm:text-lg lg:text-2xl xl:text-3xl tracking-wide lg:tracking-wider text-neutral-400">
              To deliver excellent products and after-sales services through smart
              solutions and lean operations, talent attraction, Collaboration,
              Continuous Improvement and while driving sustainable global growth.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";

export default function VisionMission() {
  return (
    <>
      {/* ============ VISION — gradient bg, text left, image right ============ */}
      <section id="about-vision" className="relative w-full overflow-hidden">
        {/* Background gradient */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(150deg, rgba(139, 195, 74, 0.1) 0%, rgba(26, 161, 121, 0.1) 87%)" }}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0 px-4 sm:px-6 lg:px-[5em] py-16 lg:py-[5rem]">
          {/* Text block */}
          <div className="flex flex-col gap-5 sm:gap-8 lg:w-[560px] shrink-0 z-10">
            <div className="flex items-center gap-2">
              <span className="font-archivo-black text-3xl sm:text-5xl lg:text-[3rem] leading-[1.1] text-[#262626] uppercase">
                VISION
              </span>
              <span className="size-2 sm:size-2.5 rounded-full" style={{ background: "var(--primary-gradient)" }} />
            </div>
            <p className="font-neue-montreal text-base sm:text-2xl lg:text-[1.65rem] font-medium leading-6 sm:leading-9.5 text-[#262626]">
              Be the Benchmark and create sustainable value through Quality, System,
              Talent Empowerment, Innovation and Sustainability.
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full lg:flex-1 lg:ml-auto lg:max-w-[920px] aspect-[697/465] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-us/vision.png"
              alt="ASG vision"
              fill
              quality={90}
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(12, 12, 12, 0.8) 0%, rgba(0, 0, 0, 0) 59%)" }}
            />
          </div>
        </div>
      </section>

      {/* ============ MISSION — dark bg, text left, image right ============ */}
      <section id="about-mission" className="relative w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/about-us/mission-bg.png"
          alt=""
          aria-hidden
          fill
          quality={90}
          className="object-cover"
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0 px-4 sm:px-6 lg:px-[5em] py-16 lg:py-[5rem]">
          {/* Text block */}
          <div className="flex flex-col gap-5 sm:gap-8 lg:w-[560px] shrink-0 z-10">
            <div className="flex items-center gap-2">
              <span className="font-archivo-black text-3xl sm:text-5xl lg:text-[3rem] leading-[1.1] text-white uppercase">
                OUR MISSION
              </span>
              <span className="size-2 sm:size-2.5 rounded-full" style={{ background: "var(--primary-gradient)" }} />
            </div>
            <p className="font-neue-montreal text-base sm:text-2xl lg:text-[1.65rem] font-medium leading-6 sm:leading-9.5 text-white">
              To deliver excellent products and after-sales services through smart
              solutions and lean operations, talent attraction, Collaboration,
              Continuous Improvement and while driving sustainable global growth.
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full lg:flex-1 lg:ml-auto lg:max-w-[920px] aspect-[697/465] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-us/mission.png"
              alt="ASG mission"
              fill
              quality={90}
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(12, 12, 12, 0.8) 0%, rgba(0, 0, 0, 0) 59%)" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

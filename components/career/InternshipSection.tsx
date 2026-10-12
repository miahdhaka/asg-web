import Image from "next/image";

export default function InternshipSection() {
  return (
    <section id="career-internship" className="bg-white py-10 sm:py-12 lg:py-[5rem]">
      <div className="mx-auto flex w-full max-w-[98.5rem] flex-col items-center gap-8 px-4 sm:px-8 lg:flex-row lg:gap-[4rem] lg:px-[5rem]">
        {/* Photo */}
        <div className="relative aspect-[547/356] w-full shrink-0 overflow-hidden rounded-[1.25rem] lg:h-[29.6667rem] lg:w-[45.5833rem] lg:aspect-auto">
          <Image
            src="/images/career/internship.webp"
            alt="ASG interns collaborating at the office"
            fill
            quality={90}
            sizes="(min-width: 1024px) 45.5833rem, 100vw"
            className="object-cover"
          />
        </div>

        {/* Copy */}
        <div className="w-full lg:w-[35rem]">
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="font-archivo-black text-2xl sm:text-3xl lg:text-[3rem] leading-8 text-neutral-800 lg:leading-[3.3333rem]">
                Join the Internship Program at
              </h2>
              <p className="text-xl leading-7.5 font-medium text-neutral-800 lg:text-[1.5rem] lg:leading-[2rem] tracking-wide">
                Start your career journey with hands-on experience, mentorship, and a global platform
              </p>
            </div>
            <p className="text-base leading-5 text-neutral-800 lg:text-[1.1667rem] lg:leading-[1.6667rem] tracking-wide">
              Your Career Journey with Hands-on Experience, mentorship, and a global platform.Your Career Journey with Hands-on Experience, mentorship, and a global platform.Your Career Journey with Hands-on Experience, mentorship, and a global platform.Your Career Journey with Hands-on Experience, mentorship, and a global platform.
            </p>
          </div>
          <a
            href="#"
            className="group relative mt-8 inline-flex w-fit items-center justify-center overflow-hidden rounded-full border border-transparent px-4.5 py-4 text-base font-medium leading-none lg:mt-[2rem] lg:px-[2rem] lg:py-[1.4rem] lg:text-[1.1667rem]"
            style={{
              background:
                "linear-gradient(white) padding-box, var(--primary-gradient) border-box",
            }}
          >
            {/* Invisible spacer — preserves the button's intrinsic size */}
            <span className="invisible inline-flex items-center whitespace-nowrap">
              Apply for Internship
            </span>

            {/* Default: gradient text — slides down and out on hover */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-full"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Apply for Internship
              </span>
            </span>

            {/* Hover: gradient fill + white text — slides in from the top */}
            <span
              aria-hidden
              className="absolute inset-0 flex -translate-y-full items-center justify-center whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0"
              style={{ background: "var(--primary-gradient)" }}
            >
              Apply for Internship
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

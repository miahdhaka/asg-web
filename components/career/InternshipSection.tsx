import Image from "next/image";

export default function InternshipSection() {
  return (
    <section id="career-internship" className="bg-gray-50 py-12 lg:py-[5rem]">
      <div className="mx-auto flex w-full max-w-[98.5rem] flex-col items-center gap-8 px-4 sm:px-8 lg:flex-row lg:gap-[4rem] lg:px-[5rem]">
        {/* Photo */}
        <div className="relative aspect-[547/356] w-full shrink-0 overflow-hidden lg:h-[29.6667rem] lg:w-[45.5833rem] lg:aspect-auto">
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
        <div className="w-full lg:w-[37.3333rem]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="font-test-tiempos-fine text-2xl leading-8 text-neutral-800 sm:text-3xl lg:text-[3rem] lg:leading-[3.3333rem]">
                Join the Internship Program at
              </h2>
              <p className="text-base leading-7 text-neutral-800 lg:text-[1.5rem] lg:leading-[2.3333rem]">
                Start your career journey with hands-on experience, mentorship, and a global platform
              </p>
            </div>
            <p className="text-sm leading-5 text-neutral-800 lg:text-[1.1667rem] lg:leading-[1.6667rem]">
              Your Career Journey with Hands-on Experience, mentorship, and a global platform. Your Career
              Journey with Hands-on Experience, mentorship, and a global platform. Your Career Journey with
              Hands-on Experience, mentorship, and a global platform.
            </p>
          </div>
          <a
            href="#"
            data-label="Apply for Internship"
            className="primary-btn-flip-gradient mt-6 w-fit px-8 py-3 text-sm font-medium lg:mt-[2rem] lg:px-[2rem] lg:py-[1.4rem] lg:text-[1.1667rem]"
          >
            Apply for Internship
          </a>
        </div>
      </div>
    </section>
  );
}

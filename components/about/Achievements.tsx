import Image from "next/image";

const achievements = [
  {
    value: "15",
    label: "Dhaka international trade fair award",
    image: "/images/about-us/award-1.png",
  },
  {
    value: "15",    
    label: "Dhaka international trade fair award",
    image: "/images/about-us/award-2.png",
  },
  {
    value: "2",
    label: "National export trophy",
    image: "/images/about-us/award-3.png",
  },
  {
    value: "1",
    label: "President’s Award for industrial development",
    image: "/images/about-us/award-4.png",
  },
];

export default function Achievements() {
  return (
    <section id="about-achievements" className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-10 sm:py-12 lg:py-[5em]">
      <h2 className="text-3xl md:text-4xl lg:text-6xl text-neutral-800 font-test-tiempos-fine">
        Achievement
      </h2>

      {/* Two shared rows: every card opts into them via `grid-rows-subgrid`, so all
          photo areas line up and all captions line up — no heights needed. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[1fr_auto] gap-4 md:gap-x-5 md:gap-y-0 mt-8 md:mt-10">
        {achievements.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="group flex flex-col lg:grid lg:row-span-2 lg:grid-rows-subgrid"
          >
            {/* Award photo — absorbs the slack so every card ends up equal height */}
            <div className="flex flex-1 items-center justify-center bg-gray-100 p-6 lg:p-8">
              <Image
                src={item.image}
                alt={item.label}
                width={164}
                height={184}
                quality={90}
                className="w-auto h-auto max-w-[60%] max-h-full object-contain"
              />
            </div>

            {/* Count + label — label reserves 3 lines so all captions match in height */}
            <div className="card-gradient-target flex flex-col items-center justify-center gap-2 bg-gray-50 px-[1.5em] py-[2em]">
              <span className="font-test-tiempos-fine text-6xl font-medium text-neutral-800 lg:text-7xl">
                {item.value}
              </span>
              <span className="text-base sm:text-lg lg:text-xl text-center tracking-wide text-neutral-800 max-w-[70%] min-h-[4.5em] sm:mt-4">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";

const achievements = [
  {
    value: "15",
    label: "Dhaka international trade fair award",
    image: "/images/about-us/award-1.png",
  },
  {
    value: "7",
    label: "Commercially Important Person (CIP)",
    image: "/images/about-us/award-2.png",
  },
  {
    value: "2",
    label: "National export trophy",
    image: "/images/about-us/award-3.png",
  },
  {
    value: "1",
    label: "President's Award for industrial development",
    image: "/images/about-us/award-4.png",
  },
];

export default function Achievements() {
  return (
    <section id="about-achievements" className="w-full bg-white px-4 sm:px-6 lg:px-[5em] py-10 sm:py-12 lg:py-[5em]">
      <h2 className="text-xl lg:text-6xl text-neutral-800 font-test-tiempos-fine">
        Achievement
      </h2>

      {/* Mobile: horizontal scroll carousel */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 mt-4 -mx-4 px-4 lg:hidden no-scrollbar">
        {achievements.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="group flex flex-col snap-start shrink-0 w-[132px]"
          >
            <div className="flex flex-1 items-center justify-center bg-gray-100 p-3">
              <Image
                src={item.image}
                alt={item.label}
                width={80}
                height={90}
                quality={90}
                className="w-auto h-auto max-w-[80px] max-h-[90px] object-contain"
              />
            </div>
            <div className="card-gradient-target flex flex-col items-center justify-center gap-2 bg-gray-50 px-2 py-3">
              <span className="font-test-tiempos-fine text-2xl font-medium text-neutral-800 leading-none">
                {item.value}
              </span>
              <span className="text-[11px] text-center tracking-wide text-neutral-800">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: grid layout */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4 mt-10">
        {achievements.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="card-gradient-hover group flex flex-col"
          >
            <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
              <Image
                src={item.image}
                alt={item.label}
                width={164}
                height={184}
                quality={90}
                className="w-auto h-auto max-w-[60%] max-h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 px-6 py-8">
              <span className="font-test-tiempos-fine text-7xl font-medium text-neutral-800">
                {item.value}
              </span>
              <span className="text-xl text-center tracking-wide text-neutral-800 max-w-[70%] min-h-[4.5em]">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

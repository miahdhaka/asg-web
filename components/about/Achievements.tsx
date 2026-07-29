import Image from "next/image";

const achievements = [
  {
    value: "15",
    label: "Dhaka international trade fair award",
    image: "/images/about/award-trade-fair-4dd166.png",
  },
  {
    value: "15",
    label: "Dhaka international trade fair award",
    image: "/images/about/award-trade-fair-4dd166.png",
  },
  {
    value: "2",
    label: "National export trophy",
    image: "/images/about/award-export-trophy-3778fb.png",
  },
  {
    value: "1",
    label: "President’s Award for industrial development",
    image: "/images/about/award-president-69d324.png",
  },
];

export default function Achievements() {
  return (
    <section id="about-achievements" className="w-full bg-white py-[3.75rem]">
      <div className="mx-auto max-w-[90rem] px-[3.75rem]">
        <h2 className="font-test-tiempos-fine text-[3rem] leading-[3rem] text-neutral-800">
          Achievement
        </h2>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {achievements.map((item, index) => (
            <div key={`${item.label}-${index}`} className="group flex flex-col">
              {/* Award photo */}
              <div className="relative flex h-[14.25rem] items-center justify-center bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={164}
                  height={184}
                  quality={90}
                  className="h-[11.5rem] w-auto object-contain"
                />
              </div>

              {/* Count + label — gradient wash on hover */}
              <div className="card-gradient-target flex h-[9.75rem] flex-col items-center justify-center gap-2 bg-gray-50 px-4 py-6">
                <span className="font-test-tiempos-fine text-[3.75rem] font-medium leading-[4.375rem] text-neutral-800">
                  {item.value}
                </span>
                <span className="max-w-[11.5rem] text-center text-base leading-6 text-neutral-800">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

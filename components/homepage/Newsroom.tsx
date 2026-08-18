import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  date: string;
  category: string;
  title: string;
  image: string;
}

const news: NewsItem[] = [
  {
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_1.webp",
  },
  {
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_2.webp",
  },
  {
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_3.webp",
  },
];

export default function Newsroom() {
  return (
    <section
      id="newsroom"
      className="relative flex w-full flex-col overflow-hidden bg-white py-6 lg:py-8 h-[calc(100dvh-var(--header-height))] lg:h-[calc(100vh-var(--header-height))]"
    >
      {/* Header — eyebrow + title left, button right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-4 lg:px-20 mb-6 lg:mb-10 gap-4">
        <div className="mt-2">
          {/* Eyebrow — drops in together with the title below */}
          <div id="newsroom-eyebrow" className="flex items-center gap-3">
            <span className="font-neue-montreal text-sm lg:text-base font-medium tracking-widest text-neutral-800 uppercase">
              Newsroom
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          {/* Title — drops in from above via the Hero's fade-chain reveal */}
          <h2
            id="newsroom-title"
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[4rem] leading-[1] font-normal text-neutral-800"
          >
            Latest from ASG <br />newsroom
          </h2>
        </div>

        <Link
          href="/newsroom"
          data-label="More news"
          className="primary-btn-flip-gradient text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-10 py-3 sm:py-3.5 lg:py-5"
        >
          More news
        </Link>
      </div>

      {/* News cards — below lg the three cards would stack ~1300 px tall and
          spill far past the screen, so the section could never settle as one
          step. They become a horizontal snap strip instead: all content stays
          reachable while the section keeps its single-screen height. Desktop
          keeps the three-column grid. */}
      <div className="flex min-h-0 flex-1 items-start px-4 lg:px-20">
        <div className="no-scrollbar flex h-full w-full snap-x snap-mandatory gap-5 overflow-x-auto lg:grid lg:h-auto lg:grid-cols-3 lg:overflow-visible lg:gap-5">
          {news.map((item, index) => (
            <Link
              key={index}
              href="/newsroom"
              className="group flex w-[78%] shrink-0 snap-start flex-col gap-2 sm:w-[52%] lg:w-auto lg:shrink lg:gap-3"
            >
              {/* Image */}
              <div className="relative aspect-[431/329] w-full overflow-hidden bg-[#D9D9D9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  draggable={false}
                  className="pointer-events-none object-cover"
                  quality={80}
                />
                {/* Hover overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 overlay-image-hover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                />
              </div>

              {/* Meta — date / category */}
              <div className="flex items-center gap-2 mt-1">
                <span className="font-neue-montreal text-sm sm:text-base lg:text-xl text-neutral-600">
                  {item.date}
                </span>
                <span
                  aria-hidden
                  className="h-4 sm:h-5 w-px rotate-[30deg] bg-neutral-600"
                />
                <span className="font-neue-montreal text-sm sm:text-base lg:text-xl text-neutral-600">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="max-w-full lg:max-w-[21.5625rem] font-serif text-xl sm:text-2xl lg:text-3xl leading-7 sm:leading-8 lg:leading-10 text-neutral-800">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

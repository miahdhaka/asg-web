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
      className="relative flex w-full flex-col overflow-hidden bg-white py-8"
      style={{ height: "calc(100vh - var(--header-height))" }}
    >
      {/* Header — eyebrow + title left, button right */}
      <div className="flex items-end justify-between px-20 mb-10">
        <div className="mt-2">
          {/* Eyebrow — drops in together with the title below */}
          <div id="newsroom-eyebrow" className="flex items-center gap-3">
            <span className="font-neue-montreal text-base font-medium tracking-widest text-neutral-800 uppercase">
              Newsroom
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          {/* Title — drops in from above via the Hero's fade-chain reveal */}
          <h2
            id="newsroom-title"
            className="mt-3 font-serif text-[4rem] leading-[1] font-normal text-neutral-800"
          >
            Latest from ASG <br />newsroom
          </h2>
        </div>

        <Link
          href="/newsroom"
          data-label="More news"
          className="primary-btn-flip-gradient text-lg px-10 py-5"
        >
          More news
        </Link>
      </div>

      {/* News cards */}
      <div className="flex min-h-0 flex-1 items-start px-20">
        <div className="grid w-full grid-cols-3 gap-5">
          {news.map((item, index) => (
            <Link key={index} href="/newsroom" className="group flex flex-col gap-3">
              {/* Image */}
              <div className="relative aspect-[431/329] w-full overflow-hidden bg-[#D9D9D9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  draggable={false}
                  className="pointer-events-none object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  quality={80}
                />
              </div>

              {/* Meta — date / category */}
              <div className="flex items-center gap-2 mt-1">
                <span className="font-neue-montreal text-xl text-neutral-600">
                  {item.date}
                </span>
                <span
                  aria-hidden
                  className="h-5 w-px rotate-[30deg] bg-neutral-600"
                />
                <span className="font-neue-montreal text-xl text-neutral-600">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="max-w-[21.5625rem] font-serif text-3xl leading-10 text-neutral-800">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

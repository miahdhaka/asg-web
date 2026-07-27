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
    image: "/images/newsroom/news-1.png",
  },
  {
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-2.png",
  },
  {
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-3.png",
  },
];

export default function Newsroom() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden bg-white"
      style={{ height: "calc(100vh - var(--header-height, 4.55rem))" }}
    >
      {/* Header row — eyebrow + title left, button right */}
      <div className="flex items-end justify-between pt-14 px-20 pb-6">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-neue-montreal text-base font-medium tracking-widest text-neutral-800 uppercase">
              Newsroom
            </span>
            <span aria-hidden className="h-1.5 w-1.5 bg-neutral-800" />
          </div>

          <h2 className="mt-3 font-serif text-[64px] leading-[1] font-normal text-neutral-800">
            Latest from ASG newsroom
          </h2>
        </div>

        <Link
          href="/newsroom"
          data-label="More news"
          className="primary-btn-flip-gradient text-sm px-6 py-3"
        >
          More news
        </Link>
      </div>

      {/* News cards */}
      <div className="flex min-h-0 flex-1 items-start px-20">
        <div className="grid w-full grid-cols-3 gap-4">
          {news.map((item, index) => (
            <article key={index} className="group flex flex-col gap-3">
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
              <div className="flex items-center gap-2">
                <span className="font-neue-montreal text-sm text-neutral-600">
                  {item.date}
                </span>
                <span
                  aria-hidden
                  className="h-3 w-px rotate-[30deg] bg-neutral-600"
                />
                <span className="font-neue-montreal text-sm text-neutral-600">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="max-w-[345px] font-serif text-2xl leading-8 text-neutral-800">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { faqCategories } from "./faqData";

export default function FaqCategories() {
  return (
    <section
      id="faq-categories"
      className="bg-white px-4 py-10 sm:px-8 lg:px-20 lg:py-20"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[1.3333rem]">
        {faqCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/faqs/${category.slug}`}
            className="group relative flex h-[21.5rem] flex-col justify-between overflow-hidden bg-gray-50 p-4 lg:h-[28.6667rem] lg:p-[1.3333rem]"
          >
            {/* Hover state layer — soft brand-gradient wash */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(150deg,rgba(139,195,74,0.2)_0%,rgba(26,161,121,0.2)_81%)] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />

            {/* Top-right arrow — scales up smoothly on hover */}
            <span aria-hidden className="absolute right-6 top-6 z-10 lg:right-[2.1875rem] lg:top-8">
              <Image
                src="/images/faq/arrow-default.svg"
                alt=""
                width={30}
                height={30}
                className="block h-[1.875rem] w-[1.875rem] transition-opacity duration-500 ease-in-out group-hover:opacity-0 lg:h-10 lg:w-10"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[image:var(--primary-gradient)] opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-125"
                style={{
                  maskImage: `url(/images/faq/arrow-default.svg)`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(/images/faq/arrow-default.svg)`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            </span>

            <div className="relative z-10 h-[4.5rem] w-[7.8125rem]">
              <Image
                src={category.icon}
                alt={category.title}
                width={125}
                height={72}
                quality={100}
                className="h-[4.5rem] w-[7.8125rem] object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[image:var(--primary-gradient)] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                style={{
                  maskImage: `url(${category.icon})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${category.icon})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col gap-3 lg:gap-4">
              <h2 className="font-test-tiempos-fine text-2xl font-medium leading-8 text-neutral-800 lg:text-[2rem] lg:leading-[2.6667rem]">
                {category.title}
              </h2>
              <p className="text-base leading-6 text-neutral-800 lg:text-[1.3333rem] lg:leading-8">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

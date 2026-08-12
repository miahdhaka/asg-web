import Image from "next/image";
import { weImageRow } from "./weData";

export default function WeImageRow() {
  return (
    <section className="px-4 sm:px-8 lg:px-[5rem] pb-10 lg:pb-[3rem]">
      <div className="flex items-center gap-4 w-full max-w-[63rem] mx-auto">
        {weImageRow.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[182/245] w-full overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 12vw, 25vw"
              draggable={false}
              className="pointer-events-none object-cover"
              quality={90}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

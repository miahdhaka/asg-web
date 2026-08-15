import Image from "next/image";
import { csrImageRow } from "./csrData";

export default function CsrImageRow() {
  return (
    <section className="px-4 sm:px-8 lg:px-0 py-4 sm:py-10 lg:py-[3rem]">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-4 w-full max-w-[63rem] mx-auto">
        {csrImageRow.map((img) => (
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

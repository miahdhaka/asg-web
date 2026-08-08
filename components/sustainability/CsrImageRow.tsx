import Image from "next/image";
import { csrImageRow } from "./csrData";

export default function CsrImageRow() {
  return (
    <section className="px-4 sm:px-8 lg:px-[5rem] pb-10 lg:pb-[3rem]">
      <div className="flex items-center gap-4 w-full max-w-[63rem] mx-auto">
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

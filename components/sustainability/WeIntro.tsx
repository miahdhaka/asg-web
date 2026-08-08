import { weIntroStatement, weParagraphs } from "./weData";

export default function WeIntro() {
  return (
    <>
      {/* Intro statement */}
      <section className="px-4 sm:px-8 lg:px-[5rem] pt-10 lg:pt-[5rem]">
        <h2 className="max-w-[58.8rem] font-test-tiempos-fine text-xl lg:text-[2.5rem] leading-[1.5] lg:leading-[3rem] text-neutral-800">
          {weIntroStatement}
        </h2>
      </section>

      {/* Paragraphs */}
      <section className="flex flex-col gap-6 px-4 sm:px-8 lg:px-0 py-10 lg:py-[3rem]">
        <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-[63rem] mx-auto">
          {weParagraphs.map((text) => (
            <p
              key={text.slice(0, 40)}
              className="text-justify text-[1.11rem] leading-[1.7rem] text-neutral-800"
            >
              {text}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

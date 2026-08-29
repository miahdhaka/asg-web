import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center px-4 py-12 sm:px-8 lg:px-[5rem]">
      <div className="flex w-full max-w-[72rem] flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-0">
        {/* Left — oversized 404 */}
        <div className="flex flex-1 flex-col items-center justify-center lg:items-start">
          <span
            className="font-test-tiempos-fine text-[7rem] font-medium leading-none sm:text-[10rem] lg:text-[18rem]"
            style={{
              background: "var(--primary-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
        </div>

        {/* Gradient divider — horizontal on mobile, vertical on desktop */}
        <div
          className="h-px w-24 shrink-0 sm:w-32 lg:h-auto lg:w-px lg:self-stretch"
          style={{ background: "var(--primary-gradient)" }}
        />

        {/* Right — content */}
        <div className="flex flex-1 flex-col justify-center lg:pl-12">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Page not found
          </span>
          <h2 className="font-test-tiempos-fine mt-4 text-2xl leading-snug text-neutral-800 sm:text-3xl lg:text-[2.5rem]">
            The page you&apos;re looking
            <br className="hidden sm:block" /> for doesn&apos;t exist.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base lg:text-[1.125rem]">
            It might have been moved, renamed, or never existed in the first
            place. Head back to the homepage to find what you need.
          </p>
          <Link
            href="/"
            data-label="Back to Home"
            className="primary-btn-flip-gradient mt-8 w-fit px-8 py-3 text-sm font-medium lg:mt-10 lg:px-[2rem] lg:py-[1.4rem] lg:text-[1.1667rem]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

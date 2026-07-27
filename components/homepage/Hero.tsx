import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Background image - Uncomment this when using image, and comment out the video below  */}
      {/* <Image
        src="/images/hero/hero-bg-img.png"
        alt="Hero background"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      /> */}

      {/* Hero Background video - Comment this when using image */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero/hero-bg-vid.webm" type="video/webm" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <Image
          src="/logo/asg-icon.png"
          alt="ASG Logo"
          width={110}
          height={90}
          quality={100}
          className="mb-6 w-[130px] h-[110px] object-contain"
        />

        <h1 className="font-test-tiempos-fine uppercase text-6xl font-medium mb-4">
          Amanat Shah Group
        </h1>

        <p className="text-white font-neue-montreal font-light word-space-4 uppercase tracking-wider max-w-4xl">
          Textile | RMG | Chemical | Trading | IT | E-Commerce | Real Estate | Finance | Agriculture
        </p>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-15 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 text-white">
        <Image
          src="/icon/mouse-scroll-wheel.gif"
          alt="Scroll down"
          width={28}
          height={38}
          quality={100}
          className="w-[28px] h-[38px] object-contain"
        />
        <span className="font-neue-montreal font-light uppercase tracking-widest">
          Scroll Down
        </span>
      </div>
    </section>
  );
}

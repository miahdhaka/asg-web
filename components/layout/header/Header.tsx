import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import Search from "./Search";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-3 items-center px-6">
        {/* Navigation - left */}
        <div className="h-full flex items-center py-5">
          <Navigation />
        </div>

        {/* Logo - center */}
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/ASG-logo.png"
              alt="Amanat Shah Group"
              width={90}
              height={50}
              priority
              className="w-26 h-16 object-contain"
            />
          </Link>
        </div>

        {/* Search - right */}
        <div className="flex items-center justify-end py-5">
          <Search />
        </div>
      </div>
    </header>
  );
}

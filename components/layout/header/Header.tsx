import Link from "next/link";
import Navigation from "./Navigation";
import Search from "./Search";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-3 items-center h-13 px-6">
        {/* Navigation - left */}
        <div className="flex items-center">
          <Navigation />
        </div>

        {/* Logo - center */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            ASG
          </Link>
        </div>

        {/* Search - right */}
        <div className="flex items-center justify-end">
          <Search />
        </div>
      </div>
    </header>
  );
}

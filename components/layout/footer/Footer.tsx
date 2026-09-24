import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "About",
    links: [
      { label: "About US", href: "/about-us" },
      { label: "Brands", href: "#" },
      { label: "Sustainability", href: "/sustainability/environmental-social-governance" },
      { label: "FAQ’s", href: "/faqs" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
  {
    title: "Sistern Concern",
    links: [
      { label: "M/s Helal & Brothers Ltd.", href: "/concerns/helal-brothers" },
      { label: "Amanat Shah Fabrics Ltd.", href: "/concerns/amanat-shah-fabrics" },
      {
        label: "Hazrat Amanat Shah Spinnings Mills Ltd.",
        href: "/concerns/hazrat-amanat-shah-spinning-mills",
      },
      {
        label: "Amanat Shah Weaving Processing Ltd.",
        href: "/concerns/amanat-shah-weaving-processing",
      },
      { label: "Miah & Miah Enterprise", href: "/concerns/miah" },
    ],
  },
  {
    title: "Sustainability",
    links: [
      {
        label: "ESG Resource",
        href: "/sustainability/environmental-social-governance",
      },
      {
        label: "Corporate Social Responsibility",
        href: "/sustainability/corporate-social-responsibility",
      },
      {
        label: "Women Empowerment",
        href: "/sustainability/women-empowerment",
      },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact US", href: "/contact-us" },
      { label: "ASG Career", href: "/careers" },
    ],
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: "/icons/social-icon/linkedin.png",
  },
  {
    label: "Facebook",
    href: "#",
    icon: "/icons/social-icon/facebook.png",
    featured: true,
  },
  {
    label: "Instagram",
    href: "#",
    icon: "/icons/social-icon/instagram.png",
  },
];

export default function Footer() {
  return (
    <footer className="w-full shrink-0 border-t border-white/70 bg-[#181818] font-neue-montreal text-white">
      <div className="grid min-h-[10.25rem] gap-10 border-b border-white/10 px-6 py-9 md:px-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-20">
        <h2 className="max-w-[30rem] font-archivo-black text-2xl leading-[1.08] uppercase sm:text-[2rem]">
          Manufacturing trust,
          <br />
          since generations.
        </h2>

        <Image
          src="/logo/ASG-logo-mixed.png"
          alt="Amanat Shah Group"
          width={168}
          height={66}
          className="h-auto w-[10.5rem] object-contain"
          quality={100}
        />

        <div className="flex flex-col gap-3 lg:justify-self-end lg:pr-1">
          <p className="text-base text-white/90">Follow us</p>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="relative flex size-11 items-center justify-center rounded-full bg-[#242424] transition-transform duration-300 hover:scale-110 before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={22}
                  height={22}
                  className="relative z-10 size-[1.375rem] object-contain"
                  quality={100}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid min-h-[27rem] lg:grid-cols-[27.25%_1fr]">
        <div className="border-b border-white/10 px-6 py-12 md:px-12 lg:border-r lg:border-b-0 lg:px-20 lg:py-[4.25rem]">
          <div className="flex items-center gap-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded bg-[#252525]">
              <MapPin className="size-5" strokeWidth={1.8} />
            </span>
            <h3 className="text-lg font-medium uppercase">Head Office</h3>
          </div>

          <address className="mt-3 max-w-[22rem] text-base leading-[1.6] text-white/80 not-italic sm:text-lg">
            House-232, Lane-03, DOHS, Baridhara,
            <br />
            Dhaka-1206, Bangladesh.
          </address>

          <div className="mt-4 space-y-1 text-base leading-[1.55] text-white/80 sm:text-lg">
            <p>+(88)09643226699 , +(88)029578403</p>
            <a className="transition-colors hover:text-white" href="mailto:info@asg-bd.com">
              info@asg-bd.com
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 md:px-12 lg:grid-cols-[0.8fr_1.2fr_1.05fr_0.75fr] lg:px-20 lg:py-[4.25rem]">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-medium uppercase sm:text-lg">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm leading-6 text-white/55 transition-colors duration-300 hover:text-white sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-[3.25rem] flex-col gap-4 rounded-t-[1.5rem] bg-gradient-to-r from-[#343434] via-[#292929] to-[#1c1c1c] px-6 py-4 text-sm tracking-wider md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-20">
        <p>© 2026 ASG</p>
        <nav aria-label="Footer legal navigation" className="flex flex-wrap items-center gap-x-10 gap-y-2 text-xs uppercase">
          <Link className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100" href="/terms-of-use">
            Terms of Use
          </Link>
          <Link className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100" href="#">
            Cookie Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

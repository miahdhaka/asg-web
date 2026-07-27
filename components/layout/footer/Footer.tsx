import Link from "next/link";

interface LinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface OfficeCard {
  title: string;
  address: string;
}

const linkColumns: LinkColumn[] = [
  {
    title: "About",
    links: [
      { label: "About US", href: "#" },
      { label: "Brands", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "FAQ's", href: "#" },
      { label: "Newsroom", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact US", href: "#" },
      { label: "ASG Career", href: "#" },
    ],
  },
  {
    title: "Sistern Concern",
    links: [
      { label: "M/s Helal & Brothers Ltd.", href: "#" },
      { label: "Amanat Shah Fabrics Ltd.", href: "#" },
      { label: "Hazrat Amanat Shah Spinnings Mills Ltd.", href: "#" },
      { label: "Hazrat Amanat Shah Securities Ltd.", href: "#" },
      { label: "Amanat Shah Weaving Processing Ltd.", href: "#" },
      { label: "Miah & Miah Enterprise", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const offices: OfficeCard[] = [
  {
    title: "Head Office",
    address: "House-232, Lane-03, DOHS, Baridhara, Dhaka-1206, Bangladesh",
  },
  {
    title: "Corporate Head Office",
    address: "City Center (level-24), 90/1 Motijheel C/A, Dhaka-1000, Bangladesh.",
  },
  {
    title: "Head Office : Distribution",
    address: "Amanat Shah Tower Shekherchar, Baburhat Narsingdi, Bangladesh",
  },
  {
    title: "Showroom",
    address: "Amanullah Complex 87, Islampur, Dhaka-1100 Bangladesh",
  },
  {
    title: "Showroom",
    address: "Nawab Ali Market 1st floor Darsapur Bazar Shajadpur, Shirazganj Bangladesh",
  },
  {
    title: "Factory",
    address: "Bhatpara, Madhabdi Road 1603, Pachdona, Narsindi, Bangladesh",
  },
  {
    title: "Baikanthapur Tea Estate",
    address: "Noapara Bazar Modhabpur-3330, Hobiganj Bangladesh",
  },
];

const socialIconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg {...socialIconProps}>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.09h4.56V23H.22V8.09zM8.34 8.09h4.37v2.04h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.55v-7.21c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H8.34V8.09z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg {...socialIconProps}>
        <path d="M13.5 21.9v-8.4h2.82l.42-3.28H13.5V8.13c0-.95.26-1.6 1.62-1.6h1.74V3.6a23.4 23.4 0 0 0-2.53-.13c-2.5 0-4.22 1.53-4.22 4.34v2.42H7.28v3.28h2.83v8.4h3.39z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg {...socialIconProps} fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  // shrink-0 — body is h-screen flex-col, and overflow-hidden would otherwise
  // let the flex algorithm collapse this footer to 0 height.
  return (
    <footer className="relative w-full shrink-0 overflow-hidden bg-primary-black text-white">
      {/* Soft green glow bleeding in from the bottom-right, as in the design */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_100%_100%,rgba(139,195,74,0.28),transparent_65%)]"
      />

      <div className="relative z-10 px-20">
        {/* Link columns */}
        <div className="grid grid-cols-[1fr_1fr_1.4fr_1fr] gap-8 pt-16 pb-12">
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-neue-montreal text-sm font-medium tracking-widest text-white uppercase">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-neue-montreal text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized gradient wordmark */}
        <p
          aria-hidden
          className="pointer-events-none pb-4 text-center font-serif text-[clamp(48px,6.5vw,110px)] leading-none tracking-[0.12em] whitespace-nowrap uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent"
        >
          Amanat Shah Group
        </p>

        {/* Office addresses */}
        <div className="grid grid-cols-7 gap-8 border-t border-white/10 py-12">
          {offices.map((office) => (
            <div key={`${office.title}-${office.address}`}>
              <h3 className="font-neue-montreal text-sm font-medium tracking-wider text-white uppercase">
                {office.title}
              </h3>
              <p className="mt-4 font-neue-montreal text-sm leading-relaxed text-neutral-400">
                {office.address}
              </p>
            </div>
          ))}
        </div>

        {/* Copyright + socials */}
        <div className="flex items-center justify-between border-t border-white/10 py-6">
          <p className="font-neue-montreal text-sm text-neutral-400">
            Copyright &copy; 2026 ASG Group. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-transparent hover:bg-[image:var(--primary-gradient)]"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

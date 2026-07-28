import Image from "next/image";
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

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: "/icon/social-icon/linkedin.png",
  },
  {
    label: "Facebook",
    href: "#",
    icon: "/icon/social-icon/facebook.png",
  },
  {
    label: "Instagram",
    href: "#",
    icon: "/icon/social-icon/instagram.png",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full shrink-0 overflow-hidden bg-primary-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_100%_100%,rgba(139,195,74,0.28),transparent_65%)]"
      />

      <div className="relative z-10">
        {/* Link columns */}
        <div className="grid grid-cols-[1fr_1fr_1.4fr_1fr] gap-8 px-20 pt-11 pb-10">
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-neue-montreal text-lg tracking-wider text-white uppercase">
                {column.title}
              </h3>
              <ul className="mt-2 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-neue-montreal text-[15px] tracking-wider text-neutral-400 transition-colors duration-300 hover:text-white hover:underline"
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
          className="pointer-events-none my-0 text-center font-serif font-medium text-[clamp(32px,4.5vw,72px)] leading-[0.8] tracking-[1.4rem] whitespace-nowrap uppercase bg-[image:var(--primary-gradient)] bg-clip-text text-transparent opacity-50 px-20"
        >
          Amanat Shah Group
        </p>

        {/* Office addresses */}
        <div className="grid grid-cols-7 gap-8 bg-[var(--neutral-900)] border-t border-white/10 px-20 py-10">
          {offices.map((office) => (
            <div key={`${office.title}-${office.address}`}>
              <h3 className="font-neue-montreal text-lg font-medium tracking-wider text-white uppercase">
                {office.title}
              </h3>
              <p className="font-neue-montreal leading-tight text-neutral-400 mt-2">
                {office.address}
              </p>
            </div>
          ))}
        </div>

        {/* Copyright + socials */}
        <div className="relative flex items-center justify-between px-20 py-6">
          <Image
            src="/images/footer-copywrite-bg.png"
            alt=""
            fill
            sizes="100vw"
            draggable={false}
            className="pointer-events-none object-cover opacity-50"
            quality={80}
          />
          <p className="relative z-10 font-neue-montreal text-white">
            Copyright &copy; 2026 ASG Group. All Rights Reserved.
          </p>
          
          <div className="relative z-10 flex items-center gap-4">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="relative flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-500 ease-in-out hover:border-transparent before:absolute before:inset-0 before:rounded-full before:bg-[image:var(--primary-gradient)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out hover:before:opacity-100"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={20}
                  height={20}
                  quality={100}
                  draggable={false}
                  className="object-contain brightness-0 invert"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

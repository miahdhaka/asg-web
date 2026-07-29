import type { NavCategory } from "./types";

export const navCategories: NavCategory[] = [
  {
    label: "Group",
    megaMenu: true,
    megaItems: [
      { label: "About Us", href: "/about-us", image: "/images/navbar/group-b&w-1.webp", hoverImage: "/images/navbar/group-clr-1.webp" },
      { label: "Management", href: "/management", image: "/images/navbar/group-b&w-2.webp", hoverImage: "/images/navbar/group-clr-2.webp" },
      { label: "History", href: "/our-history", image: "/images/navbar/group-b&w-3.webp", hoverImage: "/images/navbar/group-clr-3.webp" },
    ],
  },
  {
    label: "Concerns",
    megaMenu: true,
    megaVariant: "logo",
    megaItems: [
      { label: "Helal&Brothers Ltd.", href: "", image: "/images/navbar/concerns-b&w-1.webp", hoverImage: "/images/navbar/concerns-clr-1.webp" },
      { label: "Miah & Miah Enterprise ", href: "/miahbd.com", image: "/images/navbar/concerns-b&w-2.webp", hoverImage: "/images/navbar/concerns-clr-2.webp" },
      { label: "Amanat Shah Weaving Processing Ltd. ", href: "", image: "/images/navbar/concerns-b&w-3.webp", hoverImage: "/images/navbar/concerns-clr-3.webp" },
      { label: "Amanat Shah Fabrics Ltd.", href: "", image: "/images/navbar/concerns-b&w-4.webp", hoverImage: "/images/navbar/concerns-clr-4.webp" },
      { label: "Hazrat Amanat Shah Spinning Mils Ltd.", href: "", image: "/images/navbar/concerns-b&w-5.webp", hoverImage: "/images/navbar/concerns-clr-5.webp" },
      { label: "Trust Knitwear Industries Ltd.", href: "", image: "/images/navbar/concerns-b&w-6.webp", hoverImage: "/images/navbar/concerns-clr-6.webp" },
      { label: "Hazrat Amanat Shah Securities Ltd.", href: "", image: "/images/navbar/concerns-b&w-7.webp", hoverImage: "/images/navbar/concerns-clr-7.webp" },
      { label: "Farm2Firm", href: "", image: "/images/navbar/concerns-b&w-8.webp", hoverImage: "/images/navbar/concerns-clr-8.webp" },
      { label: "Amanat shah text solution", href: "", image: "/images/navbar/concerns-b&w-9.webp", hoverImage: "/images/navbar/concerns-clr-9.webp" },
    ],
  },
  {
    label: "Sustainability",
    megaMenu: true,
    megaItems: [
      { label: "Environmental and Social Government Resources", href: "", image: "/images/navbar/sustainability-b&w-1.webp", hoverImage: "/images/navbar/sustainability-clr-1.webp" },
      { label: "Corporate Social Responsibility", href: "", image: "/images/navbar/sustainability-b&w-2.webp", hoverImage: "/images/navbar/sustainability-clr-2.webp" },
      { label: "Women Empowerment", href: "", image: "/images/navbar/sustainability-b&w-3.webp", hoverImage: "/images/navbar/sustainability-clr-3.webp" },
    ],
  },
  {
    label: "Media & Press",
    megaMenu: true,
    megaItems: [
      { label: "News", href: "", image: "/images/navbar/media&press-b&w-1.webp", hoverImage: "/images/navbar/media&press-clr-1.webp" },
      { label: "Media Gallery", href: "", image: "/images/navbar/media&press-b&w-2.webp", hoverImage: "/images/navbar/media&press-clr-2.webp" },
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
];
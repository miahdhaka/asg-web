import type { NavCategory } from "./types";

export const navCategories: NavCategory[] = [
  {
    label: "Group",
    megaMenu: true,
    megaItems: [
      { label: "About Us", href: "/about-us", image: "/images/navbar/group-b&w-1.png", hoverImage: "/images/navbar/group-clr-1.png" },
      { label: "Management", href: "/management", image: "/images/navbar/group-b&w-2.png", hoverImage: "/images/navbar/group-clr-2.png" },
      { label: "History", href: "/our-history", image: "/images/navbar/group-b&w-3.png", hoverImage: "/images/navbar/group-clr-3.png" },
    ],
  },
  {
    label: "Concerns",
    megaMenu: true,
    megaVariant: "logo",
    megaItems: [
      { label: "Helal&Brothers Ltd.", href: "", image: "/images/navbar/concerns-b&w-1.png", hoverImage: "/images/navbar/concerns-clr-1.png" },
      { label: "Miah & Miah Enterprise ", href: "/miahbd.com", image: "/images/navbar/concerns-b&w-2.png", hoverImage: "/images/navbar/concerns-clr-2.png" },
      { label: "Amanat Shah Weaving Processing Ltd. ", href: "", image: "/images/navbar/concerns-b&w-3.png", hoverImage: "/images/navbar/concerns-clr-3.png" },
      { label: "Amanat Shah Fabrics Ltd.", href: "", image: "/images/navbar/concerns-b&w-4.png", hoverImage: "/images/navbar/concerns-clr-4.png" },
      { label: "Hazrat Amanat Shah Spinning Mils Ltd.", href: "", image: "/images/navbar/concerns-b&w-5.png", hoverImage: "/images/navbar/concerns-clr-5.png" },
      { label: "Trust Knitwear Industries Ltd.", href: "", image: "/images/navbar/concerns-b&w-6.png", hoverImage: "/images/navbar/concerns-clr-6.png" },
      { label: "Hazrat Amanat Shah Securities Ltd.", href: "", image: "/images/navbar/concerns-b&w-7.png", hoverImage: "/images/navbar/concerns-clr-7.png" },
      { label: "Farm2Firm", href: "", image: "/images/navbar/concerns-b&w-8.png", hoverImage: "/images/navbar/concerns-clr-8.png" },
      { label: "Amanat shah text solution", href: "", image: "/images/navbar/concerns-b&w-9.png", hoverImage: "/images/navbar/concerns-clr-9.png" },
    ],
  },
  {
    label: "Sustainability",
    megaMenu: true,
    megaItems: [
      { label: "Environmental and Social Government Resources", href: "", image: "/images/navbar/sustainability-b&w-1.png", hoverImage: "/images/navbar/sustainability-clr-1.png" },
      { label: "Corporate Social Responsibility", href: "", image: "/images/navbar/sustainability-b&w-2.png", hoverImage: "/images/navbar/sustainability-clr-2.png" },
      { label: "Women Empowerment", href: "", image: "/images/navbar/sustainability-b&w-3.png", hoverImage: "/images/navbar/sustainability-clr-3.png" },
    ],
  },
  {
    label: "Media & Press",
    megaMenu: true,
    megaItems: [
      { label: "News", href: "", image: "/images/navbar/media&press-b&w-1.png", hoverImage: "/images/navbar/media&press-clr-1.png" },
      { label: "Media Gallery", href: "", image: "/images/navbar/media&press-b&w-2.png", hoverImage: "/images/navbar/media&press-clr-2.png" },
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
];
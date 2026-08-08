import type { NavCategory } from "./types";

export const navCategories: NavCategory[] = [
  {
    label: "Group",
    megaMenu: true,
    megaItems: [
      { label: "About Us", href: "/about-us", image: "/images/navbar/group-clr-1.png", hoverImage: "/images/navbar/group-clr-1.png" },
      { label: "Management", href: "/management", image: "/images/navbar/group-clr-2.png", hoverImage: "/images/navbar/group-clr-2.png" },
      { label: "History", href: "/our-history", image: "/images/navbar/group-clr-3.png", hoverImage: "/images/navbar/group-clr-3.png" },
    ],
  },
  {
    label: "Concerns",
    megaMenu: true,
    megaVariant: "logo",
    megaItems: [
      { label: "Helal&Brothers Ltd.", href: "/concerns/helal-brothers", image: "/logo/sister-concern/helal-&-brothers-clr.png", hoverImage: "/logo/sister-concern/helal-&-brothers-clr.png" },
      { label: "Miah & Miah Enterprise ", href: "/concerns/miah", image: "/logo/sister-concern/miah-clr.png", hoverImage: "/logo/sister-concern/miah-clr.png" },
      { label: "Amanat Shah Weaving Processing Ltd. ", href: "/concerns/amanat-shah-weaving-processing", image: "/logo/sister-concern/weaving-clr.png", hoverImage: "/logo/sister-concern/weaving-clr.png" },
      { label: "Amanat Shah Fabrics Ltd.", href: "/concerns/amanat-shah-fabrics", image: "/logo/sister-concern/fabrics-clr.png", hoverImage: "/logo/sister-concern/fabrics-clr.png" },
      { label: "Hazrat Amanat Shah Spinning Mils Ltd.", href: "/concerns/hazrat-amanat-shah-spinning-mills", image: "/logo/sister-concern/spinning-mills-clr.png", hoverImage: "/logo/sister-concern/spinning-mills-clr.png" },
      { label: "Trust Knitwear Industries Ltd.", href: "/concerns/trust-knitwear-industries", image: "/logo/sister-concern/trust-knitwear-clr.png", hoverImage: "/logo/sister-concern/trust-knitwear-clr.png" },
      { label: "Hazrat Amanat Shah Securities Ltd.", href: "/concerns/hazrat-amanat-shah-securities", image: "/logo/sister-concern/securities-clr.png", hoverImage: "/logo/sister-concern/securities-clr.png" },
      { label: "Farm2Firm", href: "/concerns/farm2firm", image: "/logo/sister-concern/farm2farm-clr.png", hoverImage: "/logo/sister-concern/farm2farm-clr.png" },
      { label: "Amanat shah text solution", href: "", image: "/logo/sister-concern/tex-solution-clr.png", hoverImage: "/logo/sister-concern/tex-solution-clr.png" },
    ],
  },
  {
    label: "Sustainability",
    megaMenu: true,
    megaItems: [
      { label: "Environmental and Social Government Resources", href: "/sustainability/environmental-social-governance", image: "/images/navbar/sustainability-clr-1.png", hoverImage: "/images/navbar/sustainability-clr-1.png" },
      { label: "Corporate Social Responsibility", href: "", image: "/images/navbar/sustainability-clr-2.png", hoverImage: "/images/navbar/sustainability-clr-2.png" },
      { label: "Women Empowerment", href: "", image: "/images/navbar/sustainability-clr-3.png", hoverImage: "/images/navbar/sustainability-clr-3.png" },
    ],
  },
  {
    label: "Media & Press",
    megaMenu: true,
    megaItems: [
      { label: "News", href: "", image: "/images/navbar/media&press-clr-1.png", hoverImage: "/images/navbar/media&press-clr-1.png" },
      { label: "Media Gallery", href: "", image: "/images/navbar/media&press-clr-2.png", hoverImage: "/images/navbar/media&press-clr-2.png" },
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
];
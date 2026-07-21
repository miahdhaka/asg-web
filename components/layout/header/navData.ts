import type { NavCategory } from "./types";

export const navCategories: NavCategory[] = [
  {
    label: "Group",
    megaMenu: true,
    megaItems: [
      { label: "About Us", href: "/group/about", image: "/images/group-about.jpg" },
      { label: "Leadership", href: "/group/leadership", image: "/images/group-leadership.jpg" },
      { label: "Our Vision", href: "/group/vision", image: "/images/group-vision.jpg" },
    ],
  },
  {
    label: "Concerns",
    megaMenu: true,
    megaItems: [
      { label: "Real Estate", href: "/concerns/real-estate", image: "/images/concerns-realestate.jpg" },
      { label: "Healthcare", href: "/concerns/healthcare", image: "/images/concerns-healthcare.jpg" },
      { label: "Education", href: "/concerns/education", image: "/images/concerns-education.jpg" },
    ],
  },
  {
    label: "Sustainability",
    megaMenu: true,
    megaItems: [
      { label: "Green Initiatives", href: "/sustainability/green", image: "/images/sustain-green.jpg" },
      { label: "Community Impact", href: "/sustainability/community", image: "/images/sustain-community.jpg" },
      { label: "CSR Programs", href: "/sustainability/csr", image: "/images/sustain-csr.jpg" },
    ],
  },
  {
    label: "Media & Press",
    megaMenu: true,
    megaItems: [
      { label: "News", href: "/media/news", image: "/images/media-news.jpg" },
      { label: "Press Releases", href: "/media/press-releases", image: "/images/media-press.jpg" },
      { label: "Gallery", href: "/media/gallery", image: "/images/media-gallery.jpg" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

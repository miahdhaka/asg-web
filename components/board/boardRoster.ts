/**
 * Canonical board roster, in the order the Figma detail pages list it.
 * Every detail page shows the full roster minus the member being profiled,
 * so this is the single source of truth for all "Other Board Members"
 * carousels (Figma: Chairman / Managing Director / Director detail pages).
 */
export type CarouselMember = {
  name: string;
  role: string;
  image: string;
  /** Detail page for this member — the whole card becomes a link when set */
  href?: string;
};

export type BoardRosterMember = {
  /** Route segment under /board-of-directors — omitted when no page exists yet */
  slug?: string;
  name: string;
  /** Label used on the carousel cards */
  role: string;
  /** Portrait for the tall 429×582 detail-page cards */
  image: string;
};

export const boardRoster: BoardRosterMember[] = [
  {
    slug: "chairman",
    name: "Mohammad Helal Miah",
    role: "Chairman",
    image: "/images/board-of-directors/chairman.png",
  },
  {
    slug: "managing-director",
    name: "Rezaul Karim",
    role: "Director",
    image: "/images/board-of-directors/managing-director.png",
  },
  {
    slug: "rezawan-kabir-shihab",
    name: "Rezawan Kabir Shihab",
    role: "Director",
    image: "/images/board-of-directors/rezawan-kabir-shihab.png",
  },
  {
    slug: "md-jubayer-amin",
    name: "Md. Jubayer Amin",
    role: "Director",
    image: "/images/board-of-directors/md-jubayer-amin.png",
  },
  {
    slug: "akm-azad",
    name: "Akm Azad",
    role: "Entrepreneur",
    image: "/images/board-of-directors/akm-azad.png",
  },
  {
    slug: "mahamudul-hasan",
    name: "Mahamudul Hasan",
    role: "Entrepreneur",
    image: "/images/board-of-directors/mahamudul-hasan.png",
  },
  {
    slug: "mohammad-kamrul-islam",
    name: "Mohammad Kamrul Islam",
    role: "Entrepreneur",
    image: "/images/board-of-directors/mohammad-kamrul-islam.png",
  },
];

/**
 * Carousel roster minus the members named in `excludeSlugs`.
 * Detail pages exclude the member being profiled; the board landing page
 * excludes the chairman and MD, who already have their own message sections.
 */
export function otherMembersFor(...excludeSlugs: string[]): CarouselMember[] {
  return boardRoster
    .filter((member) => !member.slug || !excludeSlugs.includes(member.slug))
    .map(({ name, role, image, slug }) => ({
      name,
      role,
      image,
      href: slug ? `/board-of-directors/${slug}` : undefined,
    }));
}

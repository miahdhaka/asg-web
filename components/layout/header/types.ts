export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  image: string;
  /** Optional colored image shown on hover (crossfades over `image`) */
  hoverImage?: string;
}

export interface NavCategory {
  label: string;
  href?: string;
  children?: NavLink[];
  /** If true, renders a mega menu with image cards */
  megaMenu?: boolean;
  megaItems?: MegaMenuItem[];
  /** Visual style of the mega menu cards. "photo" (default) crops images; "logo" centers/contains them */
  megaVariant?: "photo" | "logo";
}

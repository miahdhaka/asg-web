export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  image: string;
}

export interface NavCategory {
  label: string;
  href?: string;
  children?: NavLink[];
  /** If true, renders a mega menu with image cards */
  megaMenu?: boolean;
  megaItems?: MegaMenuItem[];
}

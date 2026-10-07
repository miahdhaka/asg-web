/* ------------------------------------------------------------------ */
/*  Blog post data                                                     */
/*                                                                     */
/*  Each entry drives one /newsroom/blog-page/[slug] page. The layout  */
/*  is fixed — only the copy and image paths below change per blog.    */
/*  Add a new object to `blogPosts` to publish another post.           */
/* ------------------------------------------------------------------ */

export interface BlogEventCard {
  image: string;
  caption: string;
}

export interface BlogPost {
  slug: string;

  /* ── Header ── */
  title: string;
  label: string;
  category: string;
  publishedAt: string;
  /** Bold standfirst paragraph shown between the hero and the body. */
  lead: string;

  /* ── Single wide hero image under the title ── */
  heroImages: string[];

  /* ── Main article paragraphs ── */
  body: string[];

  /* ── "A look inside…" wide photo/video + 4-image gallery row ── */
  eventSection: {
    heading: string;
    wideImage: string;
    /** Optional wide video — takes priority over wideImage when present. */
    wideVideo?: string;
    galleryImages: string[];
  };

  /* ── "EXCLUSIVE ASG EVENTS" 3-card grid ── */
  exclusiveEvents: {
    heading: string;
    items: BlogEventCard[];
  };

  /* ── "The new MIAH collection" split section ── */
  collectionSection: {
    heading: string;
    description: string;
    photos: string[];
  };
}

/* ------------------------------------------------------------------ */
/*  Posts                                                              */
/* ------------------------------------------------------------------ */

export const blogPosts: BlogPost[] = [
  {
    slug: "global-heritage-bangladeshi-lungi",
    title:
      "Global heritage on Bangladeshi lungi: Amanat Shah creates lungi for new generation",
    label: "Press release",
    category: "Corporate",
    publishedAt: "31 March, 2024, 01:40 pm",
    lead: "Popular lungi brand Amanat Shah continues its Caribbean series this Eid with global heritage alifa printed on the lungi alongside the traditional check-stripe patterns.",

    heroImages: [
      "/images/newsroom/news-hero.png",
      "/images/newsroom/news-card-c.png",
    ],

    body: [
      "Unter der kreativen Leitung von David Beckham und designt von BOSS präsentiert sich die Garderobe dieser Saison mit einer unverkennbaren sommerlichen Leichtigkeit. Luftige Stoffe treffen auf eine Palette aus sanften Neutralfarben und lebhaften Akzenten – die Kollektion vereint mühelos tragbare Essentials, smarte Casual-Favoriten und elegante Tailoring-Pieces.",
      "Unter der kreativen Leitung von David Beckham und designt von BOSS präsentiert sich die Garderobe dieser Saison mit einer unverkennbaren sommerlichen Leichtigkeit. Luftige Stoffe treffen auf eine Palette aus sanften Neutralfarben und lebhaften Akzenten – die Kollektion vereint mühelos tragbare Essentials, smarte Casual-Favoriten und elegante Tailoring-Pieces.",
      "The Caribbean series of lungis features visuals of many world heritage, snow-covered landscapes, and Bangladeshi traditions like boats docked at the ghats, bullock carts, and mountains."
    ],

    eventSection: {
      heading: "A looks inside the ASG MIAH event",
      wideImage: "/images/newsroom/news-featured.png",
      galleryImages: [
        "/images/newsroom/news-card-d.png",
        "/images/newsroom/news-card-e.png",
        "/images/newsroom/news-card-f.png",
        "/images/newsroom/news-card-b.png",
      ],
    },

    exclusiveEvents: {
      heading: "Exclusive ASG Events",
      items: [
        {
          image: "/images/newsroom/news_1.webp",
          caption: "President’s industrial development",
        },
        {
          image: "/images/newsroom/news_2.webp",
          caption: "President’s industrial development award.",
        },
        {
          image: "/images/newsroom/news_3.webp",
          caption: "President’s industrial development award.",
        },
      ],
    },

    collectionSection: {
      heading: "The new MIAH collection",
      description:
        "Unter der kreativen Leitung von David Beckham und designt von BOSS präsentiert sich die Garderobe dieser Saison mit einer unverkennbaren sommerlichen Leichtigkeit. Luftige Stoffe treffen auf eine Palette aus sanften Neutralfarben und lebhaften Akzenten – die Kollektion vereint mühelos tragbare Essentials, smarte Casual-Favoriten und elegante Tailoring-Pieces.",
      photos: [
        "/images/newsroom/news-card-c.png",
        "/images/newsroom/news-card-d.png",
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

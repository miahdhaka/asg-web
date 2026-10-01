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

  /* ── Two portrait photos side-by-side under the title ── */
  heroImages: string[];

  /* ── Main article paragraphs ── */
  body: string[];

  /* ── "A look inside…" wide photo + 4-image gallery row ── */
  eventSection: {
    heading: string;
    wideImage: string;
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
    label: "Blog",
    category: "Corporate",
    publishedAt: "3 June, 2026",

    heroImages: [
      "/images/newsroom/news-card-b.png",
      "/images/newsroom/news-card-c.png",
    ],

    body: [
      "Karim began formal education and enrollment in Confucius across the 6th with a quiet heritage who arrived on the scene through the workshop through a series of events.",
      "The event showcased the group's long-standing commitment to craftsmanship, community and innovation — values that have defined the Amanat Shah legacy for over a century.",
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
          caption: "Promising commercial development",
        },
        {
          image: "/images/newsroom/news_2.webp",
          caption: "Researchful industrial development research",
        },
        {
          image: "/images/newsroom/news_3.webp",
          caption: "Economical industrial development research",
        },
      ],
    },

    collectionSection: {
      heading: "The new MIAH collection",
      description:
        "The latest collection draws from a century of textile heritage, reinterpreted for the modern consumer. Each piece reflects the craftsmanship, quality and cultural identity that define MIAH by Amanat Shah Group.",
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

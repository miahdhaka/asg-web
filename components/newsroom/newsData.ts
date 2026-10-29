/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface NewsItem {
  slug: string;
  date: string;
  category: string;
  title: string;
  image: string;
}

export interface BulletSection {
  heading: string;
  items: string[];
}

/**
 * One structured block of long-form article copy. Rendered in order —
 * heading, then paragraphs, then the list — so sections can interleave
 * prose and bullets the way the source article is written.
 */
export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface NewsArticle extends NewsItem {
  /** Short label shown above the title, e.g. "Press release" */
  label: string;
  publishedAt: string;
  /** Opening paragraphs, shown right under the hero image */
  body: string[];
  /** Optional bulleted sub-sections, shown after the body */
  bulletSections?: BulletSection[];
  /** Optional structured sections for long-form articles */
  sections?: ArticleSection[];
}

/* ------------------------------------------------------------------ */
/*  Articles                                                           */
/* ------------------------------------------------------------------ */

export const newsArticles: NewsArticle[] = [
  {
    slug: "from-yarn-to-fabric-textile-manufacturing-process",
    label: "Article",
    date: "October 2026",
    category: "Textiles",
    title: "From Yarn to Fabric: Understanding the Textile Manufacturing Process",
    image: "/images/newsroom/yarn-news.jpeg",
    publishedAt: "October 2026",
    body: [
      "Behind every roll of fabric is a series of careful steps. Yarn is prepared, formed into fabric, cleaned, coloured, finished and checked before it reaches a garment maker. This guide walks through the textile manufacturing process one step at a time.",
      "Understanding this process helps buyers and business partners choose the right fabric and set clear product requirements. The main stages are similar across the industry, but the exact steps depend on the type of fabric and how it will be used.",
    ],
    sections: [
      {
        heading: "The Textile Manufacturing Process at a Glance",
        bullets: [
          "Yarn preparation",
          "Fabric formation through weaving or knitting",
          "Wet processing, including preparation dyeing and printing",
          "Fabric finishing",
          "Inspection and quality control",
          "Packing and dispatch",
        ],
      },
      {
        heading: "Step 1: Yarn Preparation",
        paragraphs: [
          "Yarn is made by spinning fibres such as cotton, polyester or a blend into long, continuous strands. Before weaving or knitting begins, the yarn is prepared so that it runs smoothly through the machines.",
        ],
        bullets: [
          "Winding: Yarn is wound onto cones or packages, which makes it easier to handle. Some yarn faults can also be spotted and removed at this stage.",
          "Warping and sizing: For woven fabric, yarns are laid side by side along a beam. A protective coating called size, such as starch, is often added to the lengthwise (warp) yarns to make them stronger and reduce breakage during weaving (Britannica).",
        ],
      },
      {
        paragraphs: [
          "Good yarn preparation means fewer stoppages in production and fewer fabric defects later on.",
        ],
      },
      {
        heading: "Step 2: Fabric Formation Through Weaving or Knitting",
        paragraphs: [
          "Weaving and knitting are the two main ways of turning yarn into fabric. Weaving produces fabric by interlacing two sets of yarns that cross each other, normally at right angles (Britannica). Knitting builds fabric from loops, in two basic constructions known as warp and weft knitting (Britannica). Each method creates a different structure, so each suits different products.",
        ],
        bullets: [
          "How it works — Weaving: lengthwise yarns (warp) cross with widthwise yarns (weft). Knitting: yarn is formed into interlocking loops.",
          "Common characteristics — Weaving: often firm and stable. Knitting: often soft and stretchy.",
          "Common uses — Weaving: shirts, trousers, denim and home textiles. Knitting: T-shirts, sportswear and underwear.",
        ],
      },
      {
        paragraphs: [
          "Fabric at this stage is called greige fabric (also spelled grey fabric), sometimes known as gray goods. It has not yet been fully cleaned, dyed or finished (Britannica). Whether it is woven or knitted, its structure shapes how the fabric looks, feels and performs.",
        ],
      },
      {
        heading: "Step 3: Wet Processing",
        paragraphs: [
          "Greige fabric can contain natural impurities, oils and leftover materials from earlier stages. Wet processing removes these and prepares the fabric for colour. Scouring, for example, removes dirt, oils and any size applied to warp yarns, while bleaching removes natural colour to give a whiter base (Britannica).",
        ],
        bullets: [
          "Preparation: Desizing, scouring and bleaching remove unwanted materials and get the fabric ready for dyeing. Bleaching is used when a cleaner or lighter base is needed.",
          "Dyeing: Colour is applied using a method suited to the fibre, fabric structure, and product.",
          "Printing: Patterns and designs are added when the product calls for them.",
        ],
      },
      {
        paragraphs: [
          "This stage needs close control of water, chemicals, temperature and treatment time. These factors affect colour consistency, fabric quality and the use of resources, so careful management matters for both performance and environmental responsibility.",
          "In Bangladesh, the scale of water use makes this especially important. The International Finance Corporation's Partnership for Cleaner Textile (PaCT) estimates that the country's textile wet processing industry uses around 1,500 billion litres of water a year to process 5 million tonnes of fabric. Wet processing units are classed as red category industries, so they need an Environmental Clearance Certificate and a compliant effluent treatment plant (The Business Standard).",
        ],
      },
      {
        heading: "Step 4: Fabric Finishing",
        paragraphs: [
          "Finishing improves the fabric's feel, appearance, shape or performance. The treatments chosen depend on the fabric and the buyer's specifications. Common examples include treatments that affect touch and appearance and others, such as pre-shrinking, that improve performance.",
        ],
        bullets: [
          "Softening or stiffening treatments to get the right feel",
          "Shrinkage control, so the fabric keeps its size after washing",
          "Heat-setting to fix the width and shape of suitable fabrics",
          "Brushing to create a particular surface texture",
          "Special treatments, such as water repellency or easy-care finishes",
        ],
      },
      {
        paragraphs: [
          "The right finish helps the fabric meet the expectations of garment makers, brands and end users.",
        ],
      },
      {
        heading: "Step 5: Inspection and Quality Control",
        paragraphs: [
          "Quality inspection is a key part of textile manufacturing. Fabric is checked for visible defects such as holes, stains, uneven texture and colour differences. Depending on the product and the buyer's needs, tests may also cover strength, shrinkage, colour consistency and colourfastness.",
          "These checks confirm whether the fabric meets the agreed specifications before it moves on. Finding problems early reduces waste and rework and supports on-time delivery.",
        ],
      },
      {
        heading: "Step 6: Packing and Dispatch",
        paragraphs: [
          "Once the fabric passes its quality checks, it is prepared for delivery. Depending on the product and the customer, it may be rolled or folded, labelled for identification and packed for transport.",
          "Clear labelling and careful packing protect the fabric in transit and help customers track and manage their orders.",
        ],
      },
      {
        heading: "What Happens After Fabric Manufacturing?",
        paragraphs: [
          "Finished fabric moves on to garment production, where it is cut, sewn and prepared for sale. It can also be used in home textiles and other products, depending on its structure and specifications.",
          "The needs of the final product guide decisions throughout manufacturing, from the choice of yarn to the finishing treatment. Clear communication between fabric manufacturers and buyers helps make sure the material suits its purpose.",
        ],
      },
      {
        heading: "Textile Manufacturing at Amanat Shah Group",
        paragraphs: [
          "Amanat Shah Group (ASG) is a family-owned textile group with a business legacy of more than a century, inaugurated in 1983. Its textile businesses cover the journey described in this guide, from yarn to finished fabric.",
        ],
        bullets: [
          "Yarn: Hazrat Amanat Shah Spinning Mills Limited, established in 2004, is the group's spinning business.",
          "Weaving and fabric: Amanat Shah Weaving Processing Limited, established in 2012, and Amanat Shah Fabrics Limited (ASFL), established in 2017, form the group's weaving and fabric business. ASFL manufactures woven textile fabrics, with listed products including plain weave, twill, satin and oxford constructions.",
          "Greige and finished fabric: The group describes itself as a manufacturer of yarns, greige fabrics and finished fabrics.",
          "Knitting: For knitted products, Trust Knitwear Industries Ltd. is described in its company profile as a 100% export-oriented knit composite factory (Trust Knitwear profile).",
        ],
      },
      {
        paragraphs: [
          "On certification, Amanat Shah Fabrics Limited and Hazrat Amanat Shah Spinning Mills Limited are listed under a Master FLAX FIBRE™ multi-site certificate issued by Bureau Veritas. The certificate covers the manufacturing of fabrics and is valid from 29 May 2024 to 28 May 2027 (Alliance for European Flax-Linen & Hemp directory).",
          "On the environment, the group states that it aspires to be recognised as a safe and environmentally responsible organisation (FourSource company profile).",
        ],
      },
      {
        heading: "Key Takeaways",
        bullets: [
          "Fabric quality is shaped by decisions made at every stage, starting with yarn preparation.",
          "Weaving and knitting create different fabric structures for different uses.",
          "Dyeing, printing and finishing decide much of the fabric's final look and feel.",
          "Quality inspection confirms that fabric meets specifications before delivery.",
          "Careful process management helps reduce waste and make better use of resources.",
        ],
      },
      {
        paragraphs: [
          "Want to learn more about Amanat Shah Group's textile businesses and capabilities? Visit our website or contact our team to discuss your business requirements and explore opportunities to work together.",
        ],
      },
      {
        heading: "Sources",
        bullets: [
          "Britannica, \"Weaving\"",
          "Britannica, \"Textile: Fabric construction yarns\"",
          "Britannica, \"Warp\" (knit constructions)",
          "Britannica, \"Textile finishing processes\"",
          "The Business Standard, \"Beyond the loom: Building a water-responsible apparel industry\" (citing IFC PaCT)",
        ],
      },
    ],
  },

  /* ---------- The future of textile manufacturing in Bangladesh ---------- */
  {
    slug: "future-of-textile-manufacturing-in-bangladesh",
    label: "Article",
    date: "October 2026",
    category: "Industry",
    title: "The Future of Textile Manufacturing in Bangladesh",
    image: "/images/newsroom/the_future-news.jpeg",
    publishedAt: "October 2026",
    body: [
      "Bangladesh has built a strong place in the global textile and apparel industry through large-scale production, competitive prices and an experienced workforce. These strengths still matter, but the industry is changing. Alongside production volume, manufacturers now need to focus on product quality, resource efficiency, technology and the changing needs of buyers.",
      "For textile manufacturers, this means finding practical ways to improve production, develop new products and keep supply chains reliable. These are questions the whole industry, including ASG, will need to answer in the years ahead.",
    ],
    sections: [
      {
        heading: "Where the Industry Stands Today",
        paragraphs: [
          "Garments remain the backbone of Bangladesh's export economy. According to Export Promotion Bureau (EPB) data reported in the press, garment exports earned US$39.34 billion in FY2024-25, about 81.49% of the country's total exports of US$48.28 billion (The Financial Express). In FY2025-26, garment exports were US$38.70 billion, a fall of 1.64% from the year before (UNB).",
          "These numbers show a large and experienced export base. They also show that growth is not guaranteed. The IMF's 2025 Article IV report on Bangladesh, published in January 2026, points to the need for policies that support job creation and export diversification (IMF). To protect its position, the industry will need to respond to changing market needs, manage costs and keep improving its products and processes.",
        ],
      },
      {
        heading: "Four Trends Shaping the Future of Textile Manufacturing",
      },
      {
        heading: "1. Sustainability and Resource Efficiency",
        paragraphs: [
          "Buyers are paying closer attention to how factories use water and energy, manage chemicals and treat wastewater. Certifications and documented environmental practices help manufacturers show their progress.",
          "Bangladesh already has a strong base to build on. A May 2026 report citing US Green Building Council data puts the number of LEED-certified green garment factories at 284, with more than 550 others registered or in the pipeline (The Daily Observer).",
          "Certification is only part of the picture. Energy data from 878 factories, collected for a 2026 policy brief by BRAC University's Centre for Entrepreneurship Development, suggests that around two-thirds of factories use no renewable energy technology (CED, BRAC University).",
          "For textile mills, using resources efficiently is both an environmental responsibility and a sound business decision. Investments in water recycling, energy-efficient equipment and waste management can reduce resource use and support steady production.",
        ],
      },
      {
        heading: "2. Technology and Better Production Planning",
        paragraphs: [
          "Modern machinery, production monitoring and digital management systems can help manufacturers improve efficiency and keep quality consistent. Better planning also reduces avoidable delays, material waste and errors. In an earlier quarterly review of the RMG sector, Bangladesh Bank named reducing lead times, improving efficiency and modernising production processes among its priority areas (Fibre2Fashion).",
          "Technology alone does not guarantee better results. Employees need the right training, and new systems must fit the real needs of the business. When equipment, planning and skilled people work well together, manufacturers are better placed to manage orders and meet changing requirements.",
        ],
      },
      {
        heading: "3. Product Diversification and Higher-Value Fabrics",
        paragraphs: [
          "Manufacturers with a wider product range are better placed to respond when demand changes. Developing new fabric constructions, exploring fibre blends and strengthening product development can open opportunities beyond standard, high-volume production. The same Bangladesh Bank review listed diversification across apparel products and investment in research and development as priorities (Fibre2Fashion).",
          "This takes investment in machinery, technical knowledge and a clear understanding of what buyers need. Manufacturers also need to decide which products suit their current capabilities and where further development makes commercial sense.",
        ],
      },
      {
        heading: "4. Skilled People and Better Workplaces",
        paragraphs: [
          "Even as technology advances, people remain central to textile manufacturing. Machine operators, technicians, engineers and production managers keep quality high, solve problems and keep operations running smoothly. Bangladesh Bank's review also pointed to a skilled RMG workforce as a priority (Fibre2Fashion).",
          "Training, workplace safety and opportunities to grow help employees build skills and take on more responsibility. A supportive workplace also helps companies keep experienced people and prepare their teams for new methods.",
        ],
      },
      {
        heading: "Challenges the Industry Must Address",
        paragraphs: [
          "Despite its strengths, Bangladesh's textile industry faces practical challenges.",
        ],
        bullets: [
          "Energy. A Reuters survey of 134 knitwear factories, reported on 22 September 2026, found that 55% had seen buyers cancel or cut orders because of gas and power shortages since late August (Prothom Alo, citing Reuters). The survey covers knitwear only, so it may not reflect every mill.",
          "Imported raw materials. Bangladesh Bank data reported by Apparel Resources show that RMG raw material imports reached US$18.44 billion in FY2024-25, up 9.9% from the year before (Apparel Resources).",
          "Changing trade conditions. Bangladesh's graduation from Least Developed Country (LDC) status is scheduled for 24 November 2026, following a five-year preparatory period set by a UN General Assembly resolution (UN DESA). Bangladesh and Nepal have asked for a three-year extension, and the UN Economic and Social Council has recommended that the General Assembly decide before that date (The Daily Star). The UN LDC Portal notes that the textile and clothing sector makes heavy use of LDC trade preferences and is among those most likely to be affected (UN LDC Portal).",
        ],
      },
      {
        paragraphs: [
          "Solving these issues takes cooperation across the supply chain. Manufacturers need to improve efficiency and plan investments carefully, while buyers, banks and policymakers play an important part in supporting a stable and competitive industry.",
        ],
      },
      {
        heading: "How ASG Is Preparing for the Future",
        paragraphs: [
          "Amanat Shah Group has business interests across textile manufacturing, fabric production, spinning, knitwear and apparel. These businesses operate in different areas of the textile value chain, serving varying production needs and customer requirements.",
        ],
      },
      {
        heading: "Looking Ahead",
        paragraphs: [
          "Bangladesh has a strong foundation in textile and apparel manufacturing, built on production experience, an established export industry and a skilled workforce. Building on it will take continued attention to quality, efficiency, product development and responsible manufacturing.",
          "For ASG and the wider industry, long-term progress will depend on practical improvements that meet buyer needs and support reliable production. By investing in people, processes and suitable technology, manufacturers can strengthen their capabilities and prepare for changing market conditions.",
          "Looking for a textile manufacturing partner in Bangladesh? Contact Amanat Shah Group to know more about our businesses and capabilities.",
        ],
      },
      {
        heading: "Sources",
        bullets: [
          "The Financial Express, \"Exports fetch $48.28b in FY25\"",
          "UNB, \"EU share erodes as Bangladesh RMG exports slip 1.64% to $38.70 billion in FY26\"",
          "International Monetary Fund, Bangladesh: 2025 Article IV Consultation, Country Report, January 2026",
          "The Daily Observer, report on LEED green factories, May 2026",
          "BRAC University Centre for Entrepreneurship Development (CED), energy policy brief on renewable energy in the RMG sector, 2026",
          "Fibre2Fashion, \"Bangladesh RMG sector's local value addition up 3.66%: Bangladesh Bank\"",
          "Prothom Alo (Reuters), \"55pc factories see buyers cancel or cut orders due to gas and power shortages\", 22 September 2026",
          "Apparel Resources, report on RMG raw material imports in FY2024-25, citing Bangladesh Bank data",
          "UN DESA, \"Graduation of Bangladesh, Lao People's Democratic Republic and Nepal from the LDC category\"",
          "The Daily Star, \"UN body refers Bangladesh's 3-year LDC extension request to General Assembly\"",
          "UN LDC Portal, \"Bangladesh graduation status\"",
        ],
      },
    ],
  },
  
  /* ---------- LEED Platinum certification ---------- */
  {
    slug: "amanat-shah-fabrics-leed-platinum-certification",
    label: "Press release",
    date: "June 2025",
    category: "Sustainability",
    title: "Amanat Shah Fabrics Gets LEED Platinum Certification",
    image: "/images/newsroom/certification-news.jpeg",
    publishedAt: "June 2025",
    body: [
      "Amanat Shah Fabrics Limited (ASFL), a prominent name in Bangladesh's textile industry, has achieved the prestigious LEED Platinum certification for its Woven Composite Unit located in Vatpara, Panchdona, Narsingdi. This significant accomplishment, awarded in June 2025, comes with an impressive score of 82 points under the LEED v4.1 rating system for Operations and Maintenance: Existing Buildings.",
      "The certification, granted by the U.S. Green Building Council (USGBC) and verified by Green Business Certification Inc. (GBCI), recognizes ASFL's excellence in sustainable practices, including energy efficiency, water conservation, waste reduction, and indoor environmental quality.",
    ],
    sections: [
      {
        paragraphs: [
          "“This LEED Platinum certification is not just a milestone for us—it is a matter of national pride for Bangladesh's entire textile industry,” said Mr. Rezaul Karim, Director of Amanat Shah Fabrics Ltd. “It represents our deep commitment to green practices and our leadership in building a sustainable industrial future.”",
        ],
      },
      {
        heading: "Bangladesh's Rise as a Green Manufacturing Leader",
        paragraphs: [
          "Bangladesh continues to strengthen its position as a global leader in environmentally sustainable garment manufacturing. The country now hosts 248 LEED-certified garment factories, including 105 Platinum and 129 Gold certified facilities. Notably, 9 of the world's top 10 highest-rated LEED-certified garment factories are located in Bangladesh, underscoring the nation's growing influence in sustainable industrialization.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

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

export interface NewsArticle extends NewsItem {
  /** Short label shown above the title, e.g. "Press release" */
  label: string;
  publishedAt: string;
  /** Full article paragraphs */
  body: string[];
  /** Optional bulleted sub-sections */
  bulletSections?: BulletSection[];
}

/* ------------------------------------------------------------------ */
/*  Articles                                                           */
/* ------------------------------------------------------------------ */

export const newsArticles: NewsArticle[] = [
  {
    slug: "banijya-melay-notun-designe-amanat-shah-lungi",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "বাণিজ্য মেলায় নতুন ডিজাইনে ঐতিহ্যবাহী আমানত শাহ্ লুঙ্গি",
    image: "/images/newsroom/news-featured.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [
      "বাণিজ্য মেলায় একটি প্যাভিলিয়নে আছে আমানত শাহ্\u200C লুঙ্গি, স্ট্যান্ডার্ড লুঙ্গি, শাড়ি ও থ্রি-পিছ। সুবিশাল এলইডি স্ক্রিনের মাধ্যমে বানানো হয়েছে আমানত শাহ্\u200C লুঙ্গির প্যাভিলিয়নটি। আমানত শাহ্\u200C লুঙ্গির বিজনেস ডেভেলপমেন্ট এক্সিকিউটিভ নাহিদ আরেফিন রেজা বলেন, তাঁদের লুঙ্গি প্রস্তুতকারী প্রতিষ্ঠান মেসার্স হেলাল অ্যান্ড ব্রাদার্স শুধু লুঙ্গি নিয়েই বাণিজ্য মেলায় অংশ নিচ্ছে না, এর পাশাপাশি প্যাভিলিয়নে রয়েছে ছেলেদের গামছা, স্যান্ডো গেঞ্জি, পলো টি-শার্ট, পাঞ্জাবি এবং মেয়েদের শাড়ি, থ্রি-পিছ, আবায়াসহ আরও অনেক কিছু।",
      "আমানত শাহ্\u200C লুঙ্গির যাত্রা শুরু ১২৫ বছর আগে। শুরু হয়েছিল ছোট একটা ক্লথ স্টোর থেকে। নরসিংদী থেকে শুরু হওয়া প্রতিষ্ঠানটি আজ তৃতীয় প্রজন্মের হাত ধরে এগিয়ে যাচ্ছে। ২০২২ সালের বাণিজ্য মেলায় সংযোজন করা হয়েছে তাদের ঐতিহ্যবাহী অনলাইন শপ ও প্রিমিয়ার ব্র্যান্ড 'মিয়া'। এ ছাড়া আমানত শাহ্\u200C বাজারে এনেছে নতুন একধরনের পকেট লুঙ্গি। তাদের ভাষ্য, এতে লুঙ্গি পরার ধারণাই বদলে দেবে। এই লুঙ্গি পুরোনো গতানুগতিক ধারায় না পরে ইলাস্টিক বা রাবারের মাধ্যমে পরতে হবে।",
      "প্যাভিলিয়নে আগত এক গৃহিণী জানান, তিনি লুঙ্গি কিনতে এসেছেন। কিন্তু প্যাভিলিয়নে এসে দেখছেন তাঁর পছন্দের অনেক কিছুই রয়েছে। অনেকে লুঙ্গি কিনতে এসে পরিবারের সদস্যের জন্য শাড়ি কিনছেন—এমন সব ক্রেতাও দেখা মিলেছে প্যাভিলিয়নে। মেলায় আমানত শাহ্\u200C লুঙ্গির প্যাভিলিয়ন নম্বর বি-পিএস৩৫।",
      "১২৫ বছরের গৌরবোজ্জ্বল পারিবারিক ঐতিহ্যের পথ ধরে 'রূপসদী ক্লথ স্টোর' নামক ছোট্ট পরিসরের খুচরা ও পাইকারি দোকান থেকে দেশের অন্যতম প্রধান শিল্পগুচ্ছের এক বর্ণাঢ্য ঠিকানার নাম মেসার্স হেলাল অ্যান্ড ব্রাদার্স, পরবর্তী সময়ে যার সাফল্যেও অন্তর্ভুক্তি হয়েছে স্ট্যান্ডার্ড ও আমানত শাহ্\u200C ব্র্যান্ড। মেসার্স হেলাল অ্যান্ড ব্রাদার্স শুধু গ্রামীণ তাঁতশিল্পের মধ্যেই থেমে থাকেনি; প্রতিষ্ঠানটির স্বত্বাধিকারী মোহাম্মাদ হেলাল মিয়ার হাত ধরে বাংলাদেশের লোকজ বস্ত্রশিল্প—লুঙ্গি, শাড়ি, থ্রি-পিছ ও নিত্যব্যবহার্য গামছা দূরদূরান্তের প্রত্যন্ত মেঠোপথ থেকে আজ বিশ্বব্যাপী রপ্তানির মহাসড়কের স্বপ্নসারথি। লুঙ্গি, শাড়ি ও গামছাকে তিনি নিয়ে গেছেন অত্যাধুনিক আভিজাত্যের অনন্য উচ্চতায়। বস্ত্র খাতে (লুঙ্গি) রপ্তানিতে অবদানের স্বীকৃতিস্বরূপ বেশ কয়েকবার জাতীয় রপ্তানি ট্রফি ও সিআইপি মনোনীত হয়েছেন মেসার্স হেলাল অ্যান্ড ব্রাদার্সের স্বত্বাধিকারী ও আমানত শাহ্\u200C গ্রুপের চেয়ারম্যান মোহাম্মদ হেলাল মিয়া।",
      "দেশের চাহিদা মিটিয়ে রপ্তানির জাহাজে তুলে দিচ্ছে বাংলার বর্ণাঢ্য লুঙ্গি, গামছা, শাড়ি, থ্রি-পিছ, ভয়েল-পপলিন। এ দেশের লুঙ্গির প্রথম আধুনিক ব্র্যান্ডিং শুরু হয় মেসার্স হেলাল অ্যান্ড ব্রাদার্সের হাত ধরে। এ খাতে সর্বাধিক বিক্রয় ও রপ্তানির সাফল্য মেসার্স হেলাল অ্যান্ড ব্রাদার্স বয়ে এনেছে সর্বোচ্চ রাষ্ট্রীয় পুরস্কার ও স্বীকৃতির বরমাল্য। আজ দেশ ছাপিয়ে-সমুদ্র পেরিয়ে সাফল্যেও পাল উড়িয়ে মেসার্স হেলাল অ্যান্ড ব্রাদার্সের পণ্য বিশ্বের সর্বত্র সমাদৃত।",
    ],
    bulletSections: [
      {
        heading: "পণ্যগুলো হলো",
        items: [
          "আমানত শাহ্\u200C লুঙ্গি",
          "আমানত শাহ্\u200C ভয়েল",
          "আমানত শাহ্\u200C পপলিন",
          "আমানত শাহ্\u200C গামছা",
          "স্ট্যান্ডার্ড লুঙ্গি, শাড়ি ও থ্রি-পিছ",
        ],
      },
      {
        heading: "প্রতিষ্ঠানের ভাষ্য",
        items: [
          "শতভাগ সুতি, পরতে আরাম",
          "বিশ্বমানের সুতা, মিশ্র আঁশের উন্নত বুনন, টেকসই",
          "নিত্যনতুন টেক্সচার, দেখতে চমৎকার",
          "বিশ্বমানের রং-রঞ্জন, শেষ দিন পর্যন্ত বর্ণোজ্জ্বল",
          "পরতে পরতে নিরাপত্তার ছাপ, আসল-নকল চেনার সহজ উপায়",
          "অতুলনীয় ডিজাইনের বাহারি কালেকশন",
        ],
      },
      {
        heading: "উল্লেখযোগ্য পরিসংখ্যান",
        items: [
          "২০টির বেশি দেশে রপ্তানি",
          "২৪টির বেশি পণ্যের সমাহার",
          "০ হাজারের বেশি কর্মী",
          "২৩টির বেশি স্বীকৃতি বা পুরস্কার",
          "৩৫ বছরের বেশি অভিজ্ঞতাসম্পন্ন",
          "১২৫ বছরের বেশি পারিবারিক ঐতিহ্য",
        ],
      },
    ],
  },
  /* ---------- placeholder articles for grid cards ---------- */
  {
    slug: "presidents-industrial-development-award-2024-side",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-b.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-c",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-c.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-d",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-d.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-1",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_1.webp",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-e",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-e.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-f",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-f.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-2",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_2.webp",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  /* Extra rows */
  {
    slug: "news-article-3",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_3.webp",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-b2",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-b.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-c2",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-c.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-d2",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-d.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-1b",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news_1.webp",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  {
    slug: "presidents-industrial-development-award-2024-e2",
    label: "Press release",
    date: "3 June, 2026",
    category: "Corporate",
    title: "President's industrial development award -2024",
    image: "/images/newsroom/news-card-e.png",
    publishedAt: "31 March, 2024, 01:40 pm",
    body: [],
  },
  /* --- 6 extra articles to demo multi-click Load more (20 total) --- */
  {
    slug: "asg-group-expands-textile-exports",
    label: "Press release",
    date: "15 May, 2026",
    category: "Corporate",
    title: "ASG Group expands textile exports to 5 new markets",
    image: "/images/newsroom/news-card-f.png",
    publishedAt: "15 May, 2026, 10:00 am",
    body: [],
  },
  {
    slug: "hazrat-amanat-shah-spinning-milestone",
    label: "Press release",
    date: "28 April, 2026",
    category: "Mills",
    title: "Hazrat Amanat Shah Spinning Mills achieves production milestone",
    image: "/images/newsroom/news_1.webp",
    publishedAt: "28 April, 2026, 02:30 pm",
    body: [],
  },
  {
    slug: "asg-sustainability-report-2025",
    label: "Report",
    date: "10 April, 2026",
    category: "Sustainability",
    title: "ASG Group publishes annual sustainability report 2025",
    image: "/images/newsroom/news_2.webp",
    publishedAt: "10 April, 2026, 09:00 am",
    body: [],
  },
  {
    slug: "amanat-shah-fabrics-innovation",
    label: "Press release",
    date: "22 March, 2026",
    category: "Fabrics",
    title: "Amanat Shah Fabrics introduces eco-friendly dyeing technology",
    image: "/images/newsroom/news_3.webp",
    publishedAt: "22 March, 2026, 11:15 am",
    body: [],
  },
  {
    slug: "asg-chairman-receives-cip-award",
    label: "Award",
    date: "5 March, 2026",
    category: "Award",
    title: "Chairman Mohammad Helal Miah receives CIP award from PM",
    image: "/images/newsroom/news-card-b.png",
    publishedAt: "5 March, 2026, 04:00 pm",
    body: [],
  },
  {
    slug: "helal-brothers-community-programme",
    label: "Community",
    date: "18 February, 2026",
    category: "CSR",
    title: "Helal Brothers launches rural education programme in Narshingdi",
    image: "/images/newsroom/news-card-c.png",
    publishedAt: "18 February, 2026, 08:45 am",
    body: [],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

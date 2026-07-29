import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Serve AVIF to browsers that support it (≈20-30% smaller than WebP),
    // falling back to WebP everywhere else
    formats: ["image/avif", "image/webp"],
    // Allowed quality values for next/image (default allows only 75)
    qualities: [75, 80, 90, 100],
    // Optimized images are immutable assets — let browsers/CDNs keep them
    // for a year instead of re-fetching every 4 hours (the default)
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // Static assets served straight from /public — fingerprint-free but
        // effectively immutable, so cache them hard for repeat visits
        source: "/:prefix(images|videos|fonts|logo|icon)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

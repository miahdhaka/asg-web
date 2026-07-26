import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Allowed quality values for next/image (default allows only 75)
    qualities: [75, 80, 90, 100],
  },
};

export default nextConfig;

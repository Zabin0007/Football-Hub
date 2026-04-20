import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
      },
    ],
  },
  experimental: {
    turbopack: false,
  },
};

export default nextConfig;

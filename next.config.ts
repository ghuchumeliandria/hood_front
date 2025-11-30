import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.tenor.com',
        port: '',       // ჩვეულებრივ ცარიელი
        pathname: '/**', // ყველა გზა დაიშვება
      },
    ],
  },
};

export default nextConfig;

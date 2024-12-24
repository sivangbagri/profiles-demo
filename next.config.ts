import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/result/:path', 
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', // Prevents caching
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
  },
  async headers() {
    return [
      {
        source: '/result/:path*', 
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

import type { NextConfig } from 'next';

const nextConfig = {
  reactCompiler: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;

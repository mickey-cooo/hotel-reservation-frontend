import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

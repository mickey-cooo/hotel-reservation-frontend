import type { NextConfig } from 'next';

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

module.exports = nextConfig;

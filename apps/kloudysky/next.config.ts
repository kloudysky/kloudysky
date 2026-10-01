import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@kloudysky/cloud-mark'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

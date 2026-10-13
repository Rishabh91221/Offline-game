/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ramayan/core'],
  output: 'export',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
};

export default nextConfig;

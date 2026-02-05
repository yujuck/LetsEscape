/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@lets-escape/shared'],
  experimental: {
    optimizePackageImports: ['@lets-escape/shared'],
  },
};

module.exports = nextConfig;

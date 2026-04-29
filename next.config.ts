import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },
}

export default nextConfig

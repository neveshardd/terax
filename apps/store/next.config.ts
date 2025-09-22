import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    disableOptimizedLoading: true
  },
  output: 'standalone'
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "openweathermap.org"],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;

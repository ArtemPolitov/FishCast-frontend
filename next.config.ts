import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "openweathermap.org", "res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;

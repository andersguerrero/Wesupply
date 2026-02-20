import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dcdn-us.mitiendanube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
    // Desactivar optimización en dev para evitar errores; local images funcionan en prod
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;

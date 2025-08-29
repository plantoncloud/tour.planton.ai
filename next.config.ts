import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qtrypzzcjebvfcihiynt.supabase.co",
      },
    ],
  },
};

export default nextConfig;

import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net",   // covers external.*, scontent.*, etc.
      },
      {
        protocol: "https",
        hostname: "**.facebook.com", // optional, for other fb images
      },
    ],
  },
};

export default nextConfig;

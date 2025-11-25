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
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.utfs.io", // fallback for subdomains
      },
      {
        protocol: "https",
        hostname: "*.dpqn4feq9d.ufs.sh", // fallback for subdomains
      }
    ],
  },
};

export default nextConfig;

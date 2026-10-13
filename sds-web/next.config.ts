import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: deployable to cPanel/FTP or any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents stays off: the project uses classic SSG / ISR / SSR
  // (route segment config such as `export const revalidate = 60`).
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

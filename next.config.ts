import type { NextConfig } from "next";
import path from "path";

// Pin the project root so Next.js / Turbopack don't walk up and pick a
// parent directory as the workspace root (there is a stray lockfile in
// /Users/matthewpark/Downloads/current-projects that confuses detection).
const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  async redirects() {
    return [
      // Old Wix pages → redirect to relevant current pages
      { source: "/collection-locations", destination: "/request-bin", permanent: true },
      { source: "/the-team", destination: "/about", permanent: true },
      { source: "/shipping-policy", destination: "/", permanent: true },
      { source: "/terms-conditions", destination: "/", permanent: true },
      { source: "/retro-pickle-t-shirt", destination: "/bb-1", permanent: true },
      { source: "/shop", destination: "/bb-1", permanent: true },
    ];
  },
};

export default nextConfig;

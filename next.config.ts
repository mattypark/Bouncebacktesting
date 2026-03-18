import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

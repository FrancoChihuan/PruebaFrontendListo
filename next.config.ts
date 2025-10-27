import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev",
        pathname: "/DigitalCollege/web/portadas/**",
      },
      {
        protocol: "https",
        hostname: "r2.ccdcapacitacion.edu.pe",
        pathname: "/DigitalCollege/web/portadas/**",
      },
    ],
  },
};

export default nextConfig;

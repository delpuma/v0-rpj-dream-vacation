/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "*.pexels.com",
      },
    ],
  },
  // Enable ISR for dynamic pages
  experimental: {
    // Increase static generation timeout for large page counts
  },
}

export default nextConfig

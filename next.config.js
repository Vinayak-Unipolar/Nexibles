/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
    images: {
      domains: ["cdn.nexigifting.com", "nexiblesapp.barecms.com"],
      unoptimized: true, // Disable Next.js built-in optimization
    },
  };
module.exports = nextConfig;

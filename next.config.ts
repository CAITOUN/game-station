/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.onlinegames.io',
      },
      {
        protocol: 'https',
        hostname: 'cloud.onlinegames.io',
      }
    ],
    unoptimized: true,
  },
};

export default nextConfig;

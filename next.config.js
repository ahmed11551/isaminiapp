/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Для работы Telegram Mini App
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
      },
    ],
    unoptimized: true, // Для Telegram Mini App может быть полезно
  },
};

module.exports = nextConfig;


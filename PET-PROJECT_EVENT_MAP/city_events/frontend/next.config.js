/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  pageExtensions: ['js', 'jsx'],
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path: false,
      stream: false,
      crypto: false,
      ...config.resolve.fallback,
    };
    return config;
  },
  productionBrowserSourceMaps: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Проксируем все /api/* запросы на Django
      },
    ];
  },
};

module.exports = nextConfig;

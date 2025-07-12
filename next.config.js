/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adminbackend-czlc.onrender.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // Add this to handle client-side routing in production
  trailingSlash: true,
  // Disable React StrictMode to prevent double rendering in development
  reactStrictMode: false,
  // Add base path if your app is hosted in a subdirectory
  // basePath: '/your-base-path',
}

module.exports = nextConfig

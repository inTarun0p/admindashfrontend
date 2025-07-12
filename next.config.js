/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  // Add this to handle client-side routing in production
  trailingSlash: true,
  // Disable React StrictMode to prevent double rendering in development
  reactStrictMode: false,
  // Add base path if your app is hosted in a subdirectory
  // basePath: '/your-base-path',
}

module.exports = nextConfig

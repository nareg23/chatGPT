/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "https://ui-avatars.com",
      "gravatar.com",
    ],
  },
};

module.exports = nextConfig;

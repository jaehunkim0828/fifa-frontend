/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["ssl.nexon.com", "3.37.55.226", "fo4.dn.nexoncdn.co.kr"],
  },
  webpack(config) {
    config.resolve.modules.push(__dirname); // 추가
    return config;
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;

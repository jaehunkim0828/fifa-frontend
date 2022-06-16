/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ssl.nexon.com', 'localhost', 'fo4.dn.nexoncdn.co.kr']
  }
}

module.exports = nextConfig

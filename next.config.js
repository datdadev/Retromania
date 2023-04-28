/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'art.pixilart.com',
      'www.gamesdatabase.org',
      'pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com'
    ],
  },
}

module.exports = nextConfig

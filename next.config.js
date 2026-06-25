/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdfkit'],
  },
  images: {
    domains: [],
  },
}

module.exports = nextConfig

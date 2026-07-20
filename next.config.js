/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdfkit'],
  compress: true,
  images: {
    domains: [],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        // Media Assets & Video Background (Edge Byte-Range Streaming + Long TTL)
        source: '/:path*.(mp4|webm|jpg|jpeg|png|gif|ico|svg|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
      {
        // Global Security Headers for Vercel CDN
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

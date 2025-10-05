/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"
    return [
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ]
  },
}

export default nextConfig

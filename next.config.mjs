/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/PracticalQuiz2',
        destination: '/PracticalQuiz2/index.html',
      },
      {
        source: '/PracticalQuiz',
        destination: '/PracticalQuiz/index.html',
      },
    ];
  },
};

export default nextConfig;

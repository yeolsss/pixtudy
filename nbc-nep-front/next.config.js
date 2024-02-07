/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true, // SWC를 사용한 코드 최적화 활성화
  experimental: {
    runtime: "edge", // Edge Functions를 사용하기 위한 설정
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lrklhpcxbdiunpubmvio.supabase.co",
      },
    ],
    minimumCacheTTL: 0,
  },
};

module.exports = nextConfig;

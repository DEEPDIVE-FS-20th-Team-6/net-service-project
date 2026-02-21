import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "standalone", // 빌드 결과물을 실행에 필요한 파일만 모아 별도로 구성합니다.
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "/t/p/**",
            },
        ],
    },
};

export default nextConfig;
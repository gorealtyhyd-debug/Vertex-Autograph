/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // 100% static HTML/CSS/JS — no Node server needed (Hostinger shared hosting)
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  // Built JS/CSS/fonts are served from /assets/_next (scripts/postbuild.mjs moves them there)
  assetPrefix: isProd ? '/assets' : undefined,
  images: { unoptimized: true },
};

export default nextConfig;

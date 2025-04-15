/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.ibb.co", "github.com", "raw.githubusercontent.com"],
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true, // Add this for better GitHub Pages compatibility
};

export default nextConfig;

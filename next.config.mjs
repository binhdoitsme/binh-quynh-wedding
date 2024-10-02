/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env["NEXT_PUBLIC_SUPABASE_PUBLIC_URL"],
      },
    ],
  },
};

export default nextConfig;

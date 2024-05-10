/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arabi-learn.s3.eu-west-3.amazonaws.com",

        pathname: "/**",
      }
    ]
  },
  output: 'standalone',
  compress: false,
  redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/skills",
        permanent: true,
      },
      {
        source:"/",
        destination:"/home",
        permanent:true
      }
    ];
  },
};

export default nextConfig;

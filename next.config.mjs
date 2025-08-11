/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "farseit.com",
      "i.pravatar.cc",
      "testingbackend.farseit.com",
      "ceramicandfoodproducts.com",
    ],
    unoptimized: true,
  },
  crossOrigin: "anonymous",
  async rewrites() {
    return [
      {
        source: "/api/product/:path*",
        destination: "https://testingbackend.farseit.com/Product/:path*",
      },
    ];
  },
};

export default nextConfig;

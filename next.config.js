/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/receipt",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

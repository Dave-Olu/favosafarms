/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      {
        source: "/sucess-stories",
        destination: "/success-stories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

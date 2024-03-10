/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  publicRuntimeConfig: {
    conductor: {
      keyId: process.env.KEY,
      keySecret: process.env.SECRET,
      serverUrl: process.env.SERVER_URL,
    },
    workflows: {
      requestForLoan: `${process.env.WF_NAME || "Checkout"}`,
      correlationId: "packet_workflow",
    },
  },
};

export default nextConfig;

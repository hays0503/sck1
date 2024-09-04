const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru/Astana",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
      source: "/api/v1/citys",
      destination: "http://pimenov.kz/api/v1/citys/",
      },
      {
        source: "/api/v1/category/",
        destination: "http://pimenov.kz/api/v1/category/",
      },

    ];
  },
};

module.exports = withNextIntl(nextConfig);

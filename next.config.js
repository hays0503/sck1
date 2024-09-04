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
        source: "/api/v1/category",
        destination: "http://pimenov.kz/api/v1/category/",
      },
      {
        source: "/media/product_images/:patch*",
        destination: "http://pimenov.kz:8000/media/product_images/:patch*/",
      },

    ];
  },
};

module.exports = withNextIntl(nextConfig);

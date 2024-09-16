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
      // Запрос городов
      {
        source: "/api/v1/citys",
        destination: "http://pimenov.kz/api/v1/citys/",
      },
      // Запрос категории
      {
        source: "/api/v1/category",
        destination: "http://pimenov.kz/api/v1/category/",
      },
      //Список всех популярных продуктов
      {
        source: "/api/v1/populates",
        destination: "http://pimenov.kz/api/v1/populates/",
      },
      // Список всех продуктов
      {
        source: "/api/v1/products",
        destination: "http://pimenov.kz/api/v1/products/",
      },
      // Детали конкретного продукта по его слагу
      {
        source: "/api/v1/products/:slug_prod",
        destination: "http://pimenov.kz/api/v1/products/:slug_prod/",
      },
      // Фильтрация продуктов по категории
      {
        source: "/api/v1/products/filter_by_cat/:slug_cat",
        destination:
          "http://pimenov.kz/api/v1/products/filter_by_cat/:slug_cat/",
      },
      // Получение списка слагов всех продуктов
      {
        source: "/api/v1/products/all/slugs",
        destination: "http://pimenov.kz/api/v1/products/all/slugs/",
      },
      //Получение продуктов по списку идентификаторов
      {
        source: "/api/v1/products/by_ids/:ids",
        destination: "http://pimenov.kz/api/v1/products/by_ids/:ids/",
      },
      //Фильтрация продуктов по различным параметрам
      {
        source: "/api/v1/products/set/filter",
        destination: "http://pimenov.kz/api/v1/products/set/filter/",
      },
      // Обработка картинок (проксирование)
      {
        source: "/media/product_images/:patch*",
        destination: "http://pimenov.kz:8000/media/product_images/:patch*/",
      },

      // api корзины
      // Запрос данных их корзины
      {
        source: "/basket_api/v1/bascket/:uuid_id",
        destination: "http://pimenov.kz:8989/basket_api/v1/bascket/:uuid_id/",
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

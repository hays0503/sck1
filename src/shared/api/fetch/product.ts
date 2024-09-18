"use client";
import useSWR from "swr";
import { UrlApi, UrlRevalidate } from "../url";
import { Products } from "@/shared/types/products";
import defaultFetcher from "./defaultFetcher";


interface PropsFetcherProducts {
  as:
    | "slug_prod"
    | "filter_by_cat"
    | "all/slugs"
    | "by_ids"
    | "set/filter"
    | undefined;
  params?: string | object | undefined;
}

export default function useFetcherProducts({
  as,
  params,
}: PropsFetcherProducts) {
  switch (as) {
    // Детали конкретного продукта по его слагу.
    case "slug_prod": {
      const urls = `${UrlApi.getProducts}${params}`
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Products[]>(urls, (url: string) =>
        defaultFetcher(urls, UrlRevalidate.getProducts)
      );
    }
    // Фильтрация продуктов по категории
    case "filter_by_cat": {
      const urls = `${UrlApi.getProducts}${as}/${params}`
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Products[]>(urls, (url: string) =>
        defaultFetcher(urls, UrlRevalidate.getProducts)
      );
    }
    //Получение списка слагов всех продуктов
    case "all/slugs": {
      const urls = `${UrlApi.getProducts}${as}`
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Products[]>(urls, (url: string) =>
        defaultFetcher(urls, UrlRevalidate.getProducts)
      );
    }
    //Получение продуктов по списку идентификаторов.
    case "by_ids": {
      const urls = `${UrlApi.getProducts}${as}/${params}`
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Products[]>(urls, (url: string) => {
        return defaultFetcher(urls, UrlRevalidate.getProducts);
      });
    }
    //Фильтрация продуктов по различным параметрам.
    case "set/filter": {
      const urls = `${UrlApi.getProducts}${as}`
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Products[]>(UrlApi.getProducts, (url: string) =>
        defaultFetcher(urls, {
          ...UrlRevalidate.getProducts,
          body: JSON.stringify(params),
        })
      );
    }
    //Список всех продуктов
    default: {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Products[]>(UrlApi.getProducts, (url: string) =>
        defaultFetcher(url, UrlRevalidate.getProducts)
      );
    }

  }
}

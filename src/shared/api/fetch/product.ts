"use client";
import useSWR from "swr";
import { UrlApi, UrlRevalidate } from "../url";
import { Products } from "@/shared/types/products";

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

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
      return useSWR<Products[]>(urls, (url: string) =>
        fetcher(urls, UrlRevalidate.getProducts)
      );
    }
    // Фильтрация продуктов по категории
    case "filter_by_cat": {
      const urls = `${UrlApi.getProducts}${as}/${params}`
      return useSWR<Products[]>(urls, (url: string) =>
        fetcher(urls, UrlRevalidate.getProducts)
      );
    }
    //Получение списка слагов всех продуктов
    case "all/slugs": {
      const urls = `${UrlApi.getProducts}${as}`
      return useSWR<Products[]>(urls, (url: string) =>
        fetcher(urls, UrlRevalidate.getProducts)
      );
    }
    //Получение продуктов по списку идентификаторов.
    case "by_ids": {
      const urls = `${UrlApi.getProducts}${as}/${params}`
      return useSWR<Products[]>(urls, (url: string) => {
        return fetcher(urls, UrlRevalidate.getProducts);
      });
    }
    //Фильтрация продуктов по различным параметрам.
    case "set/filter": {
      const urls = `${UrlApi.getProducts}${as}`
      return useSWR<Products[]>(UrlApi.getProducts, (url: string) =>
        fetcher(urls, {
          ...UrlRevalidate.getProducts,
          body: JSON.stringify(params),
        })
      );
    }
    //Список всех продуктов
    default: {
      return useSWR<Products[]>(UrlApi.getProducts, (url: string) =>
        fetcher(url, UrlRevalidate.getProducts)
      );
    }
  }
}

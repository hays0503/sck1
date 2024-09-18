"use client";
import useSWR from "swr";
import {UrlApi, UrlRevalidate} from "../url";
import { Category } from "@/shared/types/category";
import defaultFetcher from "./defaultFetcher";



export default function useFetcherCategory() {
  const object = useSWR<Category[]>(UrlApi.getCategory, (url: string) =>
    defaultFetcher(url, UrlRevalidate.getCategory)
  );

  return object;
}

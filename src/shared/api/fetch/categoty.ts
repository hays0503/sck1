"use client";
import useSWR from "swr";
import {UrlApi} from "../url";
import { Category } from "@/shared/types/category";

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export default function useFetcherCategory() {
  const object = useSWR<Category[]>(UrlApi.getCategory, (url: string) =>
    fetcher(url, {})
  );

  return object;
}

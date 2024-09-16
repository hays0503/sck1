"use client";
import useSWR from "swr";
import {UrlApi, UrlRevalidate} from "../url";
import { Populates } from "@/shared/types/populates";

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export default function useFetcherPopulates() {
  const object = useSWR<Populates[]>(UrlApi.getPopulates, (url: string) =>
    fetcher(url, UrlRevalidate.getPopulates)
  );

  return object;
}

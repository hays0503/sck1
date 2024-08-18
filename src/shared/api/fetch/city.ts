"use client";
import useSWR from "swr";
import {UrlApi} from "../url";
import { iCity } from "@/shared/types/city";

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export default function useFetcherCity() {
  const object = useSWR<iCity[]>(UrlApi.getCity, (url: string) =>
    fetcher(url, {})
  );

  return object;
}

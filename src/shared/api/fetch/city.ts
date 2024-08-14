"use client";
import useSWR from "swr";
import {UrlApi, UrlApiWithDomain} from "../url";

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export default function useFetcherCity() {
  const object = useSWR(UrlApi.getCity, (url) =>
    fetcher(url, {})
  );

  return object;
}

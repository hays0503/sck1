"use client";
import useSWR from "swr";
import {UrlApi, UrlRevalidate} from "../url";
import { Populates } from "@/shared/types/populates";
import defaultFetcher from "./defaultFetcher";


export default function useFetcherPopulates() {
  const object = useSWR<Populates[]>(UrlApi.getPopulates, (url: string) =>
    defaultFetcher(url, UrlRevalidate.getPopulates)
  );

  return object;
}

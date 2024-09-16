"use client";

import { SWRConfig } from "swr";
import { CityProvider } from "@/shared/hook/useGetCityParams";

export function ProvidersClient({
  children,
  fallback,
  params,
}: {
  children: React.ReactNode;
  fallback: any;
  params: any;
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <CityProvider City={params?.city}>{children}</CityProvider>
    </SWRConfig>
  );
}

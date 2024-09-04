"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import {UrlApi, UrlApiWithDomain,UrlRevalidate} from "@/shared/api/url";
import { HeaderSCK } from "@/widgets/HeaderSCK";

export async function MainPage({ params }: { params: any }) {

  const fetchCity = await (
    await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fetchCategory = await (
    await fetch(UrlApiWithDomain.getCategory, {
      ...UrlRevalidate.getCategory,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();
  

  const fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApi.getCategory]: fetchCategory,
  };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient fallback={fallback}>
          <HeaderSCK params={params} />
          <section></section>
          <footer></footer>
        </ProvidersClient>
      </ProvidersServer>
    </>
  );
}

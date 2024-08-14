"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import {UrlApi, UrlApiWithDomain} from "@/shared/api/url";
import ComponentHeader from "@/widgets/ComponentHeader/ui/ComponentHeader";

export async function MainPage({ params }: { params: any }) {
  const fetchCity = await (
    await fetch(UrlApiWithDomain.getCity, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fallback = {
    [UrlApi.getCity]: fetchCity,
  };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient fallback={fallback}>
          <header><ComponentHeader params={params} /></header>
          <section></section>
          <footer></footer>
        </ProvidersClient>
      </ProvidersServer>
    </>
  );
}

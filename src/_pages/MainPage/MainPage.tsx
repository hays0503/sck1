"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterSCK } from "@/features/FooterSCK";
import { fetchCity } from "@/shared/api/fallback/fallback";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Populates } from "@/shared/types/populates";

import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Sale } from "@/widgets/Sale";
import { Flex } from "antd";


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

  const fetchPopulates = await (
    await fetch(UrlApiWithDomain.getPopulates, {
      ...UrlRevalidate.getPopulates,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const PopularProductsByIds = `by_ids/${fetchPopulates.flatMap((i: Populates) => i.products).join(",")}`;
  const UrlApiPopularProductsByIds = UrlApi.getProducts + PopularProductsByIds;
  const UrlApiWithDomainPopularProductsByIds = UrlApiWithDomain.getProducts + PopularProductsByIds;
  const fetchPopularProductsByIds = await (
    await fetch(UrlApiWithDomainPopularProductsByIds, {
      ...UrlRevalidate.getProducts,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApi.getCategory]: fetchCategory,
    [UrlApi.getPopulates]: fetchPopulates,
    [UrlApiPopularProductsByIds]: fetchPopularProductsByIds,
  };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient
          fallback={fallback}
          // fallback={{}}
          params={params}
        >
          <Flex vertical={true}>
            <HeaderSCK params={params} />
            <section>
              <Sale params={params} />
            </section>
            <footer>
              <FooterSCK params={params} />
            </footer>
          </Flex>
        </ProvidersClient>
      </ProvidersServer>
    </>
  );
}

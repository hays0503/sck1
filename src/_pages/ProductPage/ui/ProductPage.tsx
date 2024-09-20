"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterSCK } from "@/features/FooterSCK";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { HeaderSCK } from "@/widgets/HeaderSCK";
import { ProductDetailCard } from "@/widgets/ProductDetailCard";
import { Flex } from "antd";

export default async function ProductPage({ params }: { params: any }) {

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



  const ProductsBySlug = `${params.slug}`;
  const UrlApiProductsBySlug = UrlApi.getProducts + ProductsBySlug;
  const UrlApiWithDomainProductsBySlug = UrlApiWithDomain.getProducts + ProductsBySlug;
  const fetchPopularProductsByIds = await (
    await fetch(UrlApiWithDomainProductsBySlug, {
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
    [UrlApiProductsBySlug]: fetchPopularProductsByIds,
  };
  
  return (
    <>
      <ProvidersServer>
        <ProvidersClient
          fallback={fallback}
          params={params}
        >
          <Flex vertical={true}>
            <HeaderSCK params={params} />
            <section>
              <ProductDetailCard params={params}/>
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
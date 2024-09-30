"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterMobileSCK } from "@/features/FooterMobileSCK";
import { FooterSCK } from "@/features/FooterSCK";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Catalog } from "@/widgets/Catalog";

import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Flex } from "antd";

export default async function CatalogPage({params}: {params: any}) {
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

  const UrlProductCatalog = `${UrlApi.getProducts}filter_by_cat/${params.slug}`;
  const UrlProductCatalogWithDomain = `${UrlApiWithDomain.getProducts}filter_by_cat/${params.slug}`;

  console.log(UrlProductCatalog);
  console.log(UrlProductCatalogWithDomain);

  const fetchProductCatalog = await (
    await fetch(UrlProductCatalogWithDomain, {
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
    [UrlProductCatalog]: fetchProductCatalog
  };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient
          fallback={fallback}
          params={params}
        >
          <Flex vertical={true}>
            <HeaderSCK params={params} carousel />
            <section>
              <Catalog params={params} />
            </section>
            <footer style={{position:"relative",width:"100%",bottom:"0"}}>
                <FooterMobileSCK params={params} />
                <FooterSCK params={params} />
            </footer>
          </Flex>
        </ProvidersClient>
      </ProvidersServer>
    </>
  );
}

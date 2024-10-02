"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterMobileSCK } from "@/features/FooterMobileSCK";
import { FooterSCK } from "@/features/FooterSCK";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Populates } from "@/shared/types/populates";

import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Login } from "@/widgets/Login";
import { Sale } from "@/widgets/Sale";
import { Flex } from "antd";
export default async function LoginPage({ params }: { params: any }) {
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

  const PopularProductsByIds = `by_ids/${fetchPopulates
    .flatMap((i: Populates) => i.products)
    .join(",")}`;
  const UrlApiPopularProductsByIds = UrlApi.getProducts + PopularProductsByIds;
  const UrlApiWithDomainPopularProductsByIds =
    UrlApiWithDomain.getProducts + PopularProductsByIds;
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
          <Flex vertical={true} gap={"15px"}>
            <HeaderSCK params={params}/>
            <section>
              <Login params={params} />
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

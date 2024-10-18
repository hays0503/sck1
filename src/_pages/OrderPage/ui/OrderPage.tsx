"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterMobileSCK } from "@/features/FooterMobileSCK";
import { FooterSCK } from "@/features/FooterSCK";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Order } from "@/widgets/Order";
import { Flex } from "antd";

export async function OrderPage({ params }: { params: any }) {
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

  // const fetchBasket = await (
  //   await fetch(`${UrlApiWithDomain.getBasketApi}/${params.uuid_id}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  // ).json();

  const fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApi.getCategory]: fetchCategory,
    // [UrlApi.getBasketApi+"/"+params.uuid_id]: fetchBasket,
  };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient
          fallback={fallback}
          params={params}
        >
          <Flex vertical={true} gap={"15px"}>
            <HeaderSCK params={params}/>
            <section>
              <Order params={params} />
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
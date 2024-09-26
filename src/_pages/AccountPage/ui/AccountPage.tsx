"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterMobileSCK } from "@/features/FooterMobileSCK";
import { FooterSCK } from "@/features/FooterSCK";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Populates } from "@/shared/types/populates";
import { AccountMenu } from "@/widgets/AccountMenu";

import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Sale } from "@/widgets/Sale";
import { Flex } from "antd";

export async function AccountPage({ params }: { params: any }) {
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
        <ProvidersClient
          fallback={fallback}
          params={params}
        >
          <Flex vertical={true} gap={"15px"}>
            <HeaderSCK params={params}/>
            <section>
              <AccountMenu params={params} />
            </section>
            <footer>
                <FooterMobileSCK params={params} />
                <FooterSCK params={params} />
            </footer>
          </Flex>
        </ProvidersClient>
      </ProvidersServer>
    </>
  );
}
"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterSCK } from "@/features/FooterSCK";
import { fetchCategory, fetchCity, fetchPopularProductsByIds, fetchPopulates, UrlApiPopularProductsByIds } from "@/shared/api/fallback/fallback";
import { UrlApi} from "@/shared/api/url";
import getCityFromMockData from "@/shared/mock/getCityFromMockData";

import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Sale } from "@/widgets/Sale";
import { Flex } from "antd";

export async function MainPage({ params }: { params: any }) {

  const fallback = {
    [UrlApi.getCity]: getCityFromMockData(),//fetchCity,
    [UrlApi.getCategory]: fetchCategory,
    [UrlApi.getPopulates]: fetchPopulates,
    // [UrlApi.getProducts]: fetchProduct,
    [UrlApiPopularProductsByIds]: fetchPopularProductsByIds,
  };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient fallback={fallback} params={params}>
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

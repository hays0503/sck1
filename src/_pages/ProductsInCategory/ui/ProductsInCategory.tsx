"use server";

import { ProvidersClient } from "@/_app/providers/providersClient";
import { ProvidersServer } from "@/_app/providers/providersServer";
import { FooterSCK } from "@/features/FooterSCK";
import { fetchCategory, fetchCity } from "@/shared/api/fallback/fallback";
import { UrlApi} from "@/shared/api/url";
import getCityFromMockData from "@/shared/mock/getCityFromMockData";
import { HeaderSCK } from "@/widgets/HeaderSCK";
import { Flex } from "antd";
import React from "react";

const ProductsInCategory:React.FC<{ params: any }> = ({ params }) => {

  // const fallback = {
  //   [UrlApi.getCity]: getCityFromMockData(),//fetchCity,
  //   [UrlApi.getCategory]: fetchCategory,
  // };

  return (
    <>
      <ProvidersServer>
        <ProvidersClient 
        // fallback={fallback}
        fallback={{}}
        params={params}
        >
          <Flex vertical={true}>
            <HeaderSCK params={params} />
            <section>
              {/* <Sale params={params} /> */}
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

export default ProductsInCategory;
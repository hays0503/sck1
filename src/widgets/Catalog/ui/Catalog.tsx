"use client";
import { ProductShowcase } from "@/features/ProductShowcase";
import useFetcherProducts from "@/shared/api/fetch/product";
import { Flex } from "antd";

export default function Catalog({ params }: { params: any }) {
  const products =
    useFetcherProducts({
      as: "filter_by_cat",
      params: params.slug,
    }).data ?? [];

  const { isMobileDevice } = JSON.parse(params.mobile.value);
  const Filters = ({ params }: { params: any }) => {
    const { isMobileDevice } = JSON.parse(params.mobile.value);
    return (
      <Flex
        justify="center"
        align="center"
        style={{ width: `${isMobileDevice?"100%": "20%"}`, height: "100px", backgroundColor: "violet" }}
      >
        Место под Фильтр
      </Flex>
    );
  };

  return (
    <Flex style={{ width: "100%" }} justify="center">
      <Flex
        style={{ width: "80%", height: "100%", backgroundColor: "#f9f9f9f6" }}
        justify="center"
        vertical={isMobileDevice}
      >
        <Filters params={params} />
        <ProductShowcase params={params} products={products} />
      </Flex>
    </Flex>
  );
}

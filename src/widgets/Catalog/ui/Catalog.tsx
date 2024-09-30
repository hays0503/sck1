"use client";
import { ProductShowcase } from "@/features/ProductShowcase";
import useFetcherProducts from "@/shared/api/fetch/product";
import { Flex } from "antd";

export default function Catalog({ params }: { params: any }) {
  const products =
    useFetcherProducts({ 
      as: "filter_by_cat",
      params: params.slug 
    }).data ?? [];

  const Filters = ({ params }: { params: any }) => {return <></>};
  const OneRow = 496;
  return (
    <Flex style={{ width: "100%" }} justify="center">
      <Flex style={{ width: "80%",height: OneRow }}>
        <Filters params={params} />
        <ProductShowcase params={params} products={products}/>
      </Flex>
    </Flex>
  );
}

"use client";
import { Body } from "@/features/CardInfoComponents/Body/ui";
import { Breadcrumbs } from "@/features/CardInfoComponents/Header/Breadcrumbs";
import useFetcherCategory from "@/shared/api/fetch/categoty";
import useFetcherProducts from "@/shared/api/fetch/product";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
  selectDataByLangProducts,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Divider, Flex } from "antd";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function ProductDetailCard({ params }: { params: any }) {
  const { slug } = params;
  // @ts-ignore return ProductsDetail
  const productData:ProductsDetail = useFetcherProducts({ as: "by_slug", params: slug }).data!;

  const localActive = useLocale();
  return (
    <>
      <Flex
        vertical={true}
        align="center"
        style={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          marginTop: "25px",
        }}
        gap={"15px"}
      >
        <Flex gap={"5px"} style={{ width: "80%", marginTop: "25px",  }} vertical>
          <Breadcrumbs product={productData}/>
          <Divider />
          <h1>{selectDataByLangProducts(productData, localActive)}</h1>
          <Body product={productData} params={params}/>
        </Flex>
      </Flex>
    </>
  );
}

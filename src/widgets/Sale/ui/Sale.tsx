"use client";
import { ShopWindow } from "@/features/ShopWindow";
import useFetcherPopulates from "@/shared/api/fetch/populates";
import useFetcherProducts from "@/shared/api/fetch/product";
import { Populates } from "@/shared/types/populates";
import { Products } from "@/shared/types/products";
import { Button, Flex } from "antd";
import { useTranslations } from "next-intl";

export default function Sale({ params }: { params: any }) {
  const idPopularProducts: Populates[] = useFetcherPopulates().data ?? [];
  const temp = idPopularProducts
    .flatMap((i: Populates) => i.products)
    .join(",");
  const Products: Products[] =
    useFetcherProducts({ as: "by_ids", params: temp }).data ?? [];

  const t = useTranslations();

  return (
    <Flex vertical={true} gap={"25px"} justify="center" align="center">
      {/* Заголовок */}
      <Flex
        vertical={true}
        gap={"15px"}
        style={{
          width: "80%",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "24px",
            letterSpacing: "-1.3%",
            alignContent: "center",
          }}
        >
          {t('akcii')}
        </h1>

        <h2
          style={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            letterSpacing: "0.013em",
            alignContent: "left",
          }}
        >
          {t('uspei-kupit-vygodno')}
        </h2>
      </Flex>
      {/* Витрина */}
      <ShopWindow params={{}} products={Products} />
      <Button
        type="dashed"
        size="large"
      >
        {t("Vse-aktsionnyye-tovary")}
      </Button>
    </Flex>
  );
}

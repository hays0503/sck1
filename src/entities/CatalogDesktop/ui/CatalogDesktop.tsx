"use client";
import { Divider, Flex, Popover } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";
import styles from "./CatalogDesktop.module.scss";
import CatalogNavigation from "./CatalogNavigation";
import useFetcherCategory from "@/shared/api/fetch/categoty";

export default function CatalogDesktop({ params }: { params: any }) {
  const CatalogStyleText: CSSProperties = {
    color: "white",
    padding: "12px 20px 12px 16px",
  };
  
  const t = useTranslations();
  const CategoriesData = useFetcherCategory().data??[]; 





  return (
    <>
      <Popover
        placement="topLeft"
        title={t("catalog")}
        content={<>
          <CatalogNavigation params={params} CategoriesData={CategoriesData}/>
        </>}
        arrow={false}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            borderRadius: "4px",
            backgroundColor: "#3F54CF",
          }}
        >
          <div className={styles.animationHover}></div>
          <Divider
            type="vertical"
            dashed={true}
            plain={true}
            style={{ borderColor: "white", height: "36px" }}
          />
          <Flex justify="center" align="center">
            <span style={CatalogStyleText}>{t("catalog")}</span>
          </Flex>
        </Flex>
      </Popover>
    </>
  );
}

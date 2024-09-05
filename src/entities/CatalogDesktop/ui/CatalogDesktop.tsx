"use client";
import { Divider, Flex, Popover } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties, useState } from "react";
import styles from "./CatalogDesktop.module.scss";
import CatalogNavigation from "./CatalogNavigation";
import useFetcherCategory from "@/shared/api/fetch/categoty";
import { CatalogSubMenu } from "./CatalogSubMenu";
import { Category } from "@/shared/types/category";

export default function CatalogDesktop({ params }: { params: any }) {
  const CatalogStyleText: CSSProperties = {
    color: "white",
    padding: "12px 20px 12px 16px",
  };

  const t = useTranslations();
  const CategoriesData = useFetcherCategory().data ?? [];
  const [selectCategory, setSelectCategory] = useState<Category>(CategoriesData[0]);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Popover
        trigger="click"
        placement="topLeft"
        overlayStyle={{
          left: "0px",
          width: "100dvw",
          height: "100dvh",
          overflow: "auto",
          position: "fixed",
          // border: "1px solid #3F54CF",
        }}
        content={
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100dvh",
            }}
          >
            <CatalogNavigation
              params={params}
              CategoriesData={CategoriesData}
              HoveredElement={selectCategory}
              setHoveredElement={setSelectCategory}
              style={{
                width: "30%",
                height: "100%",
                // border: "1px solid #3F54CF",
              }}
            />
            <CatalogSubMenu
              Categories={selectCategory.children}
            />
          </div>
        }
        arrow={false}
        onOpenChange={() => {setIsOpen(!isOpen)}}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            borderRadius: "4px",
            backgroundColor: "#3F54CF",
          }}
        >
          <div className={isOpen?styles.animationHoverOn:styles.animationHoverOff}></div>
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

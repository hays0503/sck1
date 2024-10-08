"use client";
import { Divider, Flex } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties, useState } from "react";
import styles from "./CatalogDesktop.module.scss";
import { CatalogPopover } from "@/shared/ui/Components/CatalogPopover";
import { Category } from "@/shared/types/category";

export default function CatalogDesktop({
  params,
  CategoriesData,
  selectCategory,
  setSelectCategory,
}: {
  params: any;
  CategoriesData: Category[];
  selectCategory: Category;
  setSelectCategory: (data: Category) => void;
}) {

  const {isMobileDevice} = JSON.parse(params.mobile.value);


  const CatalogStyleText: CSSProperties = {
    color: "white",
    padding: "12px 20px 12px 16px",
  };

  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <CatalogPopover
        role={"catalog-popover"}
        params={params}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        CategoriesData={CategoriesData}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: "#3F54CF",
          }}
        >
          <div
            data-testid="catalog-desktop123"
            className={
              isOpen ? styles.animationHoverOn : styles.animationHoverOff
            }
          ></div>
          {
            !isMobileDevice &&
            <>
              <Divider
                type="vertical"
                dashed={true}
                plain={true}
                style={{ borderColor: "white", height: "36px" }}
              />
              <Flex justify="center" align="center">
                <span style={CatalogStyleText}>{t("catalog")}</span>
              </Flex>
            </>
          }
        </Flex>
      </CatalogPopover>
    </>
  );
}

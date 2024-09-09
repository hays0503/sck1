"use client";
import { AccountButton } from "@/entities/AccountButton";
import { BasketButton } from "@/entities/BasketButton";
import { CatalogDesktop } from "@/entities/CatalogDesktop";
import { LogoSCK } from "@/entities/LogoSCK";
import { MenuWithOverflow } from "@/entities/MenuWithOverflow";
import { SearchLine } from "@/entities/SearchLine";
import useFetcherCategory from "@/shared/api/fetch/categoty";
import { Category } from "@/shared/types/category";
import { Flex } from "antd";
import { CSSProperties, useEffect, useState } from "react";

export default function HeaderMenu({ params,style }: { params: any,style:CSSProperties }) {
  const CategoriesData = useFetcherCategory().data ?? [];
  const [selectCategory, setSelectCategory] = useState<Category>(CategoriesData[6]); 
  useEffect(() => {}, [CategoriesData]);
  return (
    <>
      <Flex gap={"15px"} vertical={true} style={style}>
      <Flex gap={"10px"} align="center">
        <LogoSCK params={params} />
        <CatalogDesktop
         params={params} 
         CategoriesData={CategoriesData}
         selectCategory={selectCategory}
         setSelectCategory={setSelectCategory}/>
        <SearchLine params={params} />
        <AccountButton/>
        <BasketButton/>
      </Flex>
      <Flex>
        <MenuWithOverflow selectCategory={selectCategory}/>
      </Flex>

      </Flex>
    </>
  );
}

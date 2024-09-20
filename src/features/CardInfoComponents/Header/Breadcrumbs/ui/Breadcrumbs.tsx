import React from 'react';
import { Breadcrumb } from 'antd';
import useFetcherCategory from "@/shared/api/fetch/categoty";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
  selectDataByLangProducts,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Breadcrumbs({ product }: { product: ProductsDetail }) {
  const AllCategory: Category[] = useFetcherCategory().data!;
  
  // @ts-ignore return Category[] 
  const breadcrumbs: Category[] = findRootAndDescendants(
    AllCategory,
    product?.category?.id
  );

  const localActive = useLocale();

  // Формируем массив items для компонента Breadcrumb
  const breadcrumbItems = breadcrumbs.map((category) => ({
    title: (
      <Link href={`#`}>
        <span style={{ color: 'black' }}>
          {selectDataByLangCategory(category, localActive)}
        </span>
      </Link>
    ),
  }));

  // Добавляем продукт в конец цепочки
  breadcrumbItems.push({
    title: (
      <span style={{ color: 'black' }}>
        {selectDataByLangProducts(product, localActive)}
      </span>
    ),
  });

  return (
    <Breadcrumb
      separator="/"
      items={breadcrumbItems}
    />
  );
}

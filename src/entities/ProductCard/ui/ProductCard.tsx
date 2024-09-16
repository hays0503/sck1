"use client";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";
import { Products } from "@/shared/types/products";
import { Button, Flex } from "antd";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import useBasket from "@/shared/hook/useBasket";

export default function ProductCard({ product }: { product: Products }) {
  const localeActive = useLocale();
  const t = useTranslations();
  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city;

  
  const { add } = useBasket();

  if (product === null) return null;
  if (currentCityRU === undefined) return null;
  if (product?.price?.[currentCityRU] === undefined) return null;

  const price = product?.price?.[currentCityRU];
  const old_price_product = product?.old_price_p?.[currentCityRU];
  const old_price_category = product?.old_price_c?.[currentCityRU];
  const old_price = old_price_product || old_price_category;

  const discount_amount_product = product?.discount_amount_p;
  const discount_amount_category = product?.discount_amount_c;
  const discount = discount_amount_product || discount_amount_category;

  return (
    <div
      style={{
        height: "486px",
        width: "232px",
        border: "1px solid #F4F4F4", //Убрать потом
      }}
    >
      <Flex vertical={true} gap={"10px"}>
        <div className={styles.ProductCardContainer}>
          <span className={styles.ProductCardContainerText}>
            Рассрочка + Кэшбек
          </span>
        </div>
        <div
          style={{
            position: "relative",
            width: "232px",
            height: "230px",
          }}
        >
          <Image
            alt="product"
            src={product.list_url_to_image[0]}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className={styles.ProductCardContainerTitle}>
          {selectDataByLangProducts(product, localeActive)}
        </div>
        <Flex gap={"5px"} align={"center"}>
          <Flex gap={"5px"} align={"center"}>
            <Image alt="star" src="/star.svg" width={20} height={20} />
            <span className={styles.ProductCardContainerStar}>
              {product.average_rating ?? 0}
            </span>
          </Flex>
          <Flex gap={"5px"} align={"center"}>
            <span className={styles.ProductCardContainerComments}>
              {product.reviews_count ?? 0}
            </span>
            <span className={styles.ProductCardContainerComments}>Отзыва</span>
          </Flex>
        </Flex>
        <Flex gap={5}>
          <span className={styles.ProductCardContainerPrice}>
            {beautifulCost(price)}
          </span>

          {old_price && (
            <>
              <s className={styles.ProductCardContainerOldPrice}>
                {beautifulCost(old_price)}
              </s>
              <div className={styles.ProductCardContainerDiscount}>
                <span>{`-${discount}%`}</span>
              </div>
            </>
          )}

        </Flex>
        <Button className={styles.ProductCardContainerAddToCartButton}
        onClick={()=>{
          add({id_prod:product.id});
        }}
        >
          <Image alt="cart" src="/cart.svg" width={20} height={20} />
          <span className={styles.ProductCardContainerAddToCartButtonText}>
            {t("v-korzinu")}
          </span>
        </Button>
      </Flex>
    </div>
  );
}

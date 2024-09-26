"use client";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";
import { Products } from "@/shared/types/products";
import { Button, Flex } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import beautifulCost from "@/shared/tools/beautifulCost";
import
{ message }
from
"antd"
;

import { useBasketMutate } from "@/shared/hook/useBasket";
import { useLocalStorage } from "usehooks-ts";

export default function ProductCard({
  product,
  params,
  currentCityRU,
}: {
  product: Products;
  params: any;
  currentCityRU: string;
}) {
  const localeActive = useLocale();
  const t = useTranslations();

  const [messageApi, contextHolder] = message.useMessage();

  const { add, GiftDialog } = useBasketMutate({ product: product });

  const [FavoritesProduct,setFavoritesProduct] = useLocalStorage<number[]>("FavoritesProduct", []);

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
    <>
      {GiftDialog}
      {contextHolder}
      <div className={styles.ProductCardRoot}>
        <Flex
          vertical={true}
          justify="space-between"
          align="center"
          style={{ height: "100%" }}
        >
          <div className={styles.ProductCardContainer}>
            <span className={styles.ProductCardContainerText}>
              Рассрочка + Кэшбек
            </span>
          </div>
          <a
            href={`/${localeActive}/${params.city}/product/${product.slug}`}
            // replace={true}
            // shallow={true}
          >
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "230px",
              }}
            >
              <Image
                alt="product"
                src={product.list_url_to_image[0]}
                fill
                style={{
                  objectFit: "scale-down",
                }}
              />
            </div>
          </a>
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
              <span className={styles.ProductCardContainerComments}>
                Отзыва
              </span>
            </Flex>
          </Flex>
          <Flex gap={5} justify="space-evenly">
            <span className={styles.ProductCardContainerPrice}>
              {beautifulCost(price)}
            </span>

            {old_price && (
              <Flex vertical>
                <s className={styles.ProductCardContainerOldPrice}>
                  {beautifulCost(old_price)}
                </s>
                <div className={styles.ProductCardContainerDiscount}>
                  <span>{`-${discount}%`}</span>
                </div>
              </Flex>
            )}
          </Flex>
          <Flex justify="space-evenly" align="center" style={{ width: "100%" }}>
            <Button
              className={styles.ProductCardContainerAddToCartButton}
              onClick={() => {
                add({ id_prod: product.id });
              }}
            >
              <Image alt="cart" src="/cart.svg" width={20} height={20} />
              <span className={styles.ProductCardContainerAddToCartButtonText}>
                {t("v-korzinu")}
              </span>
            </Button>

            <Button icon={<HeartOutlined />} style={{ width: "40px", height: "40px" }}
              onClick={() => {
                setFavoritesProduct([...FavoritesProduct, product.id]);
                messageApi.open({
                  type: 'success',
                  content: `${t("dodano-v-favoritki")} ${selectDataByLangProducts(product, localeActive)}`,
                });
              }}
            />
          </Flex>
        </Flex>
      </div>
    </>
  );
}

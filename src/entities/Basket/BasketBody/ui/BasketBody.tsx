import { useBasketMutate, useBasketView } from "@/shared/hook/useBasket";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import { iBasketItem } from "@/shared/types/basket";
import { Products } from "@/shared/types/products";
import { Button, Divider, Flex, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

const { Text, Title, Paragraph } = Typography;

export default function BasketBody({params}: {params: any}) {
  const {
    get: { basketGet },
  } = useBasketView();

  const localActive = useLocale();

  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city!;

  const t = useTranslations();

  const Item = ({
    product,
    item,
  }: {
    product: Products;
    item: iBasketItem;
  }) => {
    const t = useTranslations();
    const { increase, remove } = useBasketMutate({ product: product });
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

    const buttons = (
      <>
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ width: "20px", height: "40px" }}
        >
          <Button
            size="small"
            style={{ width: "20px", height: "20px" }}
            onClick={(e: any) => {
              increase({ id_prod: product.id });
            }}
          >
            +
          </Button>
          <Button
            size="small"
            style={{ width: "20px", height: "20px" }}
            onClick={(e: any) => {
              remove({ id_prod: product.id });
            }}
          >
            -
          </Button>
        </Flex>
      </>
    );

    const picture = (
      <Flex
        justify="center"
        align="center"
        style={{ width: "50px", height: "50px", padding: "5px" }}
      >
        <Image
          src={product.list_url_to_image[0]}
          alt={product.name_product}
          width={45}
          height={45}
          style={{
            objectFit: "scale-down",
          }}
        />
      </Flex>
    );

    const text = (
      <div style={{ width: "165px" }}>
        <a
          href={`/${localActive}/product/${product.slug}`}
          style={{ cursor: "pointer" }}
        >
          <Paragraph
            ellipsis={{
              rows: 3,
            }}
          >
            {product.name_product}
          </Paragraph>
        </a>
      </div>
    );

    const discount_text = (
      <span
        style={{
          textAlign: "center",
          width: "50px",
          height: "20px",
          fontSize: "12px",
          color: "white",
          padding: "2px",
          borderRadius: "5px",
          backgroundColor: "red",
        }}
      >{`-${discount} %`}</span>
    );

    const fontText: CSSProperties = {
      fontSize: "12px",
    };

    const total = ({ price, sale }: { price: number; sale?: boolean }) => (
      <Flex>
        <Text strong={!sale} disabled={sale} style={fontText}>
          {`${sale ? t("new-cost") : t("cost")} ${beautifulCost(price)} * ${
            item.count
          } = ${beautifulCost(price * item.count)}`}
        </Text>
      </Flex>
    );

    return (
      <>
        {old_price ? (
          <Flex
            vertical
            // style={{ width: "300px" }}
          >
            <Flex
              justify="flex-start"
              align="center"
              style={{
                // width: "300px",
                backgroundColor: "whitesmoke",
              }}
            >
              {buttons}
              {picture}
              {text}
              {discount_text}
            </Flex>
            <Flex vertical>
              {total({ price: old_price, sale: true })}
              {total({ price: price, sale: false })}
            </Flex>
          </Flex>
        ) : (
          <div
          // style={{ width: "300px" }}
          >
            <Flex
              justify="flex-start"
              align="center"
              // style={{ width: "100%" }}
            >
              {buttons}
              {picture}
              {text}
            </Flex>
            {total({ price: price, sale: false })}
          </div>
        )}
        <Divider />
      </>
    );
  };

  const isEmpty = basketGet?.basket_items?.length === 0;

  const badge =
    basketGet?.basket_items?.reduce(
      (a: number, b: iBasketItem) =>
        a + b.count * (b?.prod?.price?.[currentCityRU] ?? 0),
      0
    ) ?? 0;

  const uuid_id = JSON.parse(window.localStorage.getItem("uuid_id") ?? "{}");

  return (
    <>
      <Flex
        // style={{ width: "320px" }}
        style={{ width: "100%", height: "100%" }}
        vertical
        justify="space-between"
        gap={10}
      >
        {isEmpty ? <>Товары отсутствуют в корзине</> : <>Корзина</>}
        {!isEmpty && (
          <>
            <Flex
              style={{
                // width: "320px",
                height: "300px",
                overflow: "auto",
                scrollbarWidth: "thin",
              }}
              vertical
              gap={10}
            >
              {basketGet?.basket_items?.map((item: iBasketItem) => (
                <Flex key={item.prod_id} vertical>
                  <Item product={item.prod} item={item} />
                </Flex>
              ))}
            </Flex>
            <Flex align="baseline" justify="space-between">
              <Title level={5}>{t("total")}</Title>
              <Title level={5}>
                {beautifulCost(
                  basketGet?.basket_items?.reduce(
                    (a: number, b: iBasketItem) =>
                      a + b.count * (b?.prod?.price?.[currentCityRU] ?? 0),
                    0
                  ) ?? 0
                )}
              </Title>
            </Flex>            
          </>
        )}
      </Flex>
    </>
  );
}

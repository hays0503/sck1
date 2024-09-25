import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { UrlApi } from "../api/url";
import defaultFetcher from "../api/fetch/defaultFetcher";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import {
  deleteBasket,
  sendUpdatedBasketToServer,
  updateProductQuantity,
} from "../tools/basketManipulator";
import { ProductsDetail } from "../types/productsDetail";
import { Flex, Modal } from "antd";
import useFetcherProducts from "../api/fetch/product";
import { Products } from "../types/products";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GiftOutlined } from "@ant-design/icons";
import { iBasketItem } from "../types/basket";

// Хук для управления корзиной
const useBasketMutate = ({
  product,
}: {
  product?: ProductsDetail | Products;
}) => {
  const [value, setValue] = useLocalStorage("uuid_id", uuidv4);
  const [showGiftDialog, setShowGiftDialog] = useState<{
    isShow: boolean;
    id_prod: number | null;
  }>({ isShow: false, id_prod: null });

  useEffect(() => {
    if (window && window.localStorage.getItem("uuid_id") === null) {
      setValue(value);
    }
  }, []);

  const {
    data: basketGet,
    error: basketError,
    mutate: basketMutate,
  } = useSWR(`${UrlApi.getBasketApi}/${value}`, defaultFetcher);

  const GiftDialogComponent = () => {
    const t = useTranslations();

    // @ts-ignore
    const productsDetail: ProductsDetail = useFetcherProducts({
      as: "by_slug",
      params: product?.slug,
    }).data;

    if (productsDetail?.present.length === 0) {
      setShowGiftDialog({ isShow: false, id_prod: null });
      addOrRemoveProduct({ id_prod: productsDetail?.id, delta: 1 });
      return null;
    }

    return (
      <Modal
        open={showGiftDialog.isShow}
        onCancel={() => setShowGiftDialog({ isShow: false, id_prod: null })}
        footer={null}
        width={"100%"}
      >
        <Flex vertical gap={10}>
          <h1 style={{ fontWeight: "bold" }}>
            {t("vyberite-podarok")} <GiftOutlined />
          </h1>
          <ul
            style={{ listStyleType: "none", overflow: "auto", height: "50dvh" }}
          >
            {productsDetail?.present.map((gift, index) => (
              <li key={index} style={{ margin: "10px" }}>
                <Flex
                  className="hover-element"
                  gap={5}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    border: "1px solid #0000002f",
                  }}
                  onClick={() => {
                    setShowGiftDialog({ isShow: false, id_prod: null });
                    addOrRemoveProduct({
                      id_prod: productsDetail?.id,
                      id_gift: gift?.id,
                      delta: 1,
                    });
                  }}
                >
                  <Image
                    src={gift?.list_url_to_image[0]}
                    width={100}
                    height={100}
                    style={{ objectFit: "scale-down" }}
                    alt={gift?.name_product}
                  />
                  <span>{gift?.name_product}</span>
                </Flex>
              </li>
            ))}
          </ul>
        </Flex>
      </Modal>
    );
  };

  const addOrRemoveProduct = async ({
    id_prod,
    id_gift,
    delta,
  }: {
    id_prod: number;
    id_gift?: number;
    delta: number;
  }) => {
    if (!id_prod) return;

    const oldBasket = basketGet?.basket_items || [];

    // Обновляем корзину локально
    const newBasket = updateProductQuantity({
      basketItems: oldBasket,
      id_prod,
      id_gift,
      delta,
    });

    // Отправляем обновленную корзину на сервер и обновляем данные
    const result = await sendUpdatedBasketToServer(newBasket, value);
    basketMutate(result); // Оптимистичное обновление

    return result;
  };

  return {
    updateQuantity: addOrRemoveProduct,
    add: (params: { id_prod: number }) => {
      if (product) {
        if (product.present.length > 0) {
          setShowGiftDialog({ isShow: true, id_prod: params.id_prod });
        } else {
          addOrRemoveProduct({ ...params, delta: 1 });
        }
      }
    },
    increase: (params: { id_prod: number }) => {
      const increaseProduct = basketGet?.basket_items?.find(
        (item: iBasketItem) => item.prod_id === params.id_prod
      );
      if (increaseProduct.gift_id) {
        addOrRemoveProduct({
          ...params,
          id_gift: increaseProduct.gift_id,
          delta: 1,
        });
      } else {
        addOrRemoveProduct({ ...params, delta: 1 });
      }
    },
    remove: (params: { id_prod: number }) => {
      if (
        basketGet?.basket_items.reduce(
          (acc: number, item: iBasketItem) => acc + item.count,
          0
        ) === 1
      ) {
        deleteBasket({ uuid_id: value });
        basketMutate({ uuid_id: value, basket_items: [] });
      } else {
        addOrRemoveProduct({ ...params, delta: -1 });
      }
    },
    get: { basketGet, basketError, basketMutate },
    GiftDialog: <>{showGiftDialog.isShow && <GiftDialogComponent />}</>,
  };
};

const useBasketView = () => {
  const [value, setValue] = useLocalStorage("uuid_id", uuidv4);
  const [showGiftDialog, setShowGiftDialog] = useState<{
    isShow: boolean;
    id_prod: number | null;
  }>({ isShow: false, id_prod: null });

  useEffect(() => {
    if (window && window.localStorage.getItem("uuid_id") === null) {
      setValue(value);
    }
  }, []);

  const {
    data: basketGet,
    error: basketError,
    isLoading: basketIsLoading,
    mutate: basketMutate,
  } = useSWR(`${UrlApi.getBasketApi}/${value}`, defaultFetcher);

  return {
    get: { basketGet },
    isLoading: { basketIsLoading },
  };
};

export { useBasketMutate, useBasketView };

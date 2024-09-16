import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { UrlApi } from "../api/url";
import useSWR, { mutate } from "swr";
import { iBasket, iBasketItem } from "../types/basket";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useBasket = () => {
  const [value, setValue, removeValue] = useLocalStorage("uuid_id", uuidv4);

  useEffect(() => {
    if(window){
        if(window.localStorage.getItem('uuid_id') === null){
            setValue(value);
        }
    }
  }, []);

  const {
    data: basketGet,
    error: basketError,
    mutate: basketMutate,
  }: {
    data: iBasket | null | undefined;
    error: any;
    mutate: any;
  } = useSWR(`${UrlApi.getBasketApi}/${value}`, fetcher);

  return {
    add: ({ id_prod, id_gift }: { id_prod: number; id_gift?: number|undefined }) => {
      // Заградительное условие не указан id продукта
      if (!id_prod) return;
      let newBasket: iBasketItem[] = [];
      // Если в корзине уже есть продукт
      if (basketGet?.basket_items) {
        // Берем товары из корзины
        const oldBasket = basketGet?.basket_items;
        // Проверяем есть ли уже такой продукт в корзине
        const haveProd = oldBasket?.find((item) => item.prod_id === id_prod);
        // Подготовка новой корзины

        // Такой продукт есть
        if (haveProd) {
          // Проходим по всем товарам в корзине старой и изменяем его
          newBasket = oldBasket.map((item) => {
            // Если есть продукт
            if (item.prod_id === id_prod) {
              // Если есть подарок
              if (id_gift) {
                return {
                  ...item,
                  count: item.count + 1,
                  gift_prod_id: id_gift,
                } as iBasketItem;
              } else {
                return { ...item, count: item.count + 1 } as iBasketItem;
              }
            } else {
              return item;
            }
          });
        } else {
          // Если нет такого продукта
          if (id_gift) {
            newBasket = [
              ...oldBasket,
              {
                prod_id: id_prod,
                count: 1,
                gift_prod_id: id_gift,
              } as iBasketItem,
            ];
          } else {
            newBasket = [
              ...oldBasket,
              { prod_id: id_prod, count: 1 } as iBasketItem,
            ];
          }
        }
      } else {
        if (id_gift) {
          newBasket = [
            {
              prod_id: id_prod,
              count: 1,
              gift_prod_id: id_gift,
            } as iBasketItem,
          ];
        } else {
          newBasket = [{ prod_id: id_prod, count: 1 } as iBasketItem];
        }
      }

      const result = fetch(`${UrlApi.getBasketApi}/create_or_update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid_id: value,
          basket_items: newBasket,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log("console.log(data)", data);
          // Оптимистичные обновления
          basketMutate(data);
          return data;
        });
      return result;
    },
    remove: () => {},
    get: { basketGet, basketError, basketMutate },
  };
};

export default useBasket;

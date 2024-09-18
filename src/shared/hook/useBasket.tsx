import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { UrlApi } from "../api/url";
import defaultFetcher from "../api/fetch/defaultFetcher";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { sendUpdatedBasketToServer, updateProductQuantity } from "../tools/basketManipulator";



// Хук для управления корзиной
const useBasket = () => {
  const [value, setValue] = useLocalStorage("uuid_id", uuidv4);

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
    add: (params: { id_prod: number; id_gift?: number }) =>
      addOrRemoveProduct({ ...params, delta: 1 }), // Увеличение на 1
    remove: (params: { id_prod: number }) =>
      addOrRemoveProduct({ ...params, delta: -1 }), // Уменьшение на 1
    get: { basketGet, basketError, basketMutate },
  };
};

export default useBasket;

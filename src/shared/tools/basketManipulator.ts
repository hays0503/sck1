import { UrlApi } from "../api/url";
import { iBasketItem } from "../types/basket";

// Если продукта нет, создаем новый элемент корзины, но только если delta > 0
const createNewProduct = (
  delta: number,
  id_prod: number,
  id_gift?: number
): iBasketItem | null => {
  if (delta <= 0) return null; // Не создаем продукт, если операция уменьшает количество
  return {
    prod_id: id_prod,
    count: 1,
    ...(id_gift && { gift_prod_id: id_gift }),
  } as iBasketItem;
};

// Если продукт уже есть в корзине, обновляем количество
const updateProduct = (
  product: iBasketItem,
  delta: number,
  id_gift?: number
): iBasketItem => {
  const newCount = product.count + delta;

  // Если количество меньше 1, удаляем продукт из корзины
  //@ts-ignore
  if (newCount <= 0) return null;

  const updatedProduct = {
    ...product,
    count: newCount,
  };
  if (id_gift) {
    updatedProduct.gift_prod_id = id_gift;
  }
  return updatedProduct;
};

// Чистая функция для обновления количества товаров в корзине
const updateProductQuantity = ({
  basketItems,
  id_prod,
  id_gift,
  delta,
}: {
  basketItems: iBasketItem[];
  id_prod: number;
  id_gift?: number;
  delta: number;
}): iBasketItem[] => {
  const existingProduct = basketItems.find((item) => item.prod_id === id_prod);

  // Формируем новую корзину, исключая продукты с count <= 0
  const newBasket = existingProduct
    ? basketItems
        .map((item) =>
          item.prod_id === id_prod ? updateProduct(item, delta, id_gift) : item
        )
        .filter((item) => item !== null)
    : [...basketItems, createNewProduct(delta, id_prod, id_gift)].filter(
        (item) => item !== null
      );

  return newBasket as iBasketItem[];
};

// Функция для отправки обновленной корзины на сервер
const sendUpdatedBasketToServer = async (
  basketItems: iBasketItem[],
  uuid_id: string
) => {
  const response = await fetch(`${UrlApi.getBasketApi}/create_or_update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid_id,
      basket_items: basketItems,
    }),
  });

  const data = await response.json();
  return data;
};

export { createNewProduct, updateProduct, updateProductQuantity, sendUpdatedBasketToServer };

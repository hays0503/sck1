import { expect, jest, describe, beforeEach, it } from "@jest/globals";
import { createNewProduct, sendUpdatedBasketToServer, updateProduct, updateProductQuantity } from "../basketManipulator";
import { iBasketItem } from "@/shared/types/basket";
import { UrlApi } from "@/shared/api/url";
import { Products } from "@/shared/types/products";

// Пример продукта для тестов

const mockProduct: iBasketItem = {
  count: 1,
  price: 100,
  prod_id: 1,
  //@ts-ignore
  prod: { id: 1, name_product: "Product 1", price: {"Астана": 100} } as Products, // Пример объекта продукта
  name: "Product 1",
  slug: "product-1",
  url: "/product-1",
  urlapi: "/api/product-1",
  gift_prod_id: 0,
};

const mockProduct2: iBasketItem = {
  count: 2,
  price: 200,
  prod_id: 2,
  //@ts-ignore
  prod: { id: 2, name_product: "Product 2", price: {"Астана": 200} } as Products, // Пример объекта продукта
  name: "Product 2",
  slug: "product-2",
  url: "/product-2",
  urlapi: "/api/product-2",
  gift_prod_id: 0,
};

describe("Basket functions", () => {
  // Тестирование createNewProduct
  test("createNewProduct should return a new product if delta > 0", () => {
    const newProduct = createNewProduct(1, 1, 2);
    expect(newProduct).toEqual({
      prod_id: 1,
      count: 1,
      gift_prod_id: 2,
    });
  });

  test("createNewProduct should return null if delta <= 0", () => {
    const newProduct = createNewProduct(0, 1);
    expect(newProduct).toBeNull();
  });

  // Тестирование updateProduct
  test("updateProduct should update product count and return new object", () => {
    const updatedProduct = updateProduct(mockProduct, 1);
    expect(updatedProduct.count).toBe(2); // Увеличено на 1
  });

  test("updateProduct should remove product if count becomes <= 0", () => {
    const updatedProduct = updateProduct(mockProduct, -1);
    expect(updatedProduct).toBeNull(); // Продукт должен быть удален
  });

  // Тестирование updateProductQuantity
  test("updateProductQuantity should update quantity if product exists", () => {
    const basketItems = [mockProduct];
    const updatedBasket = updateProductQuantity({
      basketItems,
      id_prod: 1,
      delta: 1,
    });
    expect(updatedBasket.length).toBe(1);
    expect(updatedBasket[0].count).toBe(2); // Увеличено на 1
  });

  test("updateProductQuantity should remove product if quantity goes to 0", () => {
    const basketItems = [mockProduct];
    const updatedBasket = updateProductQuantity({
      basketItems,
      id_prod: 1,
      delta: -1,
    });
    expect(updatedBasket.length).toBe(0); // Продукт удален
  });

  test("updateProductQuantity should add a new product if it does not exist", () => {
    const basketItems: iBasketItem[] = [];
    const updatedBasket = updateProductQuantity({
      basketItems,
      id_prod: 1,
      delta: 1,
    });
    expect(updatedBasket.length).toBe(1);
    expect(updatedBasket[0].prod_id).toBe(1);
    expect(updatedBasket[0].count).toBe(1); // Продукт добавлен с количеством 1
  });

  // Мокирование глобального fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  ) as jest.Mock;

  // Тестирование sendUpdatedBasketToServer
  test("sendUpdatedBasketToServer should send correct request and return response data", async () => {
    const basketItems = [mockProduct];
    const uuid_id = "test-uuid";

    const result = await sendUpdatedBasketToServer(basketItems, uuid_id);

    expect(fetch).toHaveBeenCalledWith(
      `${UrlApi.getBasketApi}/create_or_update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid_id,
          basket_items: basketItems,
        }),
      }
    );

    expect(result).toEqual({ success: true });
  });

  test("createNewProduct should include gift_prod_id when id_gift is provided", () => {
    const newProduct = createNewProduct(1, 1, 5);
    expect(newProduct).toEqual({
      prod_id: 1,
      count: 1,
      gift_prod_id: 5,
    });
  });

  test("updateProduct should include gift_prod_id when id_gift is provided", () => {
    const newProduct = updateProduct(mockProduct, 1, 5);
    expect(newProduct).toEqual(    {
      count: 2,
      price: 100,
      prod_id: 1,
      prod: { id: 1, name_product: 'Product 1', price: { 'Астана': 100 } },
      name: 'Product 1',
      slug: 'product-1',
      url: '/product-1',
      urlapi: '/api/product-1',
      gift_prod_id: 5
    });
  });

  test("updateProductQuantity should update the product when prod_id matches", () => {
    const basketItems = [mockProduct];
    const updatedBasket = updateProductQuantity({
      basketItems,
      id_prod: 1, // Совпадает с prod_id в mockProduct
      delta: 1,
    });
  
    expect(updatedBasket.length).toBe(1);
    expect(updatedBasket[0].prod_id).toBe(1);
    expect(updatedBasket[0].count).toBe(2); // Количество увеличено на 1
  });

  test("updateProductQuantity should add a new product when prod_id does not match", () => {
    const basketItems = [mockProduct]; // prod_id = 1
    const updatedBasket = updateProductQuantity({
      basketItems,
      id_prod: 2, // Не совпадает с prod_id в mockProduct
      delta: 1,
    });
  
    expect(updatedBasket.length).toBe(2); // В корзине теперь два продукта
    expect(updatedBasket[0].prod_id).toBe(1); // Первый продукт остается без изменений
    expect(updatedBasket[0].count).toBe(1); // Количество у первого продукта не изменилось
  
    expect(updatedBasket[1].prod_id).toBe(2); // Второй продукт был добавлен
    expect(updatedBasket[1].count).toBe(1); // Новый продукт добавлен с количеством 1
  });

  test("updateProductQuantity should remove product if quantity becomes <= 0 and leave others unchanged", () => {
    const basketItems = [mockProduct, mockProduct2]; // prod_id = 1 и prod_id = 2
    const updatedBasket = updateProductQuantity({
      basketItems,
      id_prod: 1, // Совпадает с prod_id в mockProduct1
      delta: -1, // Уменьшает количество mockProduct1 до 0
    });

    expect(updatedBasket.length).toBe(1); // Оставшийся элемент в корзине
    expect(updatedBasket.find(item => item.prod_id === 1)).toBeUndefined(); // mockProduct1 удален
    expect(updatedBasket.find(item => item.prod_id === 2)?.count).toBe(2); // Количество mockProduct2 осталось неизменным
  });
  
  
  
});

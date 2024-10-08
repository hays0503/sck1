import { expect, jest, test, describe } from "@jest/globals";
import {
  selectDataByLangCategory,
  selectDataByLangBrands,
  selectDataByLangProducts,
  selectDataByLangDescriptionTitle,
  selectDataByLangDescriptionBody,
  selectDataByLangSpecificationName,
  selectDataByLangSpecificationValue,
  selectDataByLangCity,
  selectDataByTagProd,
} from "../selectDataByLang";
import { Category } from "@/shared/types/category";
import { Brands } from "@/shared/types/brand";
import { City, ProductsDetail } from "@/shared/types/productsDetail";
import { iDescription } from "@/shared/types/descriptionProduct";
import { NameSpecification, Specification, ValueSpecification } from "@/shared/types/specification";
import { TagProd } from "@/shared/types/products";

test("selectDataByLangCategory должен вернуть имя категории на основе текущего языка", () => {
  const category = {
    name_category: "Категория",
    additional_data: { EN: "Category", KZ: "Санат" },
  } as Category;
  expect(selectDataByLangCategory(category, "ru")).toBe("Категория");
  expect(selectDataByLangCategory(category, "en")).toBe("Category");
  expect(selectDataByLangCategory(category, "kz")).toBe("Санат");
  expect(selectDataByLangCategory(category, "undefined")).toBe(undefined);
  expect(selectDataByLangCategory(null, "ru")).toBe(undefined);
});

test("selectDataByLangBrands должен вернуть имя бренда на основе текущего языка", () => {
  const brand = {
    name_brand: "Бренд",
    additional_data: { EN: "Brand", KZ: "БрендКЗ" },
  } as Brands;
  expect(selectDataByLangBrands(brand, "ru")).toBe("Бренд");
  expect(selectDataByLangBrands(brand, "en")).toBe("Brand");
  expect(selectDataByLangBrands(brand, "kz")).toBe("БрендКЗ");
  expect(selectDataByLangBrands(brand, "undefined")).toBe(undefined);
  expect(selectDataByLangBrands(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangProducts должен вернуть имя продукта на основе текущего языка", () => {
  const product = {
    name_product: "Продукт",
    additional_data: { EN: "Product", KZ: "Өнім" },
  } as ProductsDetail;
  expect(selectDataByLangProducts(product, "ru")).toBe("Продукт");
  expect(selectDataByLangProducts(product, "en")).toBe("Product");
  expect(selectDataByLangProducts(product, "kz")).toBe("Өнім");
  expect(selectDataByLangProducts(product, "undefined")).toBe(undefined);
  expect(selectDataByLangProducts(null as any, "ru")).toBe(undefined);  
});

test("selectDataByLangDescriptionTitle должен вернуть заголовок описания на основе текущего языка", () => {
  const description = {
    title_description: "Заголовок",
    additional_data: { EN: "Title", KZ: "Атауы" },
  } as iDescription;
  expect(selectDataByLangDescriptionTitle(description, "ru")).toBe("Заголовок");
  expect(selectDataByLangDescriptionTitle(description, "en")).toBe("Title");
  expect(selectDataByLangDescriptionTitle(description, "kz")).toBe("Атауы");
  expect(selectDataByLangDescriptionTitle(description, "undefined")).toBe(
    undefined
  );
  expect(selectDataByLangDescriptionTitle(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangDescriptionBody должен вернуть тело описания на основе текущего языка", () => {
  const description = {
    body_description: "Описание",
    additional_data_to_desc: { EN: "Description", KZ: "Сипаттамасы" },
  } as iDescription;
  expect(selectDataByLangDescriptionBody(description, "ru")).toBe("Описание");
  expect(selectDataByLangDescriptionBody(description, "en")).toBe(
    "Description"
  );
  expect(selectDataByLangDescriptionBody(description, "kz")).toBe(
    "Сипаттамасы"
  );
  expect(selectDataByLangDescriptionBody(description, "undefined")).toBe(
    undefined
  );
  expect(selectDataByLangDescriptionBody(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangSpecificationName-Specification должен вернуть имя спецификации на основе текущего языка", () => {
  const specification = {
    product: {},
    name_specification: {
      name_specification: "Спецификация",
      additional_data: { EN: "Specification", KZ: "Сипаттама" },
    },
  } as Specification;
  expect(selectDataByLangSpecificationName(specification, "ru")).toBe(
    "Спецификация"
  );
  expect(selectDataByLangSpecificationName(specification, "en")).toBe(
    "Specification"
  );
  expect(selectDataByLangSpecificationName(specification, "kz")).toBe(
    "Сипаттама"
  );
  expect(selectDataByLangSpecificationName(specification, "undefined")).toBe(
    undefined
  );
  expect(selectDataByLangSpecificationName(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangSpecificationValue-Specification должен вернуть значение спецификации на основе текущего языка", () => {
  const specification = {
    product: {},
    value_specification: {
      value_specification: "Значение",
      additional_data: { EN: "Value", KZ: "Мағынасы" },
    },
  } as Specification;
  expect(selectDataByLangSpecificationValue(specification, "ru")).toBe(
    "Значение"
  );
  expect(selectDataByLangSpecificationValue(specification, "en")).toBe("Value");
  expect(selectDataByLangSpecificationValue(specification, "kz")).toBe(
    "Мағынасы"
  );
  expect(selectDataByLangSpecificationValue(specification, "undefined")).toBe(
    undefined
  );
  expect(selectDataByLangSpecificationValue(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangSpecificationName-NameSpecification должен вернуть имя спецификации на основе текущего языка", () => {
  const specification = {
    name_specification: "Спецификация",
    additional_data: { EN: "Specification", KZ: "Сипаттама" },
  } as NameSpecification;
  expect(selectDataByLangSpecificationName(specification, "ru")).toBe(
    "Спецификация"
  );
  expect(selectDataByLangSpecificationName(specification, "en")).toBe(
    "Specification"
  );
  expect(selectDataByLangSpecificationName(specification, "kz")).toBe(
    "Сипаттама"
  );
  expect(selectDataByLangSpecificationName(specification, "undefined")).toBe(
    undefined
  );
  expect(selectDataByLangSpecificationName(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangSpecificationValue должен-ValueSpecification вернуть значение спецификации на основе текущего языка", () => {
  const specification = {
    value_specification: "Спецификация",
    additional_data: { EN: "Specification", KZ: "Сипаттама" },
  } as ValueSpecification;
  expect(selectDataByLangSpecificationValue(specification, "ru")).toBe(
    "Спецификация"
  );
  expect(selectDataByLangSpecificationValue(specification, "en")).toBe("Specification");
  expect(selectDataByLangSpecificationValue(specification, "kz")).toBe(
    "Сипаттама"
  );
  expect(selectDataByLangSpecificationValue(specification, "undefined")).toBe(
    undefined
  );
  expect(selectDataByLangSpecificationValue(null as any, "ru")).toBe(undefined);
});

test("selectDataByLangSpecificationName-битые данные должны вернуть undefined", () => {
    expect(selectDataByLangSpecificationName(null, "undefined")).toBe(
      undefined
    );
    expect(selectDataByLangSpecificationName({} as Specification, "undefined")).toBe(
        undefined
    );

    expect(selectDataByLangSpecificationName({} as NameSpecification, "undefined")).toBe(
        undefined
    );
});

test("selectDataByLangSpecificationValue-битые данные должны вернуть undefined", () => {
    expect(selectDataByLangSpecificationValue(null, "undefined")).toBe(
      undefined
    );
    expect(selectDataByLangSpecificationValue({} as Specification, "undefined")).toBe(
        undefined
    );

    expect(selectDataByLangSpecificationValue({} as ValueSpecification, "undefined")).toBe(
        undefined
    );
});


test("selectDataByLangCity должен вернуть название города на основе текущего языка", () => {
  const city = {
    name_city: "Город",
    additional_data: { EN: "City", KZ: "Қала" },
  } as City;
  expect(selectDataByLangCity(city, "ru")).toBe("Город");
  expect(selectDataByLangCity(city, "en")).toBe("City");
  expect(selectDataByLangCity(city, "kz")).toBe("Қала");
  expect(selectDataByLangCity(city, "undefined")).toBe(undefined);
  expect(selectDataByLangCity(null as any, "ru")).toBe(undefined);
});

test("selectDataByTagProd должен вернуть текст тега на основе текущего языка", () => {
  const tag = {
    tag_text: "Тег",
    additional_data: { EN: "Tag", KZ: "ТегКЗ" },
  } as TagProd;
  expect(selectDataByTagProd(tag, "ru")).toBe("Тег");
  expect(selectDataByTagProd(tag, "en")).toBe("Tag");
  expect(selectDataByTagProd(tag, "kz")).toBe("ТегКЗ");
  expect(selectDataByTagProd(tag, "undefined")).toBe(undefined);
  expect(selectDataByTagProd(null as any, "ru")).toBe(undefined);
});

import { Brands } from "../types/brand";
import { Category } from "../types/category";
import { iDescription } from "../types/descriptionProduct";
import { Products, TagProd } from "../types/products";
import { ProductsDetail } from "../types/productsDetail";
import {
  NameSpecification,
  Specification,
  SpecificationNameSpecificationparams,
  ValueSpecification,
} from "../types/specification";
import { iCity } from "../types/city";

const selectDataByLangCategory = (
  object: Category | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.name_category;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return object.name_category;
  }
};

const selectDataByLangBrands = (
  object: Brands,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.name_brand;
    case "en":
      return object.additional_data.EN || object.name_brand;
    case "kz":
      return object.additional_data.KZ || object.name_brand;
    default:
      return object.name_brand;
  }
};

const selectDataByLangProducts = (
  object: ProductsDetail | Products | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.name_product;
    case "en":
      return object.additional_data.EN || object.name_product;
    case "kz":
      return object.additional_data.KZ || object.name_product;
    default:
      return object.name_product;
  }
};

const selectDataByLangDescriptionTitle = (
  object: iDescription | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.title_description;
    case "en":
      return object.additional_data.EN || object.title_description;
    case "kz":
      return object.additional_data.KZ || object.title_description;
    default:
      return object.title_description;
  }
};

const selectDataByLangDescriptionBody = (
  object: iDescription | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.body_description;
    case "en":
      return object.additional_data_to_desc.EN || object.body_description;
    case "kz":
      return object.additional_data_to_desc.KZ || object.body_description;
    default:
      return object.body_description;
  }
};

const selectDataByLangNameSpecification: SpecificationNameSpecificationparams = (
  object: Specification | NameSpecification | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
): string => {
  if (!object) return "";
  if ((<Specification>object).product) {
    switch (currentLang) {
      case "ru":
        return (<Specification>object).name_specification.name_specification;
      case "en":
        return (<Specification>object).name_specification.additional_data.EN || (<Specification>object).name_specification.name_specification;
      case "kz":
        return (<Specification>object).name_specification.additional_data.KZ || (<Specification>object).name_specification.name_specification;
      default:
        return (<Specification>object).name_specification.name_specification;
    }
  }
  if((<NameSpecification>object).additional_data){
    switch (currentLang) {
      case "ru":
        return (<NameSpecification>object).name_specification;
      case "en":
        return (<NameSpecification>object).additional_data.EN || (<NameSpecification>object).name_specification;
      case "kz":
        return (<NameSpecification>object).additional_data.KZ || (<NameSpecification>object).name_specification;
      default:
        return (<NameSpecification>object).name_specification;
    }
  }

  return "Данные отсутвуют";
};

const selectDataByLangValueSpecification = (
  object: Specification | ValueSpecification | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";

  if ((<Specification>object).product) {
    switch (currentLang) {
      case "ru":
        return (<Specification>object).value_specification.value_specification;
      case "en":
        return (<Specification>object).value_specification.additional_data.EN || (<Specification>object).value_specification.value_specification;
      case "kz":
        return (<Specification>object).value_specification.additional_data.KZ || (<Specification>object).value_specification.value_specification;
      default:
        return (<Specification>object).value_specification.value_specification;
    }
  }
  if((<ValueSpecification>object).additional_data){
    switch (currentLang) {
      case "ru":
        return (<ValueSpecification>object).value_specification;
      case "en":
        return (<ValueSpecification>object).additional_data.EN || (<ValueSpecification>object).value_specification;
      case "kz":
        return (<ValueSpecification>object).additional_data.KZ || (<ValueSpecification>object).value_specification;
      default:
        return (<ValueSpecification>object).value_specification;
    }
  }

  return "Данные отсутвуют";

};

const selectDataByLangCity = (
  object: iCity | null | undefined ,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.name_city;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return undefined;
  }
};

const selectDataByTagProd = (
  object: TagProd | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return "";
  switch (currentLang) {
    case "ru":
      return object.tag_text;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return object.tag_text;
  }
};

export {
  selectDataByLangCategory,
  selectDataByLangProducts,
  selectDataByLangDescriptionTitle,
  selectDataByLangDescriptionBody,
  selectDataByLangNameSpecification,
  selectDataByLangValueSpecification,
  selectDataByLangBrands,
  selectDataByLangCity,
  selectDataByTagProd
};

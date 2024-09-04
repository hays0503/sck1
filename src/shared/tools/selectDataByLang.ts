import { Brands } from "../types/brand";
import { Category } from "../types/category";
import { iDescription } from "../types/descriptionProduct";
import { Products, TagProd } from "../types/products";
import { ProductsDetail } from "../types/productsDetail";
import {
  NameSpecification,
  Specification,
  SpecificationNameSpecificationParams,
  ValueSpecification,
} from "../types/specification";
import { iCity } from "../types/city";

const selectDataByLangCategory = (
  object: Category | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return undefined;
  switch (currentLang) {
    case "ru":
      return object.name_category;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return undefined;
  }
};

const selectDataByLangBrands = (
  object: Brands,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return undefined;
  switch (currentLang) {
    case "ru":
      return object.name_brand;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return undefined;
  }
};

const selectDataByLangProducts = (
  object: ProductsDetail | Products | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return undefined;
  switch (currentLang) {
    case "ru":
      return object.name_product;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return undefined;
  }
};

const selectDataByLangDescriptionTitle = (
  object: iDescription | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return undefined;
  switch (currentLang) {
    case "ru":
      return object.title_description;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return undefined;
  }
};

const selectDataByLangDescriptionBody = (
  object: iDescription | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return undefined;
  switch (currentLang) {
    case "ru":
      return object.body_description;
    case "en":
      return object.additional_data_to_desc.EN;
    case "kz":
      return object.additional_data_to_desc.KZ;
    default:
      return ;
  }
};

const selectDataByLangNameSpecification: SpecificationNameSpecificationParams = (
  object: Specification | NameSpecification | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
): string|undefined => {
  if (!object) return undefined;
  if ((<Specification>object).product) {
    switch (currentLang) {
      case "ru":
        return (<Specification>object).name_specification.name_specification;
      case "en":
        return (<Specification>object).name_specification.additional_data.EN
      case "kz":
        return (<Specification>object).name_specification.additional_data.KZ
      default:
        return undefined;
    }
  }
  if((<NameSpecification>object).additional_data){
    switch (currentLang) {
      case "ru":
        return (<NameSpecification>object).name_specification;
      case "en":
        return (<NameSpecification>object).additional_data.EN
      case "kz":
        return (<NameSpecification>object).additional_data.KZ
      default:
        return undefined;
    }
  }

  return undefined;
};

const selectDataByLangValueSpecification = (
  object: Specification | ValueSpecification | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
):string|undefined => {
  if (!object) return undefined;

  if ((<Specification>object).product) {
    switch (currentLang) {
      case "ru":
        return (<Specification>object).value_specification.value_specification;
      case "en":
        return (<Specification>object).value_specification.additional_data.EN
      case "kz":
        return (<Specification>object).value_specification.additional_data.KZ
      default:
        return undefined;
    }
  }
  if((<ValueSpecification>object).additional_data){
    switch (currentLang) {
      case "ru":
        return (<ValueSpecification>object).value_specification;
      case "en":
        return (<ValueSpecification>object).additional_data.EN
      case "kz":
        return (<ValueSpecification>object).additional_data.KZ
      default:
        return undefined;
    }
  }

  return undefined;

};

const selectDataByLangCity = (
  object: iCity | null | undefined ,
  currentLang: "ru" | "en" | "kz" | string
) => {
  if (!object) return undefined;
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
  if (!object) return undefined;
  switch (currentLang) {
    case "ru":
      return object.tag_text;
    case "en":
      return object.additional_data.EN;
    case "kz":
      return object.additional_data.KZ;
    default:
      return undefined;
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

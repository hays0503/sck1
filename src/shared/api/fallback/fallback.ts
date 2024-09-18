import { Populates } from "@/shared/types/populates";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "../url";

const fetchCity = await (
    await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fetchCategory = await (
    await fetch(UrlApiWithDomain.getCategory, {
      ...UrlRevalidate.getCategory,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fetchPopulates = await (
    await fetch(UrlApiWithDomain.getPopulates, {
      ...UrlRevalidate.getPopulates,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fetchProduct = await (
    await fetch(UrlApiWithDomain.getProducts, {
      ...UrlRevalidate.getProducts,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const PopularProductsByIds = `by_ids/${fetchPopulates.flatMap((i: Populates) => i.products).join(",")}`;
  const UrlApiPopularProductsByIds = UrlApi.getProducts + PopularProductsByIds;
  const UrlApiWithDomainPopularProductsByIds = UrlApiWithDomain.getProducts + PopularProductsByIds;
  const fetchPopularProductsByIds = await (
    await fetch(UrlApiWithDomainPopularProductsByIds, {
      ...UrlRevalidate.getProducts,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

//   url
export{
    UrlApiPopularProductsByIds
}
// data
export {
  fetchCity,
  fetchCategory,
  fetchPopulates,
  fetchProduct,
  fetchPopularProductsByIds
}
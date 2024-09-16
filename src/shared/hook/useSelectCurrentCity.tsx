import { useEffect } from "react";
import useFetcherCity from "../api/fetch/city";
import selectCurrentCity from "../tools/selectCurrentCity";

export default function useSelectCurrentCity(
  locale: string, NameCity: string
) {
  const cities = useFetcherCity().data!;
  // console.log(cities)

  useEffect(() => {

  }, [cities]);

  if (!cities) {
    return undefined;
  }

  switch (locale) {
    case "ru":
      return selectCurrentCity({ cities, RusNameCity: NameCity });
    case "kz":
      return selectCurrentCity({ cities, KzNameCity: NameCity });
    case "en":
      return selectCurrentCity({ cities, EngNameCity: NameCity });
    default:
      return undefined;
  }
}

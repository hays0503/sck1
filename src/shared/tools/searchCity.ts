import { iCity } from "../types/city";
import { selectDataByLangCity } from "./selectDataByLang";

const searchCity = (value: string, cities: iCity[], locale: string) => {
  const filteredCities = cities.filter((item_city: any) =>
    selectDataByLangCity(item_city, locale)
      .toLowerCase()
      .includes(value.toLowerCase())
  );
  return filteredCities;
};
export default searchCity;
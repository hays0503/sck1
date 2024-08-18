import { iCity } from "../types/city";
import { selectDataByLangCity } from "./selectDataByLang";

const searchCity = (value: string, cities: iCity[], locale: string) => {
  if (!cities || !Array.isArray(cities) || cities.length === 0) {
    return [];
  }

  if (!locale) {
    return [];
  }

  return cities.filter((city: iCity) => {
    const cityName = selectDataByLangCity(city, locale);
    return cityName?.toLowerCase().includes(value.toLowerCase()) ?? false;
  });
};
export default searchCity;

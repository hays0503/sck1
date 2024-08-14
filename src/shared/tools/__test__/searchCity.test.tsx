import { describe, expect, it,test } from "vitest";
import searchCity from "../searchCity";
import { iCity } from "@/shared/types/city";

const cities: iCity[] = [
  {
    id: 1,
    name_city: "Астана",
    additional_data: { EN: "Astana", KZ: "Астана" },
  },
  {
    id: 2,
    name_city: "Петропавловск",
    additional_data: { EN: "Petropavlovsk", KZ: "Петропавл" },
  },
  {
    id: 3,
    name_city: "Караганда",
    additional_data: { EN: "Karaganda", KZ: "Караганды" },
  },
  {
    id: 4,
    name_city: "Джезказган",
    additional_data: { EN: "Dzhezkazgan", KZ: "Жезқазған" },
  },
];
test("Проверка функции searchCity", () => {
  describe("searchCity на русском", () => {
    it("должен вернуть пустой массив, когда входное значение пустое", () => {
      const result = searchCity("", cities, "ru");
      expect(result).toEqual(cities);
    });

    it("должен вернуть пустой массив, когда входное значение не совпадает ни с одним городом", () => {
      const result = searchCity("несуществующий город", cities, "ru");
      expect(result).toEqual([]);
    });

    it("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом", () => {
      const result = searchCity("Астана", cities, "ru");
      expect(result).toEqual([cities[0]]);
    });

    it("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом на другом языке", () => {
      const result = searchCity("е", cities, "ru");
      expect(result).toEqual([cities[1], cities[3]]);
    });
  });

  describe("searchCity на английском", () => {
    it("должен вернуть пустой массив, когда входное значение пустое", () => {
      const result = searchCity("", cities, "en");
      expect(result).toEqual(cities);
    });

    it("должен вернуть пустой массив, когда входное значение не совпадает ни с одним городом", () => {
      const result = searchCity("несуществующий город", cities, "en");
      expect(result).toEqual([]);
    });

    it("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом", () => {
      const result = searchCity("Astana", cities, "en");
      expect(result).toEqual([cities[0]]);
    });

    it("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом на другом языке", () => {
      const result = searchCity("r", cities, "en");
      expect(result).toEqual([cities[1], cities[2]]);
    });
  });

  describe("searchCity на казахском", () => {
    it("должен вернуть пустой массив, когда входное значение пустое", () => {
      const result = searchCity("", cities, "kz");
      expect(result).toEqual(cities);
    });

    it("должен вернуть пустой массив, когда входное значение не совпадает ни с одним городом", () => {
      const result = searchCity("несуществующий город", cities, "kz");
      expect(result).toEqual([]);
    });

    it("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом", () => {
      const result = searchCity("Караганды", cities, "kz");
      expect(result).toEqual([cities[2]]);
    });

    it("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом на другом языке", () => {
      const result = searchCity("ғ", cities, "kz");
      expect(result).toEqual([cities[3]]);
    });
  });
});

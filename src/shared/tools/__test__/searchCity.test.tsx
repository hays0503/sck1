import {expect, jest, test,describe} from '@jest/globals';
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

describe("Проверка функции searchCity", () => {
   describe("searchCity на русском", () => {
    test("должен вернуть полный массив городов, когда входное значение пустое", () => {
      const result = searchCity("", cities, "ru");
      expect(result).toEqual(cities);
    });

    test("должен вернуть пустой массив, когда входное значение не совпадает ни с одним городом", () => {
      const result = searchCity("несуществующий город", cities, "ru");
      expect(result).toEqual([]);
    });

    test("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом", () => {
      const result = searchCity("Астана", cities, "ru");
      expect(result).toEqual([cities[0]]);
    });

    test("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом на другом языке", () => {
      const result = searchCity("е", cities, "ru");
      expect(result).toEqual([cities[1], cities[3]]);
    });

    test("должен корректно обрабатывать ввод с разным регистром", () => {
      const result = searchCity("асТАНА", cities, "ru");
      expect(result).toEqual([cities[0]]);
    });

    test("должен вернуть пустой массив, если входное значение содержит спецсимволы или числа", () => {
      const result = searchCity("1", cities, "ru");
      expect(result).toEqual([]);
    });

    test("должен вернуть пустой массив, если входное значение содержит спецсимволы или числа", () => {
      const result = searchCity("-", cities, "ru");
      expect(result).toEqual([]);
    })

    test("должен вернуть пустой массив, если cities не существует", () => {
      const result = searchCity("Астана", [], "ru");
      expect(result).toEqual([]);
    })
   });

   describe("searchCity на английском", () => {
    test("должен вернуть полный массив городов, когда входное значение пустое", () => {
      const result = searchCity("", cities, "en");
      expect(result).toEqual(cities);
    });

    test("должен вернуть пустой массив, когда входное значение не совпадает ни с одним городом", () => {
      const result = searchCity("nonexistent city", cities, "en");
      expect(result).toEqual([]);
    });

    test("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом", () => {
      const result = searchCity("Astana", cities, "en");
      expect(result).toEqual([cities[0]]);
    });

    test("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом на другом языке", () => {
      const result = searchCity("r", cities, "en");
      expect(result).toEqual([cities[1], cities[2]]);
    });

    test("должен корректно обрабатывать ввод с разным регистром", () => {
      const result = searchCity("kARAGANDA", cities, "en");
      expect(result).toEqual([cities[2]]);
    });

    test("должен вернуть пустой массив, если входное значение содержит спецсимволы или числа", () => {
      const result = searchCity("-", cities, "en");
      expect(result).toEqual([]);
    });
   });

   describe("searchCity на казахском", () => {
    test("должен вернуть полный массив городов, когда входное значение пустое", () => {
      const result = searchCity("", cities, "kz");
      expect(result).toEqual(cities);
    });

    test("должен вернуть пустой массив, когда входное значение не совпадает ни с одним городом", () => {
      const result = searchCity("nonexistent city", cities, "kz");
      expect(result).toEqual([]);
    });

    test("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом", () => {
      const result = searchCity("Караганды", cities, "kz");
      expect(result).toEqual([cities[2]]);
    });

    test("должен вернуть отфильтрованный массив городов, когда входное значение совпадает с городом на другом языке", () => {
      const result = searchCity("ғ", cities, "kz");
      expect(result).toEqual([cities[3]]);
    });

    test("должен корректно обрабатывать ввод с разным регистром", () => {
      const result = searchCity("КАраганды", cities, "kz");
      expect(result).toEqual([cities[2]]);
    });

    test("должен вернуть пустой массив, если входное значение содержит спецсимволы или числа", () => {
      const result = searchCity("2", cities, "kz");
      expect(result).toEqual([]);
    });
   });

   describe("Некорректные или отсутствующие локали", () => {
    test("должен вернуть пустой массив, если передана некорректная локаль", () => {
      const result = searchCity("Астана", cities, "unknown_locale");
      expect(result).toEqual([]);
    });

    test("должен вернуть пустой массив, если локаль отсутствует", () => {
       //@ts-ignore
      const result = searchCity("Астана", cities, undefined);
      expect(result).toEqual([]);
    });
   });
});

import {expect, jest, test,describe} from '@jest/globals';
import selectCurrentCity from "../selectCurrentCity";
import { iCity } from '@/shared/types/city';

const cities: iCity[] = [
  {
    id: 1,
    name_city: "Караганда",
    additional_data: {
      EN: "Karaganda",
      KZ: "Қарағанды",
    },
  },
  {
    id: 2,
    name_city: "Астана",
    additional_data: {
      EN: "Astana",
      KZ: "Астана",
    },
  },
  {
    id: 3,
    name_city: "Алматы",
    additional_data: {
      EN: "Almaty",
      KZ: "Алматы",
    },
  },
];

describe("selectCurrentCity", () => {
  test("Возвращает город по русскому названию", () => {
    const result = selectCurrentCity({
      cities,
      RusNameCity: "Караганда",
    });
    expect(result).toEqual(cities[0]);
  });

  test("Возвращает город по английскому названию", () => {
    const result = selectCurrentCity({
      cities,
      EngNameCity: "Astana",
    });
    expect(result).toEqual(cities[1]);
  });

  test("Возвращает город по казахскому названию", () => {
    const result = selectCurrentCity({
      cities,
      KzNameCity: "Алматы",
    });
    expect(result).toEqual(cities[2]);
  });

  test("Возвращает undefined, если город не найден", () => {
    const result = selectCurrentCity({
      cities,
      RusNameCity: "Неизвестный город",
    });
    expect(result).toBeUndefined();
  });

  test("Возвращает undefined, если массив городов пуст", () => {
    const result = selectCurrentCity({
      cities: [],
      RusNameCity: "Караганда",
    });
    expect(result).toBeUndefined();
  });

  test("Возвращает undefined, если массив городов отсутствует", () => {
    //@ts-ignore
    const result = selectCurrentCity({
      cities: null,
      RusNameCity: "Караганда",
    });
    expect(result).toBeUndefined();
  });

  test("Возвращает undefined, если все параметры названий городов отсутствуют", () => {
    const result = selectCurrentCity({
      cities,
    });
    expect(result).toBeUndefined();
  });

  test("Отдает приоритет русскому названию при наличии нескольких параметров", () => {
    const result = selectCurrentCity({
      cities,
      RusNameCity: "Астана",
      EngNameCity: "Karaganda",
      KzNameCity: "Қарағанды",
    });
    expect(result).toEqual(cities[1]);
  });

  test("Отдает приоритет английскому названию, если русское не указано", () => {
    const result = selectCurrentCity({
      cities,
      EngNameCity: "Karaganda",
      KzNameCity: "Қарағанды",
    });
    expect(result).toEqual(cities[0]);
  });

  test("Отдает приоритет казахскому названию, если русское и английское не указаны", () => {
    const result = selectCurrentCity({
      cities,
      KzNameCity: "Қарағанды",
    });
    expect(result).toEqual(cities[0]);
  });
});

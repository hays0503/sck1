import RenderMenu from "../RenderMenu";
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from "next-intl";
import { describe, test, expect } from "@jest/globals";
import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";

// Пример тестовых данных для категорий
const categoriesMock = getCategoriesFromMockData().find(({slug}) => slug === "bytovaya-tehnika")!.children!;

describe("Проверка компонента RenderMenu", () => {

  test("Рендер пустого меню", () => {
    // Рендер пустого меню
    const { container } = render(
      <NextIntlClientProvider locale="en">
        <RenderMenu Categories={[]} />
      </NextIntlClientProvider>
    );
    
    // Проверка, что ничего не рендерится, когда массив категорий пустой
    expect(container).toBeEmptyDOMElement();
  });

  test("Рендер и подсчет количества категорий", () => {
    // Рендер с тестовыми категориями
    render(
      <NextIntlClientProvider locale="en">
        <RenderMenu Categories={categoriesMock} />
      </NextIntlClientProvider>
    );

    // Проверяем, что кнопки для каждой категории рендерятся
    const buttons = screen.getAllByRole("navigation-element");
    expect(buttons.length).toBe(categoriesMock.length);
  });

  test("Рендер и проверка корректности данных", () => {
    // Рендер с тестовыми категориями
    render(
      <NextIntlClientProvider locale="en">
        <RenderMenu Categories={categoriesMock} />
      </NextIntlClientProvider>
    );

    // Проверяем, что кнопки для каждой категории рендерятся
    categoriesMock.forEach((category) => {
      const nameCategory = selectDataByLangCategory(category, "en");
      //Нет данных перевода для анг языка   
      expect(nameCategory).toBeDefined();
      if(nameCategory){
        const element = screen.getByText(nameCategory);
        //Существует ли элемент ?   
        expect(element).toBeInTheDocument();
      }
    });
  });
  

});

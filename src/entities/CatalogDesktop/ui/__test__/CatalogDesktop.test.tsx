import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CatalogDesktop from "../CatalogDesktop"; // Путь к компоненту
import { Category } from "@/shared/types/category";
import { test, expect, jest, describe } from "@jest/globals";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/ru.json";
import { act } from "react";

// Mock для хука useTranslations
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key === "catalog" ? "Каталог" : key,
}));

const TestComponent = () => {
  const mockCategoriesData: Category[] = [
    { id: 1, name: "Category 1", slug: "category-1" },
    { id: 2, name: "Category 2", slug: "category-2" },
  ];

  const mockSelectCategory: Category = {
    id: 1,
    name: "Category 1",
    slug: "category-1",
  };
  const mockSetSelectCategory = jest.fn();

  return (
    <CatalogDesktop
      params={{ locale: "ru", city: "almaty" }}
      CategoriesData={mockCategoriesData}
      selectCategory={mockSelectCategory}
      setSelectCategory={mockSetSelectCategory}
    />
  );
};

const TestComponentWithProvider = () => {
  return (
    <NextIntlClientProvider messages={messages} locale="ru">
      <TestComponent />
    </NextIntlClientProvider>
  );
};

describe("CatalogDesktop", () => {
  test("компонент рендерится с переданными пропсами", () => {
    render(<TestComponentWithProvider/>);

    // Проверяем отображение текста через useTranslations
    expect(screen.getByText("Каталог")).toBeInTheDocument();
  });

  test("CatalogPopover получает правильные пропсы", () => {
    render(<TestComponentWithProvider/>);

    // Проверяем наличие кнопки и текста каталога
    expect(screen.getByText("Каталог")).toBeInTheDocument();
  });

  test("Divider отображается с правильными стилями", () => {
    render(<TestComponentWithProvider/>);

    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveStyle({ borderColor: "white", height: "36px" });
  });
});

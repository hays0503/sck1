import { fireEvent, render, screen, act } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, test, expect } from "@jest/globals";
import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import MenuComponent from "../MenuComponent";
import { Button, Dropdown } from "antd";

// Пример тестовых данных для категорий
const categoriesMock = getCategoriesFromMockData().find(
  ({ slug }) => slug === "bytovaya-tehnika"
)!.children!;

const TestComponent = () => {
  return (
    <div role="open-dropdown-menu">
      <Dropdown
        trigger={["click"]}
        menu={{ items: MenuComponent({ Categories: categoriesMock, localActive: "en" }) }}
      >
        <Button
          type="text"
          style={{
            backgroundColor: "#F5F5F5BF",
            border: "1px solid #AAABAD",
            zIndex: 2,
          }}
        >
          Ещё
        </Button>
      </Dropdown>
    </div>
  );
};

const TestComponentWithProvider = () => {
  return (
    <NextIntlClientProvider locale="en">
      <TestComponent />
    </NextIntlClientProvider>
  );
};

describe("Проверка компонента RenderMenu", () => {

  test("Рендер и подсчет количества категорий", async () => {
    // Рендер с тестовыми категориями
    const { container } = render(<TestComponentWithProvider />);

    // Находим кнопку открытия Dropdown
    const dropdownButton = screen.getByText("Ещё");

    // Используем act для имитации клика
    await act(async () => {
      fireEvent.click(dropdownButton);
    });

    // Проверяем, что элементы меню рендерятся
    categoriesMock.forEach((category) => {
      const nameCategory = selectDataByLangCategory(category, "en");
      if (nameCategory) {
        const menuItem = screen.getByText(nameCategory);
        expect(menuItem).toBeInTheDocument();
      }
    });
  });

  test("Рендер и проверка корректности данных", async () => {
    // Рендер с тестовыми категориями
    const { container } = render(<TestComponentWithProvider />);

    // Находим кнопку открытия Dropdown
    const dropdownButton = screen.getByText("Ещё");

    // Открываем Dropdown
    await act(async () => {
      fireEvent.click(dropdownButton);
    });

    // Проверяем, что кнопки для каждой категории рендерятся
    categoriesMock.forEach((category) => {
      const nameCategory = selectDataByLangCategory(category, "en");
      if (nameCategory) {
        const element = screen.getByText(nameCategory);
        expect(element).toBeInTheDocument();
      }
    });
  });
});

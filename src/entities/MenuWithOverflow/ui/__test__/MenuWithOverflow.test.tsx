import { act, render, screen, waitFor } from "@testing-library/react";
import MenuWithOverflow from "../MenuWithOverflow";
import ResizeObserver from "resize-observer-polyfill";
import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/ru.json";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { CSSProperties } from "react";

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = ResizeObserver;
});

// Моковые данные категорий
const mockCategories = getCategoriesFromMockData().find(
  ({ slug }) => slug === "bytovaya-tehnika"
)!;

const TestComponent = ({ style }: { style: CSSProperties }) => (
  <>
    <div style={style}>
    <MenuWithOverflow selectCategory={mockCategories} />
    </div>
  </>
);
const TestComponentWithProvider = ({ style }: { style: CSSProperties }) => (
  <NextIntlClientProvider locale="ru" messages={messages}>
    <TestComponent style={style} />
  </NextIntlClientProvider>
);

describe("MenuWithOverflow", () => {
  test("скрывает элементы при переполнении и отображает их при увеличении размера", async () => {
    const { container } = render(
        <TestComponentWithProvider style={{ width: "100px", height: "100px" }} />
      );
  });

  // test('показывает все элементы при отсутствии переполнения', () => {
  //   // Здесь можно замокировать более широкий контейнер, чтобы не было переполнения
  //   // В таком случае все элементы должны быть видимы

  //   render(<TestComponentWithProvider/>);

  //   // Проверяем, что final-menu отображает все категории
  //   const visibleItems = screen.getAllByRole('navigation-element');
  //   expect(visibleItems.length).toBe(mockCategories.length);

  //   // Проверяем, что кнопка "Ещё" не отображается, так как все элементы видны
  //   const moreButton = screen.queryByText(/Ещё/i);
  //   expect(moreButton).not.toBeInTheDocument();
  // });
});

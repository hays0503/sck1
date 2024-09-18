import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"; // Для дополнительных матчеров
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/ru.json";
import BasketButton from "../BasketButton"; // Импортируем тестируемый компонент

const TestComponent = () => <BasketButton />;
const TestComponentWithProvider = () => (
  <NextIntlClientProvider locale="ru" messages={messages}>
    <TestComponent />
  </NextIntlClientProvider>
);

describe("BasketButton", () => {
  test("должен отображать правильную сумму корзины", async () => {
    await act(async () => {
      render(<TestComponentWithProvider />);
    });

    const price = screen.getByText("112 980 ₸");
    expect(price).toBeInTheDocument();
  });

  test("должен иметь правильный цвет фона кнопки", async () => {
    await act(async () => {
      render(<TestComponentWithProvider />);
    });

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ backgroundColor: "#3E54CF" });
  });

  test("должен отображать разделитель", async () => {
    await act(async () => {
      render(<TestComponentWithProvider />);
    });

    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveStyle({ borderColor: "white" });
  });
});

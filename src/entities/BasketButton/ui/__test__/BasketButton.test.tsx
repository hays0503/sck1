import { test, expect,describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // Для дополнительных матчеров
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/ru.json";

import BasketButton from "../BasketButton"; // Импортируем тестируемый компонент

const TestComponent = () => <BasketButton />;
const TestComponentWithProvider = () => <NextIntlClientProvider locale="ru" messages={messages}><TestComponent /></NextIntlClientProvider>;


describe('BasketButton', () => {
  test('должен отображать количество товаров в Badge', () => {
    render(<TestComponentWithProvider />);

    const badge = screen.getByText("5"); // Проверяем наличие числа 5 в Badge
    expect(badge).toBeInTheDocument();
  });

  test('должен отображать правильную сумму корзины', () => {
    render(<TestComponentWithProvider />);

    const price = screen.getByText("112 980 ₸");
    expect(price).toBeInTheDocument();
  });

  test('должен иметь правильный цвет фона кнопки', () => {
    render(<TestComponentWithProvider />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#3E54CF' }); // Проверяем цвет фона кнопки
  });

  test('должен отображать разделитель', () => {
    render(<TestComponentWithProvider />);

    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveStyle({ borderColor: 'white' });
  });
});
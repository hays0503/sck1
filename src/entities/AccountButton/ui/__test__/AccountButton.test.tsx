import { test, expect,jest,describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // Для дополнительных матчеров
import AccountButton from "../AccountButton"; // Импортируем тестируемый компонент
import { NextIntlClientProvider } from "next-intl";
// import Image from "next/image";
import messages from "../../../../../messages/ru.json";

// Мокаем next/image, чтобы заменить реальный компонент
// jest.mock('next/image', () => (props: any) => <img {...props} />);

// Мокаем useTranslations для возвращения тестового текста
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      'lichnyi-kabinet': 'Личный кабинет',
    };
    return translations[key];
  },
}));

const TestComponent = () => <AccountButton />;
const TestComponentWithProvider = () => <NextIntlClientProvider locale="ru" messages={messages}><TestComponent /></NextIntlClientProvider>;

describe('AccountButton', () => {
  test('должен отображать иконку логина', () => {
    render(<TestComponentWithProvider />);
    
    const icon = screen.getByAltText("login");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/login.svg');
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
  });

  test('должен отображать текст "Личный кабинет"', () => {
    render(<TestComponentWithProvider />);

    const text = screen.getByText('Личный кабинет');
    expect(text).toBeInTheDocument();
  });

  test('должен иметь правильный размер кнопки', () => {
    render(<TestComponentWithProvider />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ant-btn-lg'); // Ant Design присваивает класс для кнопки большого размера
  });
});


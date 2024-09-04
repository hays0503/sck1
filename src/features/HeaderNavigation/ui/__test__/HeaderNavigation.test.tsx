import "@/shared/mock/matchMedia.mock"
import {
  describe,
  test,
  jest,
  expect,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { render, screen, fireEvent  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { cleanup } from "@testing-library/react";

import messages from "../../../../../messages/ru.json";
import HeaderNavigation from "../HeaderNavigation";

afterEach(() => {
  cleanup();
});

describe("Тестирование Header с Локализацией на русском десктоп", () => {
  beforeEach(async () => {
    const Local = "ru";
    jest.mock("next/navigation", () => ({
      usePathname: () => "/",
      useRouter: () => ({
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        push: jest.fn(),
        prefetch: jest.fn(),
        replace: jest.fn(),
      }),
      useParams: () => ({ locale: Local }),
      useSelectedLayoutSegment: () => ({ locale: Local }),
    }));

    // const messages = (await import(`@/messages/${Local}.json`)).default;
    // const messages = (await import(`../<rootDir>/messages/${Local}.json`)).default;
    const params = { locale: Local, city: "Astana" };
    render(
      <NextIntlClientProvider messages={messages} locale={Local}>
        <HeaderNavigation params={params} />
      </NextIntlClientProvider>
    );
  });

  test("Рендер Header и проверка содержимого", () => {
    expect(screen.getByText("Доставка")).toBeDefined();
    expect(screen.getByText("Наши гарантии")).toBeDefined();
    expect(screen.getByText("Контакты")).toBeDefined();
    expect(screen.getByText("О нас")).toBeDefined();
    expect(screen.getByText("Оплата")).toBeDefined();
  });

});

describe("Тестирование Header с Локализацией на русском мобильная версия", () => {
  beforeEach(async () => {
    const Local = "ru";
    jest.mock("next/navigation", () => ({
      usePathname: () => "/",
      useRouter: () => ({
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        push: jest.fn(),
        prefetch: jest.fn(),
        replace: jest.fn(),
      }),
      useParams: () => ({ locale: Local }),
      useSelectedLayoutSegment: () => ({ locale: Local }),
    }));

    // const messages = (await import(`@/messages/${Local}.json`)).default;
    // const messages = (await import(`../<rootDir>/messages/${Local}.json`)).default;
    const params = { locale: Local, city: "Astana",mobile: { value: "true" } };
    render(
      <NextIntlClientProvider messages={messages} locale={Local}>
        <HeaderNavigation params={params} />
      </NextIntlClientProvider>
    );
  });

  test("Рендер Header и проверка содержимого (мобильная версия) ссылок не должно быть", () => {
    expect(screen.queryByText("Доставка")).toBeNull();    
    expect(screen.queryByText("Наши гарантии")).toBeNull();    
    expect(screen.queryByText("Контакты")).toBeNull();    
    expect(screen.queryByText("О нас")).toBeNull();    
    expect(screen.queryByText("Оплата")).toBeNull();    
  });

});

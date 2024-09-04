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
import HeaderNavigation from "@/widgets/HeaderNavigation/ui/HeaderNavigation.tsx";
import messages from "../../../../../messages/ru.json";

afterEach(() => {
  cleanup();
});

describe("Тестирование Header с Локализацией на русском", () => {
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
    // expect(screen.getByText("Личный кабинет")).toBeDefined();
    // expect(screen.getByText("Отзывы")).toBeDefined();
    expect(screen.getByText("Доставка")).toBeDefined();
    expect(screen.getByText("Наши гарантии")).toBeDefined();
    expect(screen.getByText("Контакты")).toBeDefined();
    expect(screen.getByText("О нас")).toBeDefined();
    expect(screen.getByText("Оплата")).toBeDefined();
    // expect(screen.getByText("Почему мы?")).toBeDefined();
    // expect(screen.getByText("Оставить обращение")).toBeDefined();
  });

  // test("Найдена страница Аккаунт", async () => {
  //   const accountButton = await screen.findByText("Личный кабинет");
  //   await userEvent.click(accountButton);
  //   expect(await screen.findByText("Аккаунт")).toBeDefined();
  // });

  // test("Найдена компонент Выбрать тему", async () => {
  //   const accountButton = await screen.getByText("Личный кабинет");
  //   await userEvent.click(accountButton);
  //   expect(await screen.findByText("Выбрать тему")).toBeDefined();
  // });

  // test("Найдена компонент Выбрать язык", async () => {
  //   const accountButton = await screen.getByText("Личный кабинет");
  //   await userEvent.click(accountButton);
  //   expect(await screen.findByText("Русский")).toBeDefined();
  // });
});

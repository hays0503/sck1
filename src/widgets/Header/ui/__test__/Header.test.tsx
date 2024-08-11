import {
  describe,
  test,
  vi,
  beforeAll,
  expect,
  afterEach,
  beforeEach,
} from "vitest"; // Добавлен beforeAll
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import Header from "../Header";
// import messages from "$/messages/ru.json";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // устаревший метод
      removeListener: vi.fn(), // устаревший метод
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});


expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("Тестирование Header", () => {

  beforeEach(async () => {
    const Local = "ru";
    vi.mock("next/navigation", () => ({
      usePathname: () => "/",
      useRouter: () => ({
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        push: vi.fn(),
        prefetch: vi.fn(),
        replace: vi.fn(),
      }),
      useParams: () => ({ locale: Local }),
      useSelectedLayoutSegment: () => ({ locale: Local }),
    }));

    const messages = (await import(`$/messages/${Local}.json`)).default;

    render(
      <NextIntlClientProvider messages={messages} locale={Local}>
        <Header />
      </NextIntlClientProvider>
    );
  });

  test("Рендер Header и проверка содержимого", () => {

    expect(screen.getByText("Личный кабинет")).toBeDefined();
    expect(screen.getByText("Отзывы")).toBeDefined();
    expect(screen.getByText("Доставка")).toBeDefined();
    expect(screen.getByText("Наши гарантии")).toBeDefined();
    expect(screen.getByText("Контакты")).toBeDefined();
    expect(screen.getByText("О нас")).toBeDefined();
    expect(screen.getByText("Оплата")).toBeDefined();
    expect(screen.getByText("Почему мы?")).toBeDefined();
    expect(screen.getByText("Оставить обращение")).toBeDefined();
  });

  test("Найдена страница Аккаунт", async () => {
    const accountButton = screen.getByText("Личный кабинет");
    userEvent.click(accountButton);
    expect(await screen.findByText("Аккаунт")).toBeDefined();
  });

  test("Найдена компонент Выбрать тему", async () => {
    const accountButton = screen.getByText("Личный кабинет");
    userEvent.click(accountButton);
    expect(await screen.findByText("Выбрать тему")).toBeDefined();
  });

  test("Найдена компонент Выбрать язык", async () => {
    const accountButton = screen.getByText("Личный кабинет");
    userEvent.click(accountButton);
    expect(await screen.findByText("Русский")).toBeDefined();
  });
});

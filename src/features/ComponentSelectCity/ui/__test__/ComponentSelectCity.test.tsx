import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import ComponentSelectCity from "../ComponentSelectCity";
import { NextIntlClientProvider } from "next-intl";
import userEvent from "@testing-library/user-event";
import {
  describe,
  test,
  beforeAll,
  expect,
  afterEach,
  afterAll,
  vi,
} from "vitest"; // Добавлен beforeAll
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Определяем обработчики запросов
const handlers = [
  http.get("/api/city", () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          additional_data: {
            EN: "Petropavlovsk",
            KZ: "Петропавл",
          },
          name_city: "Петропавловск",
        },
        {
          id: 2,
          additional_data: {
            EN: "Astana",
            KZ: "Астана",
          },
          name_city: "Астана",
        },
        {
          id: 3,
          additional_data: {
            EN: "Karaganda",
            KZ: "Қарағанды",
          },
          name_city: "Караганда",
        },
      ],
      { status: 200 }
    );
  }),
];

// Настройка сервера MSW
const server = setupServer(...handlers);

// Включаем сервер перед всеми тестами
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
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  server.listen();
});

// Сбрасываем обработчики после каждого теста и очищаем DOM
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Отключаем сервер после завершения всех тестов
afterAll(() => server.close());

describe("ComponentSelectCity", () => {
  const params = { locale: "en", city: "Astana" };

  // test("Рендер компонента и проверка содержимого", async () => {
  //   render(
  //     <NextIntlClientProvider locale="en">
  //       <ComponentSelectCity params={params} />
  //     </NextIntlClientProvider>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText("Astana")).toBeInTheDocument();
  //   });
  // });

  test("Открытие и закрытие модального окна", async () => {
    let app = render(
      <NextIntlClientProvider locale="en">
        <ComponentSelectCity params={params} />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      // const closeButton = screen.getByRole("dialog");
      // console.log(`closeButton [${JSON.stringify(closeButton.style)}]`);
    //   expect(screen.getAllByRole("dialog")).toBeVisible();
      const element = app.baseElement.getElementsByClassName("ant-modal-wrap");
      const modal = element[0]?.style?.cssText;
      // console.log("1-1  = ",modal);
      expect(modal).toBeUndefined();

    });


    const button = screen.getByTestId("openModalCity");
    await userEvent.click(button);

    // console.log("app", screen.logTestingPlaygroundURL());

    // Ожидание видимости модального окна
    await waitFor(() => {
      // const closeButton = screen.getByRole("dialog");
      // console.log(`closeButton [${JSON.stringify(closeButton.style)}]`);
    //   expect(screen.getAllByRole("dialog")).toBeVisible();
      const element = app.baseElement.getElementsByClassName("ant-modal-wrap");
      const modal = element[0]?.style?.cssText;
      // console.log("2  = ",modal);
      expect(modal).toBe("");
    });


    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);
    // console.log("app", screen.logTestingPlaygroundURL());
    // Ожидание видимости модального окна
    await waitFor(() => {
      const element = app.baseElement.getElementsByClassName("ant-modal-wrap");
      const modal = element[0]?.style?.cssText;
      // console.log("3  = ",modal);
      expect(modal).toBe("display: none;");
    });


  });

  //   test("Фильтрация городов при поиске", async () => {
  //     render(
  //       <NextIntlClientProvider locale="en">
  //         <ComponentSelectCity params={params} />
  //       </NextIntlClientProvider>
  //     );

  //     fireEvent.click(screen.getByText("Astana"));

  //     const searchInput = screen.getByRole("textbox");
  //     fireEvent.change(searchInput, { target: { value: "Karaganda" } });

  //     await waitFor(() => {
  //       expect(screen.getByText("Қарағанды")).toBeInTheDocument();
  //     });
  //   });
});

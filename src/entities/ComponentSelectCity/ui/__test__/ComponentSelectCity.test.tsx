import "@/shared/mock/matchMedia.mock";
import { UrlApi } from "@/shared/api/url";
import { afterEach, beforeAll, afterAll, test, expect } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { NextIntlClientProvider } from "next-intl";

import getCityFromMockData from "@/shared/mock/getCityFromMockData";
import ComponentSelectCity from "../ComponentSelectCity";

const server = setupServer(
  http.get(`${UrlApi.getCity}`, ({ params, request }) => {
    return HttpResponse.json(getCityFromMockData());
  })
);

beforeAll(() => server.listen());
afterAll(() => {
  server.close();
  // cleanup();
});
afterEach(() => server.resetHandlers());

const params = { locale: "en", city: "Astana" };

test("Открытие и закрытие модального окна", async () => {
  render(
    <NextIntlClientProvider locale="en">
      <ComponentSelectCity params={params} />
    </NextIntlClientProvider>
  );

  // Пробуем открыть модальное окно
  const buttonOpen = screen.getByRole("button");
  fireEvent.click(buttonOpen);

  // Ищем role="dialog" и проверяем, что модальное окно открылось
  const isOpen = await screen.findByRole("dialog");
  await waitFor(() => {
    expect(isOpen).toBeVisible();
  });

  // Пробуем закрыть модальное окно
  const buttonClose = screen.getByRole("button", { name: "Close" });
  fireEvent.click(buttonClose);

  // Проверяем, что модальное окно закрылось
  await waitFor(() => {
    expect(isOpen).not.toBeVisible();
  });
});

test("Фильтрация городов при поиске", async () => {
  const app = render(
    <NextIntlClientProvider locale="en">
      <ComponentSelectCity params={params} />
    </NextIntlClientProvider>
  );

  //Пробуем открыть модальное окно
  const buttonOpen = screen.getByRole("button");
  fireEvent.click(buttonOpen);
  //Ищем role="dialog" и проверяем, что модальное окно закрылось
  const isOpen = await screen.findByRole("dialog");
  await waitFor(() => {
    expect(isOpen).toBeVisible();
  });

  // Проверяем все города (En)
  await waitFor(() => {
    getCityFromMockData().forEach(async (city) => {
      await waitFor(() => {
        const elements = screen.queryByText(city.additional_data.EN)?.innerHTML;
        expect(elements).toContain(city.additional_data.EN);
      });
    });
  });

  const searchInput = screen.getByTestId("search-city");
  fireEvent.change(searchInput, { target: { value: "Karaganda" } });

  await waitFor(() => {
    const btns = screen.getAllByTestId("btn-city");
    expect(btns).toHaveLength(1);
    expect(btns[0]).toHaveTextContent("Karaganda");
    expect(btns[0]).not.toHaveTextContent("Astana");
  });

  // Очищаем строку поиска
  fireEvent.change(searchInput, { target: { value: " " } });

  await waitFor(() => {
    const btns = screen.getAllByTestId("btn-city");
    expect(btns).toHaveLength(getCityFromMockData().length);
  });

});

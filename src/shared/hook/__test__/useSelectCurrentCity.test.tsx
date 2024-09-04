import "@/shared/mock/matchMedia.mock";
import { UrlApi } from "@/shared/api/url";
import { afterEach, test, expect } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import getCityFromMockData from "@/shared/mock/getCityFromMockData";
import useSelectCurrentCity from "../useSelectCurrentCity";


const server = setupServer(
  http.get(`${UrlApi.getCity}`, ({ params, request }) => {
    return HttpResponse.json(getCityFromMockData());
  })
);

beforeAll(() => server.listen());
afterAll(() => {
  server.close();
  cleanup();
});
afterEach(() => server.resetHandlers());

const TestComponent = ({
  params,
}: {
  params: { locale: string; city: string };
}) => {
  const data = useSelectCurrentCity(params.locale, params.city);
  return <span data-testid="current-city">{data?.name_city}</span>;
};

test("Запрос текущего города изходя из локали и адреса в url (rus)", async () => {
  const { rerender } = render(
    <TestComponent params={{ locale: "ru", city: "Karaganda" }} />
  );
  const data = screen.findByText("Karaganda");
  data.then((data) => {
    expect(data).toBe("Караганда");
  });
});

test("Запрос текущего города изходя из локали и адреса в url (eng)", async () => {
  const { rerender } = render(
    <TestComponent params={{ locale: "en", city: "Karaganda" }} />
  );
  const data = screen.findByText("Karaganda");
  data.then((data) => {
    expect(data).toBe("Караганда");
  });
});

test("Запрос текущего города изходя из локали и адреса в url (kaz)", async () => {
  const { rerender } = render(
    <TestComponent params={{ locale: "kz", city: "Karaganda" }} />
  );
  const data = screen.findByText("Karaganda");
  data.then((data) => {
    expect(data).toBe("Караганда");
  });
});

test("Обработка неожиданного поведения локали", async () => {
  const { rerender } = render(
    <TestComponent params={{ locale: "undefined", city: "Karaganda" }} />
  );
  const data = screen.findByText("undefined");
  data.then((data) => {
    expect(data).toBe("undefined");
  });
})

test("Обработка неожиданного поведения адреса неизвестном городе", async () => {
  const { rerender } = render(
    <TestComponent params={{ locale: "ru", city: "undefined" }} />
  );
  const data = screen.findByText("undefined");
  data.then((data) => {
    expect(data).toBe("undefined");
  });
})

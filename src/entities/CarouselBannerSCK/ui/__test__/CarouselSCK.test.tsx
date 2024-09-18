import "@/shared/mock/matchMedia.mock";
import { test } from "@jest/globals";
import {
  logDOM,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe } from "node:test";
import CarouselBannerSCK from "../CarouselBannerSCK";
import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import { act } from "react";

const mockCategory = getCategoriesFromMockData().find(
  ({ slug }) => slug === "mebel"
)!;
describe("Тест карусели на предмет отображение картинок", () => {
  const TestComponent = () => {
    return <CarouselBannerSCK selectCategory={mockCategory} isMobile={false} />;
  };

  test("Тест карусели на предмет отображение фоновой картинки по умолчанию", async () => {
    const component = render(<TestComponent />);

    waitFor(() => {
      const banners = screen.queryByTestId("carousel-sck");
      expect(banners).toHaveStyle(
        `background-image: url(${mockCategory.list_url_to_baner[0]})`
      );
    });
  });

});

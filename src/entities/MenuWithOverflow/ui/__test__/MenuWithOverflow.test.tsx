// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import MenuWithOverflow from "../MenuWithOverflow";
// import { Category } from "@/shared/types/category";
// import {
//   describe,
//   test,
//   expect,
//   afterEach,
//   beforeEach,
//   jest,
//   it,
// } from "@jest/globals";
// import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
// import { NextIntlClientProvider } from "next-intl";

// // Мокаем ResizeObserver, так как он не поддерживается в JSDOM
// beforeEach(() => {
//   global.ResizeObserver = jest.fn().mockImplementation(() => ({
//     observe: jest.fn(),
//     disconnect: jest.fn(),
//   }));
// });

// const mockCategories: Category = getCategoriesFromMockData().find(
//   ({ slug }) => slug === "bytovaya-tehnika"
// )!;
// const TestComponent = () => {
//   return <MenuWithOverflow selectCategory={mockCategories} />;
// };

// const TestComponentWithProvider = () => {
//   return (
//     <NextIntlClientProvider locale="en">
//       <TestComponent />
//     </NextIntlClientProvider>
//   );
// };

// describe("MenuWithOverflow", () => {
//   it("рендерит видимые категории", () => {
//     render(<TestComponentWithProvider />);
//   });

//   it("отображает кнопку 'Ещё', когда категории переполняют контейнер", async () => {
//     jest
//       .spyOn(HTMLElement.prototype, "offsetWidth", "get")
//       .mockReturnValueOnce(50) // Мокаем ширину контейнера
//       .mockReturnValueOnce(150) // Мокаем ширину первого элемента
//       .mockReturnValueOnce(150) // Мокаем ширину второго элемента
//       .mockReturnValue(100); // Мокаем ширину последующих элементов

//     const { rerender } = render(<TestComponentWithProvider />);

//     // Перерендериваем компонент, если это необходимо
//     rerender(<TestComponentWithProvider />);

//     await waitFor(() => {
//       const finalMenu = screen.getByTestId("final-menu");
//       expect(finalMenu).toBeInTheDocument();

//       // Дополнительная проверка на наличие кнопки "Ещё"
//       const moreButton = screen.queryByText("Ещё");
//       expect(moreButton).toBeInTheDocument();

//       // Перерендериваем компонент, если это необходимо
//       rerender(<TestComponentWithProvider />);

//       // Проверяем наличие всех элементов
//       const allItems = screen.queryAllByTestId("navigation-element");
//       console.log(allItems); // Логируем элементы для отладки
//       expect(allItems).toHaveLength(5); // Пример: проверка на 5 элементов
//     });
//   });

//   //   it("отображает скрытые категории в выпадающем меню при нажатии на 'Ещё'", () => {
//   //     // Мокаем размеры элементов для симуляции переполнения
//   //     jest.spyOn(HTMLElement.prototype, "offsetWidth", "get")
//   //       .mockReturnValueOnce(50) // Мокаем ширину контейнера
//   //       .mockReturnValue(100);   // Мокаем ширину элементов

//   //       render(<TestComponent/>);

//   //     // Открываем dropdown
//   //     fireEvent.click(screen.getByText("Ещё"));

//   //     // Проверяем, что скрытые категории отображаются в меню
//   //     expect(screen.getByText("Category 3")).toBeInTheDocument();
//   //   });
// });

import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, test } from "@jest/globals";
import SearchLine from "../SearchLine";
import messages from "../../../../../messages/ru.json";

const TestComponent = () => {
    return (
        <SearchLine params={{}} />
    );
}

const TestComponentWithProvider = () => {
    return (
        <NextIntlClientProvider messages={messages} locale="ru">
            <TestComponent />
        </NextIntlClientProvider>
    );
};

describe("Проверка компонента SearchLine", () => {

    test("Отключён ли компонент", async () => {
        render(<TestComponentWithProvider/>)
        // ant-input-group-wrapper-disabled имеет ли атрибут disabled
        const input = screen.getByRole("search")
        expect(input).toHaveAttribute("disabled")
    })
})
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // Для матчеров, таких как .toHaveAttribute
import LogoSCK from "../LogoSCK"; // Импорт компонента

import "@/shared/mock/matchMedia.mock";
import { test, expect,jest,describe } from "@jest/globals";

// Мокаем next/link и next/image
jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);
// jest.mock('next/image', () => (props: any) => <img {...props} />);

describe('LogoSCK', () => {
  const mockParams = { locale: 'en', city: 'new-york' };

  test("должен отображать логотип с правильным изображением", () => {
    render(<LogoSCK params={mockParams} />);
    
    const logo = screen.getByAltText("logo sck");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('width', '58');
    expect(logo).toHaveAttribute('height', '32');
  });

  test("должен генерировать правильную ссылку", () => {
    render(<LogoSCK params={mockParams} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/en/new-york');
  });

  test("должен иметь правильные стили контейнера", () => {
    render(<LogoSCK params={mockParams} />);

    const container = screen.getByRole('link').firstChild as HTMLElement;
    expect(container).toHaveStyle({
      position: "relative",
      width: "82px",
      height: "44px",
      backgroundColor: "#FFC00E",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
    });
  });
});

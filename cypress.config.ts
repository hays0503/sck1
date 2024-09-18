import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    //   // Вставьте здесь другие настройки для плагинов или кастомные события
    //   on(
    //     "before:browser:launch",
    //     (
    //       browser = {
    //         name: "chrome",
    //       },
    //       launchOptions
    //     ) => {
    //       if (browser.name === "chrome") {
    //         launchOptions.args.push("--disable-dev-shm-usage");
    //         return launchOptions;
    //       }
    //     }
    //   );
    // },
    baseUrl: "http://localhost:3000", // Замените на URL вашего приложения
    viewportWidth: 1200,
    viewportHeight: 800,
    video: false, // Отключите запись видео, если она не нужна
    screenshotOnRunFailure: true, // Делать скриншоты при ошибках

    // Указание путей и расширений для тестов
    specPattern: "src/**/e2e/*.cy.{js,ts,jsx,tsx}",

    // Настройка для TypeScript, если это необходимо
    // enableTypeScript: true
  },
});

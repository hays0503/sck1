import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  globals: { TextEncoder: TextEncoder, TextDecoder: TextDecoder },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@/(.*)$": "./src/$1",
    "^@/messages/(.*)$": "./messages/$1",
    "uuid": require.resolve('uuid'),
  },
  setupFiles: ["./jest.polyfills.ts"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["./jest.setup.ts"],
  collectCoverageFrom: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/i18n.ts",
    "!src/middleware.ts",
    "!src/_app/providers/providersServer.tsx",
    "!src/_app/providers/providersClient.tsx",
    "!src/**/index.ts",
    "!src/**/__test__/*", // если не нужно собирать покрытие с самих тестов
  ],  
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },

  },
  collectCoverage: true,
  // coverageReporters: ["json"],
  // coverageReporters: ["json", "html"],
  coverageReporters: ["text", "cobertura"],
  reporters: [
    "default",
    "jest-junit",
    // [
    //   "jest-html-reporter",
    //   {
    //     outputPath: "./reports/test-report.html",
    //     pageTitle: "Automation Test with askui",
    //     includeFailureMsg: true,
    //   },
    // ],
  ],

};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

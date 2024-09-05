import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/messages/(.*)$": "<rootDir>/messages/$1",
  },
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
  collectCoverage: true,
  // coverageReporters: ["json", "html"],
  coverageReporters: ["text", "cobertura"],
  reporters: [
    "default",
    "jest-junit",
    [
      "jest-html-reporter",
      {
        outputPath: "./reports/test-report.html",
        pageTitle: "Automation Test with askui",
        includeFailureMsg: true,
      },
    ],
  ],

};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

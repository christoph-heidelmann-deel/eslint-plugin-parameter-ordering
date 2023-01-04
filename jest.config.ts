import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testRegex: "(.*.(test|spec)).(jsx?|tsx?|ts?)$",
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: true,
  silent: false,
  verbose: true,
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/node_modules/**",
    "!**/*.test.data.ts",
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputName: "junit-TEST.xml",
      },
    ],
  ],
  coveragePathIgnorePatterns: [
    ".*test\\.data\\.ts$,migrations.*.ts$,(.*.(test|spec)).(jsx?|tsx?)$,(tests/.*.mock).(jsx?|tsx?)$",
  ],
  coverageReporters: ["json", "lcov", "text", "clover", "cobertura"],
};

export default config;

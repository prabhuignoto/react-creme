/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/icons",
    "dist",
  ],
  testResultsProcessor: "jest-sonar-reporter",
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  collectCoverage: false,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/icons",
    "dist",
  ],
  testResultsProcessor: "jest-sonar-reporter",
};

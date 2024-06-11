import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  testMatch: ["<rootDir>/__tests__/services/**/*.test.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/dist/*.js",
    "<rootDir>/node_modules",
    "<rootDir>/.github",
    "<rootDir>/.husky",
    "<rootDir>/prisma",
  ],
};

export default config;

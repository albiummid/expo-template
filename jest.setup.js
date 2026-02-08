import "@testing-library/jest-native/extend-expect";

// Mock MMKV before any imports
jest.mock("react-native-mmkv", () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    clearAll: jest.fn(),
    contains: jest.fn(),
    getAllKeys: jest.fn(() => []),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
  })),
}));

// Mock expo-constants
jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      environment: "test",
    },
  },
}));

// Silence console warnings in tests unless explicitly testing them
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    // Filter out React act() warnings
    if (/act\(\.\.\.\)/.test(args[0])) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

// Global test timeout
jest.setTimeout(10000);

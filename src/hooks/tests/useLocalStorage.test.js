import { renderHook, act } from "@testing-library/react-hooks";

import useLocalStorage from "hooks/useLocalStorage";

describe("useLocalStorage tests", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("Handles no arguments passed properly", () => {
    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe(undefined);

    expect(typeof result.current[1]).toBe("function");

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(undefined);
  });

  test("Handles no initial value", () => {
    const testKey = "testItem";
    const { result } = renderHook(() => useLocalStorage(testKey));

    const item = window.localStorage.getItem(testKey);

    expect(item).toBe(null);

    expect(typeof result.current[1]).toBe("function");

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(undefined);
  });

  test("Handles initial value", () => {
    const testKey = "testItem";
    const testValue = "testValue";
    const { result } = renderHook(() => useLocalStorage(testKey, testValue));

    const item = window.localStorage.getItem(testKey);
    expect(item).toBe(null);
    expect(result.current[0]).toBe(testValue);
  });

  test("Handles initial value and updates properly", () => {
    const testKey = "testItem";
    const testValue = "testValue";
    const updatedValue = "updatedValue";
    const { result } = renderHook(() => useLocalStorage(testKey, testValue));

    const item = window.localStorage.getItem(testKey);
    expect(item).toBe(null);
    expect(result.current[0]).toBe(testValue);

    act(() => {
      result.current[1](updatedValue);
    });

    const localStorageItem = window.localStorage.getItem(testKey);

    expect(result.current[0]).toBe(updatedValue);
    expect(JSON.parse(localStorageItem)).toBe(updatedValue);
  });
});

import { renderHook, act } from "@testing-library/react-hooks";

import useToggle from "hooks/useToggle";

describe("useToggle tests", () => {
  test("Handles no arguments", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.toggled).toBe(false);
    expect(typeof result.current.handleToggle).toBe("function");
  });

  test("Handles initial value", () => {
    const { result } = renderHook(() => useToggle({ initialValue: true }));

    expect(result.current.toggled).toBe(true);
    expect(typeof result.current.handleToggle).toBe("function");
  });

  test("Handles initial value and updates", () => {
    const { result } = renderHook(() => useToggle({ initialValue: true }));

    act(() => {
      result.current.handleToggle();
    });

    expect(result.current.toggled).toBe(false);
  });
});

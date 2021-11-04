import { renderHook, act } from "@testing-library/react-hooks";

import useWindowSize from "hooks/useWindowSize";

describe("useWindowSize tests", () => {
  test("Handles no arguments and returns window size", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  test("Handles window size update and returns updated size", () => {
    const { result } = renderHook(() => useWindowSize());

    const updatedSizes = { width: 100, height: 200 };

    act(() => {
      window.innerWidth = updatedSizes.width;
      window.innerHeight = updatedSizes.height;

      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual(updatedSizes);
  });
});

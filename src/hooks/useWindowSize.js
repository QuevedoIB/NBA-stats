import { useState, useCallback, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleSizeUpdate = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSizeUpdate);

    return () => {
      window.removeEventListener("resize", handleSizeUpdate);
    };
  }, [handleSizeUpdate]);

  return windowSize;
}

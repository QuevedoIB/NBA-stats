import { useState, useCallback } from "react";

export default function useToggle({ initialValue = false } = {}) {
  const [toggled, setToggled] = useState(initialValue);

  const handleToggle = useCallback(() => {
    setToggled((currentValue) => !currentValue);
  }, []);

  return { handleToggle, toggled };
}

import { useState, useCallback } from "react";

export default function useInput(
  initialState: string
): [string, (value: string) => void] {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  return [value, onChange];
}

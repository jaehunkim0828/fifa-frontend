/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";

export default function useInput<T>(
  initialState: T
): [T, (key?: string, value?: any) => void] {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback((key?: string, value?: string) => {
    if (!key && !value) {
      setValue(initialState);
    } else if (key) {
      setValue(prev => {
        return {
          ...prev,
          [key]: value,
        };
      });
    }
  }, []);
  return [value, onChange];
}

import { Stats } from "../types/playerThumb.type";
import { useState, useCallback } from "react";

export default function useStats(
  initialState: Stats
): [Stats, (stats: Stats) => void] {
  const [status, setStatus] = useState(initialState);
  const onChange = useCallback((stats: Stats) => {
    setStatus(stats);
  }, []);
  return [status, onChange];
}

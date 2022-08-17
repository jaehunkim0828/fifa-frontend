import { PlayerStatses, Stats } from "../types/playerThumb.type";
import { useState, useCallback } from "react";

export default function useStats(
  initialState: PlayerStatses
): [PlayerStatses, (statses: PlayerStatses) => void] {
  const [status, setStatus] = useState(initialState);
  const onChange = useCallback((statses: PlayerStatses) => {
    setStatus(statses);
  }, []);
  return [status, onChange];
}

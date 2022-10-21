import { PlayerStats } from "@type/player.type";
import { useState, useCallback } from "react";

export default function useStats(
  initialState: PlayerStats
): [PlayerStats, (statses: PlayerStats) => void] {
  const [status, setStatus] = useState(initialState);
  const onChange = useCallback((statses: PlayerStats) => {
    setStatus(statses);
  }, []);
  return [status, onChange];
}

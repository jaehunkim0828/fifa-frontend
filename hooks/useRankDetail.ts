import { Stats } from "../types/playerThumb.type";
import { useState, useCallback } from "react";
import { RankDetail } from "@type/rankUserResult.type";

export default function useStats(
  initialState: RankDetail[]
): [RankDetail[], (detail: RankDetail) => void] {
  const [status, setStatus] = useState(initialState);
  const onChange = useCallback((data: any) => {
    setStatus(prev => {
      return [...prev, ...data.data];
    });
  }, []);
  return [status, onChange];
}

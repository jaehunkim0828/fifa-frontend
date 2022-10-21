import { Stats } from "@type/rank.type";
import { useState, useCallback } from "react";

interface RankDetail {
  createDate: string;
  spPosition: number;
  status: Stats;
}

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

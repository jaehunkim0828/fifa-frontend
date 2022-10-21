import { useState, useCallback } from "react";
import { CompareThumb } from "../types/player.type";
import { Thumb } from "../components/player-thumb/playerThumb.type";

export default function useThumb(
  initialState: []
): [Thumb[] | [], (event: CompareThumb) => void] {
  const [value, setValue] = useState<Thumb[] | []>(initialState);
  const onChange = useCallback(({ spid, name, seasonImg }: CompareThumb) => {
    if (!spid || !name || !seasonImg) {
      return setValue([]);
    }
    setValue((prev: any) => {
      return [...prev, { spid, name, seasonImg }];
    });
  }, []);
  return [value, onChange];
}

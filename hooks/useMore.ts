import { More } from "@components/search-bar/searchBar.type";
import { useState } from "react";

export enum MoreType {
  season = "season",
  position = "position",
  nation = "nation",
  team = "team",
}

export const initialMore = {
  season: [],
  position: [],
  nation: "",
  team: "",
};

export default function useMore(
  initialState: More
): [More, ({ type, value }: { type?: MoreType; value?: string }) => void] {
  const [more, setMore] = useState(initialState);
  const changeMore = ({ type, value }: { type?: MoreType; value?: string }) => {
    if (!type || (value !== "" && !value)) {
      setMore({
        season: [],
        position: [],
        nation: "",
        team: "",
      });
    } else if (type === MoreType.position || type === MoreType.season) {
      if (type === MoreType.position && value === "0") {
        if (more[type].includes(value))
          return setMore(prev => ({ ...prev, [type]: [] }));
        else return setMore(prev => ({ ...prev, [type]: [value] }));
      } else if (more[type].includes(value)) {
        const index = more[type].indexOf(value);
        more[type].splice(index, 1);
        setMore((prev: any) => ({
          ...prev,
          [type]: more[type],
        }));
        return;
      } else if (more[type].includes("0")) {
        const index = more[type].indexOf("0");
        more[type].splice(index, 1);
        setMore((prev: any) => ({
          ...prev,
          [type]: [value],
        }));
      }
      setMore((prev: any) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
    } else if (type === MoreType.nation || type === MoreType.team) {
      setMore((prev: any) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  return [more, changeMore];
}

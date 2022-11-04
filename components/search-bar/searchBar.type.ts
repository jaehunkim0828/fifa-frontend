import { MoreType } from "@hooks/useMore";

export interface SearchBarProps {
  open?: boolean;
}

export interface More {
  season: string[];
  position: string[];
  nation: string;
  team: string;
}

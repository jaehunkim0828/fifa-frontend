import { PlayerStatses, Stats } from "./playerThumb.type";

export interface DetailProps {
  seleteOptions: {
    value: number;
    label: string;
  }[];
  showPlayerGraph: (value: number) => void;
  statses: PlayerStatses;
}

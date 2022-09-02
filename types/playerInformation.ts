import { PlayerInfo } from "./player.type";
import { PlayerStats } from "./playerThumb.type";

export interface PlayerInformationProps {
  seleteOptions: {
    value: number;
    label: string;
  }[];
  showPlayerGraph: (value: number) => void;

  stats: PlayerStats;
  ranks: PlayerInfo[];
}

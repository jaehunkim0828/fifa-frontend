import { PlayerInfo } from "./player.type";
import { PlayerStats, Stats } from "./playerThumb.type";

export interface PlayerInformationProps {
  showPlayerGraph: (value: number) => void;
  setdLoading: (value: boolean) => void;
  dLoading: boolean;
  stats: PlayerStats;
  ranks: PlayerInfo[];
  average: { striker: Stats; midfielder: Stats; defender: Stats };
}

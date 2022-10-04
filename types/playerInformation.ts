import { PlayerInfo } from "./player.type";
import { PlayerStats, Stats } from "./playerThumb.type";

export interface PlayerInformationProps {
  showPlayerGraph: (value: number) => void;

  stats: PlayerStats;
  ranks: PlayerInfo[];
  average: { striker: Stats; midfielder: Stats; defender: Stats };
}

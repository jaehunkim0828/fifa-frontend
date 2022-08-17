import { PlayerInfo } from "./player.type";
import { PlayerStatses } from "./playerThumb.type";

export interface PlayerInformationProps {
  seleteOptions: {
    value: number;
    label: string;
  }[];
  showPlayerGraph: (value: number) => void;

  statses: PlayerStatses;
  ranks: PlayerInfo[];
}

import { CompareThumb, PlayerInfo } from "./player.type";
import { Stats, Thumb } from "./playerThumb.type";

export interface PlayerInformationProps {
  spid: string;
  seleteOptions: {
    value: number;
    label: string;
  }[];
  showPlayerGraph: (value: number) => void;
  name: string;
  status: Stats;
  ranks: PlayerInfo[];
}

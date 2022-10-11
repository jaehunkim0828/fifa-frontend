import { CompareThumb, PlayerInfo } from "./player.type";
import { Thumb } from "./playerThumb.type";

export interface PlayerListProps {
  players: PlayerInfo[];
  loading: boolean;
  dLoading: boolean;
  setdLoading: (value: boolean) => void;
}

import { CompareThumb, PlayerInfo } from "./player.type";
import { Thumb } from "./playerThumb.type";

export interface PlayerListProps {
  players: PlayerInfo[];
  loading: boolean;
  setdLoading: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

import { CompareThumb, PlayerInfo } from "../../types/player.type";
import { Thumb } from "../player-thumb/playerThumb.type";

export interface PlayerListProps {
  players: PlayerInfo[];
  loading: boolean;
  setdLoading: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

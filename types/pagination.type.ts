import { PlayerInfo } from "./player.type";
import { PlayerRank } from "./rankUserResult.type";

export interface PaginationProps {
  totalCount: number;
  count: number;
  setRanks: React.Dispatch<PlayerInfo[]>;
  player?: string;
}

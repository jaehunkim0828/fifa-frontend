import { PlayerRank } from "./rankUserResult.type";

export interface PaginationProps {
  totalCount: number;
  count: number;
  setRanks: (any: PlayerRank[]) => void;
}

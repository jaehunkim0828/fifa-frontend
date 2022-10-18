import { PlayerInfo } from "./player.type";

export interface PaginationProps {
  totalCount: number;
  count: number;
  setRanks: React.Dispatch<PlayerInfo[]>;
  search: { name: string; season: string; position: string };
}

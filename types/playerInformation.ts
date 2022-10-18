import { PlayerInfo } from "./player.type";
import { PlayerStats, Stats } from "./playerThumb.type";

export interface PlayerInformationProps {
  showPlayerGraph: (value: number) => void;
  setdLoading: (value: boolean) => void;
  stats: PlayerStats;
  ranks: PlayerInfo[];
  average: { striker: Stats; midfielder: Stats; defender: Stats };
  totalCount: number;
  count: number;
  setRanks: React.Dispatch<PlayerInfo[]>;
  search: { name: string; season: string; position: string };
  detail: { open: boolean; setOpen: (v: boolean) => void };
}

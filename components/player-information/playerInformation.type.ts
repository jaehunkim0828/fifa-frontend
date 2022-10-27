import { Stats } from "@type/rank.type";
import { PlayerInfo, PlayerStats } from "../../types/player.type";

export interface PlayerInformationProps {
  showPlayerGraph: (value: number) => void;
  setdLoading: (value: boolean) => void;
  stats: PlayerStats;
  ranks: PlayerInfo[];
  average: Stats;
  totalCount: number;
  count: number;
  setRanks: React.Dispatch<PlayerInfo[]>;
  search: { name: string; season: string; position: string };
  detail: { open: boolean; setOpen: (v: boolean) => void };
}

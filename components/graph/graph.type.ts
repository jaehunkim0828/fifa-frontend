import { PlayerStats } from "@type/player.type";
import { Stats } from "@type/rank.type";

export interface GraphProps {
  stats: PlayerStats;
  seasonImg: string;
}

export interface GraphData {
  name: string;
  status: Stats;
  spid: string;
  seasonImg: string;
}

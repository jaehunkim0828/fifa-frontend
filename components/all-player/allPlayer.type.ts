import { PlayerInfo } from "@type/player.type";
import { Stats } from "@type/rank.type";

export interface PlayerProps {
  playersInitial: Array<PlayerInfo>;
  count: number;
  current_page?: number;
  players?: any;
  average: { striker: Stats; midfielder: Stats; defender: Stats };
  search: { name: string; season: string; position: string };
}

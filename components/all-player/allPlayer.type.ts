import { PlayerInfo } from "@type/player.type";

export interface PlayerProps {
  playersInitial: Array<PlayerInfo>;
  count: number;
  current_page?: number;
  players?: any;
  search: {
    name: string;
    season: string;
    position: string;
    nation: string;
    team: string;
  };
}

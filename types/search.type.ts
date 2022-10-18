import { PlayerInfo } from "./player.type";
import { Stats } from "./playerThumb.type";

export interface searchProps {
  search: { name: string; season: string; position: string };
  player: PlayerInfo[];
  isMobile: boolean;
  average: { striker: Stats; midfielder: Stats; defender: Stats };
  path: any;
}

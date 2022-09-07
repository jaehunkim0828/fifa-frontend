import { PlayerStats, PositionPart, Stats } from "./playerThumb.type";

export interface SinglePlayerProps {
  name: string;
  part: PositionPart;
  playerStats: PlayerStats;
  spid: string;
  desc: string;
}

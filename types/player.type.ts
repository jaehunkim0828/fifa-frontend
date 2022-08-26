import { PositionStatus } from "./playerThumb.type";

export interface CompareThumb {
  spid?: string;
  name?: string;
  seasonImg?: string;
}

export interface PlayerInfo {
  name: string;
  id: string;
  season: { classname: string; seasonImg: string; id: number };
  position: { desc: PositionStatus } | null;
}

export interface PlayerProps {
  playersInitial: Array<PlayerInfo>;
  count?: number;
  current_page?: number;
  players?: any;
}

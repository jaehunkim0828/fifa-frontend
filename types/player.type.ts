import { PositionPart, PositionStatus, Stats } from "./playerThumb.type";

export interface Position {
  desc: PositionStatus;
  part: PositionPart;
}

export interface CompareThumb {
  spid?: string;
  name?: string;
  seasonImg?: string;
}

export interface PlayerInfo {
  name: string;
  id: string;
  season: { classname: string; seasonImg: string; id: number };
  position?: Position;
}

export interface PlayerProps {
  playersInitial: Array<PlayerInfo>;
  count: number;
  current_page?: number;
  players?: any;
  average: { striker: Stats; midfielder: Stats; defender: Stats };
  search: { name: string; season: string; position: string };
}

import { PositionStatus } from "../components/player-thumb/playerThumb.type";
import { PositionMainPart } from "./position.type";
import { Stats } from "./rank.type";

export interface Position {
  desc: PositionStatus;
  part: PositionMainPart;
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
  ovr?: string;
}

export type PlayerStats = {
  [key in string]: {
    status: Stats;
    name: string;
    seasonImg: string;
  };
};

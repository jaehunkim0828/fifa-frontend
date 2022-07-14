import { Dispatch, SetStateAction } from "react";
import { CompareThumb } from "./player.type";

export interface Thumb {
  spid: number;
  name: string;
  seasonImg: string;
}

export interface Stats {
  matchCount: number;
  assist: number;
  block: number;
  dribble: number;
  dribbleSuccess: number;
  dribbleTry: number;
  effectiveShoot: number;
  goal: number;
  passSuccess: number;
  passTry: number;
  shoot: number;
  tackle: number;
}

export class RankInput {
  spid: string;
  position: string;
  name: string;
  assist: string;
  block: string;
  dribble: string;
  dribbleSuccess: string;
  dribbleTry: string;
  effectiveShoot: string;
  goal: string;
  matchCount: string;
  passSuccess: string;
  passTry: string;
  shoot: string;
  tackle: string;
  createDate: string;
}

export interface PlayerThumbProps {
  comparedThumb: any[];
  setComparedThumb: (event: CompareThumb) => void;
  spid: string;
  name: string;
  seasonImg: string;
  classname: string;
}

export interface Ability {
  spId: string;
  spPosition: string;
  createDate: string;
  status: RankerPlayerStatDTO;
}

interface RankerPlayerStatDTO {
  assist: string;
  block: string;
  dribble: string;
  dribbleSuccess: string;
  dribbleTry: string;
  effectiveShoot: string;
  goal: string;
  matchCount: string;
  passSuccess: string;
  passTry: string;
  shoot: string;
  tackle: string;
}

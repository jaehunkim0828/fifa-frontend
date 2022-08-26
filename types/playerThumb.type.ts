import { Dispatch, SetStateAction } from "react";
import { Position } from "./player.type";

export enum PositionStatus {
  TOTAL,
  GK,
  SW,
  RWB,
  RB,
  RCB,
  CB,
  LCB,
  LB,
  LWB,
  RDM,
  CDM,
  LDM,
  RM,
  RCM,
  CM,
  LCM,
  LM,
  RAM,
  CAM,
  LAM,
  RF,
  CF,
  LF,
  RW,
  RS,
  ST,
  LS,
  LW,
  SUB,
}

export enum PositionPart {
  GK = "GK",
  DF = "DF",
  MF = "MF",
  FW = "FW",
  SUB = "SUB",
}

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
  spid: string;
  name: string;
  seasonImg: string;
  classname: string;
  checkedList: Array<string>;
  setList: Dispatch<SetStateAction<string[]>>;
  position?: Position;
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

export type PlayerStatses = {
  [key in string]: {
    status: Stats;
    name: string;
  };
};

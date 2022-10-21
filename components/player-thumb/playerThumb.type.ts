import { Dispatch, SetStateAction } from "react";
import { Position } from "../../types/player.type";

export enum PositionStatus {
  TOTAL = 50,
  GK = 0,
  SW = 1,
  RWB = 2,
  RB = 3,
  RCB = 4,
  CB = 5,
  LCB = 6,
  LB = 7,
  LWB = 8,
  RDM = 9,
  CDM = 10,
  LDM = 11,
  RM = 12,
  RCM = 13,
  CM = 14,
  LCM = 15,
  LM = 16,
  RAM = 17,
  CAM = 18,
  LAM = 19,
  RF = 20,
  CF = 21,
  LF = 22,
  RW = 23,
  RS = 24,
  ST = 25,
  LS = 26,
  LW = 27,
  SUB = 28,
}

export interface Thumb {
  spid: number;
  name: string;
  seasonImg: string;
}

export interface PlayerThumbProps {
  spid: string;
  name: string;
  seasonImg: string;
  classname: string;
  position?: Position;
  loading: boolean;
  setdLoading: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  ovr?: string;
}

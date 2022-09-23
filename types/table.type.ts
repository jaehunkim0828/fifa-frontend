import { PlayerStats, PositionPart } from "./playerThumb.type";

export enum Grade {
  F = "F",
  E = "E",
  D = "D",
  C = "C",
  B = "B",
  A = "A",
  W = "W",
}

interface PowerRow {
  score: number;
  grade: Grade;
}

export interface Power {
  attack: PowerRow;
  assist: PowerRow;
  defense: PowerRow;
}
export interface TableProps {
  name: string;
  image: string;
  desc: string;
  seasonImg: string;
  power: Power;
  spid: string;
}

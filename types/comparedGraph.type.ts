import { Thumb } from "./playerThumb.type";

export type PlayerStatus = {
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
};

export interface ComparedStatus {
  shoot: number;
  effectiveShoot: number;
  goal: number;
  assist: number;
  tackle: number;
  block: number;
}

export interface ComparedGraphProps {
  player1: Thumb;
  player2: Thumb;
}

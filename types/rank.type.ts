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
  saving?: number;
  seasonImg?: string;
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

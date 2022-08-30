export type PlayerRank = {
  assist: number;
  block: number;
  dribble: number;
  dribbleSuccess: number;
  dribbleTry: number;
  effectiveShoot: number;
  goal: number;
  matchCount: number;
  passSuccess: number;
  passTry: number;
  shoot: number;
  tackle: number;
};

export interface RankUserResultProps {
  spid: string;
  name: string;
}

export interface RankDetail {
  createDate: string;
  spPosition: number;
  status: PlayerRank;
}

export interface GraphData {
  name: string;
  status: PlayerRank;
  spid: string;
  seasonImg: string;
}

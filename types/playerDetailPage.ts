import { PositionPart, Stats } from "./playerThumb.type";

export interface PrevPlayerDetail {
  query: {
    spid: string;
    player: string;
    part: PositionPart;
    desc: string;
  };
}

export interface PlayterDetailProps {
  stats: Stats;
  name: string;
  part: PositionPart;
  average: Stats;
  spid: string;
  desc: string;
  isMobile: boolean;
}

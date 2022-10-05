import { PositionPart, Stats } from "./playerThumb.type";

export interface PlayterDetailProps {
  stats: Stats;
  name: string;
  part: PositionPart;
  average: Stats;
  spid: string;
  desc: string;
  isMobile: boolean;
  path: string;
}

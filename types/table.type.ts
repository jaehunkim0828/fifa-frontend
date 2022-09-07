import { PositionPart } from "./playerThumb.type";

export interface TableProps {
  name: string;
  isImgLoding: boolean;
  image: string;
  part: PositionPart;
  desc: string;
  seasonImg: string;
}

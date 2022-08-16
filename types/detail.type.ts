import { Stats } from "./playerThumb.type";

export interface DetailProps {
  seleteOptions: {
    value: number;
    label: string;
  }[];
  showPlayerGraph: (value: number) => void;
  name: string;
  status: Stats;
}

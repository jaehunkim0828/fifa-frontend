import { PlayerStats } from "@type/player.type";

export interface DetailProps {
  seleteOptions: {
    value: number;
    label: string;
  }[];
  showPlayerGraph: (value: number) => void;
  stats: PlayerStats;
}

import { PlayerCardStatus } from "@components/player-card/playerCard.type";
import { Stats } from "@type/rank.type";

export interface RatingTable extends PlayerCardStatus {
  assist: { score: number; best: boolean };
  attack: { score: number; best: boolean };
  defense: { score: number; best: boolean };
  matchCount: string;
}

export interface RatingProps {
  average: { striker: Stats; midfielder: Stats; defender: Stats };
  loading: boolean;
  setLoading: (v: boolean) => void;
  setOpen: (v: boolean) => void;
}
